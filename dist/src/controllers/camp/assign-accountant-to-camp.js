"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignAccountantToCamps = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("../../models"));
const assignAccountantToCamps = async (req, res) => {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.body.camp_id)) {
            const data = (0, helpers_1.formatResponse)(400, true, "Camp not found.", null);
            res.status(400).json(data);
            return;
        }
        const camp = await services_1.campService.getCampByClientIdAndId(req.decodedToken.data.id, req.body.camp_id);
        if (!camp) {
            const data = (0, helpers_1.formatResponse)(400, true, "Camp not found.", null);
            res.status(400).json(data);
            return;
        }
        const accountant_array = req.body.accountants.split(",");
        if ((0, helpers_1.hasDuplicate)(accountant_array)) {
            const data = (0, helpers_1.formatResponse)(400, true, "No duplication allow in accountant ids selection.", null);
            res.status(400).json(data);
            return;
        }
        for (const accountants of accountant_array) {
            if (!(0, mongoose_1.isValidObjectId)(accountants)) {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_ACCOUNTANT_SELECTION, null);
                res.status(400).json(data);
                return;
            }
            const clientIdPromise = services_1.accountantService.getAccountantById(accountants, req.decodedToken.data.id);
            const isCampAssignToAccountantPromise = services_1.campAssignAccountantService.isCampAssignWithAccountant(req.body.camp_id, accountants);
            const [clientId, isCampAssignToAccountant] = await Promise.all([
                clientIdPromise,
                isCampAssignToAccountantPromise,
            ]);
            if (!clientId || isCampAssignToAccountant) {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_ACCOUNTANT_SELECTION, null);
                res.status(400).json(data);
                return;
            }
        }
        const count = await services_1.campAssignAccountantService.totalCountOfCamps(req.body.camp_id);
        const remainAccountant = camp.no_of_allowed_account - count;
        if (remainAccountant < accountant_array.length) {
            const data = (0, helpers_1.formatResponse)(400, true, "Your can't exceed camp accountant assign limit", null);
            res.status(400).json(data);
            return;
        }
        const promises = [];
        for (const accountants of accountant_array) {
            const obj = new models_1.default.campAssignAccountantModel();
            obj.camp_id = (0, helpers_1.createObjectId)(req.body.camp_id);
            obj.accountant_id = (0, helpers_1.createObjectId)(accountants);
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
exports.assignAccountantToCamps = assignAccountantToCamps;
//# sourceMappingURL=assign-accountant-to-camp.js.map