"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignCampsToAccountant = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("../../models"));
const assignCampsToAccountant = async (req, res) => {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.body.accountant_id)) {
            const data = (0, helpers_1.formatResponse)(400, true, "Accountant not found.", null);
            res.status(400).json(data);
            return;
        }
        const accountant = await services_1.accountantService.getAccountantById(req.body.accountant_id, req.decodedToken.data.id);
        if (!accountant) {
            const data = (0, helpers_1.formatResponse)(400, true, "Accountant not found.", null);
            res.status(400).json(data);
            return;
        }
        const camp_array = req.body.camp_ids.split(",");
        if ((0, helpers_1.hasDuplicate)(camp_array)) {
            const data = (0, helpers_1.formatResponse)(400, true, "No duplication allow in camp ids selection.", null);
            res.status(400).json(data);
            return;
        }
        const camps = [];
        for (const camp of camp_array) {
            if (!(0, mongoose_1.isValidObjectId)(camp)) {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_CAMP_SELECTION, null);
                res.status(400).json(data);
                return;
            }
            const clientIdPromise = services_1.campService.getCampByClientIdAndId(req.decodedToken.data.id, camp);
            const isCampAssignToAccountantPromise = services_1.campAssignAccountantService.isCampAssignWithAccountant(camp, req.body.accountant_id);
            const [clientId, isCampAssignToAccountant] = await Promise.all([
                clientIdPromise,
                isCampAssignToAccountantPromise,
            ]);
            if (!clientId || isCampAssignToAccountant) {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_CAMP_SELECTION, null);
                res.status(400).json(data);
                return;
            }
            camps.push(clientId);
        }
        for (const camp of camp_array) {
            const count = await services_1.campAssignAccountantService.totalCountOfCamps(camp);
            const index = camp_array.indexOf(camp);
            if (count >= camps[index].no_of_allowed_account) {
                const data = (0, helpers_1.formatResponse)(400, true, "Your can't exceed camp accountant assign limit", null);
                res.status(400).json(data);
                return;
            }
        }
        const promises = [];
        for (const camp of camp_array) {
            const obj = new models_1.default.campAssignAccountantModel();
            obj.camp_id = (0, helpers_1.createObjectId)(camp);
            obj.accountant_id = (0, helpers_1.createObjectId)(req.body.accountant_id);
            obj.status = 1;
            promises.push(services_1.campAssignAccountantService.assignCampToAccountant(obj));
        }
        await Promise.all(promises);
        const data = (0, helpers_1.formatResponse)(200, false, "Accountant assigned to camps successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
    }
};
exports.assignCampsToAccountant = assignCampsToAccountant;
//# sourceMappingURL=assign-camp-to-accountant.js.map