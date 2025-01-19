"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignCampsToPos = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("../../models"));
const assignCampsToPos = async (req, res) => {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.body.pos)) {
            const data = (0, helpers_1.formatResponse)(400, true, "POS user record not available", null);
            res.status(400).json(data);
            return;
        }
        const pos = await services_1.posService.getPosByClientIdAndId(req.decodedToken.data.id, req.body.pos);
        if (!pos) {
            const data = (0, helpers_1.formatResponse)(400, true, "POS user record not available", null);
            res.status(400).json(data);
            return;
        }
        const camp_array = req.body.camp_ids.split(",");
        const camp_categories = req.body.camp_categories.split(",");
        if (camp_array.length != camp_categories.length) {
            const data = (0, helpers_1.formatResponse)(400, true, "Camp ids not match with camp categories length.Need to require same length for camp ids and camp categories.", null);
            res.status(400).json(data);
            return;
        }
        if ((0, helpers_1.hasDuplicate)(camp_array)) {
            const data = (0, helpers_1.formatResponse)(400, true, "No duplication allow in camp ids selection.", null);
            res.status(400).json(data);
            return;
        }
        for (const camp of camp_array) {
            if (!(0, mongoose_1.isValidObjectId)(camp)) {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_CAMP_SELECTION, null);
                res.status(400).json(data);
                return;
            }
            const clientIdPromise = services_1.campService.getCampByClientIdAndId(req.decodedToken.data.id, camp);
            const isCampAssignToPosPromise = services_1.CampAssignPosService.isCampAssignToPos(req.body.pos, camp);
            const [clientId, isCampAssignToPos] = await Promise.all([
                clientIdPromise,
                isCampAssignToPosPromise,
            ]);
            if (!clientId || isCampAssignToPos) {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_CAMP_SELECTION, null);
                res.status(400).json(data);
                return;
            }
        }
        const promises = [];
        for (const camp of camp_array) {
            const obj = new models_1.default.campAssignPosModel();
            obj.camp_id = (0, helpers_1.createObjectId)(camp);
            obj.pos_id = (0, helpers_1.createObjectId)(req.body.pos);
            obj.camp_category = camp_categories[camp_array.indexOf(camp)];
            obj.status = 1;
            promises.push(services_1.CampAssignPosService.assignCampToPos(obj));
        }
        await Promise.all(promises);
        const data = (0, helpers_1.formatResponse)(200, false, "Pos assigned to camps successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
    }
};
exports.assignCampsToPos = assignCampsToPos;
//# sourceMappingURL=assign-camp-to-pos.js.map