"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignCampsToCoordinator = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("../../models"));
const assignCampsToCoordinator = async (req, res) => {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.body.coordinator_id)) {
            const data = (0, helpers_1.formatResponse)(400, true, "Coordinator not found.", null);
            res.status(400).json(data);
            return;
        }
        const coordinator = await services_1.coordinatorService.getCoordinatorById(req.body.coordinator_id, req.decodedToken.data.id);
        if (!coordinator) {
            const data = (0, helpers_1.formatResponse)(400, true, "Coordinator not found.", null);
            res.status(400).json(data);
            return;
        }
        const camp_array = req.body.camp_ids.split(",");
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
            const isCampAssignToCoordinatorPromise = services_1.campAssignCoordinatorService.isCampAssignWithCoordinator(camp);
            const [clientId, isCampAssignToCoordinator] = await Promise.all([
                clientIdPromise,
                isCampAssignToCoordinatorPromise,
            ]);
            if (!clientId || isCampAssignToCoordinator) {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_CAMP_SELECTION, null);
                res.status(400).json(data);
                return;
            }
        }
        const promises = [];
        for (const camp of camp_array) {
            const obj = new models_1.default.campAssignCoordinatorModel();
            obj.camp_id = (0, helpers_1.createObjectId)(camp);
            obj.coordinator_id = (0, helpers_1.createObjectId)(req.body.coordinator_id);
            obj.status = 1;
            promises.push(services_1.campAssignCoordinatorService.assignCampToCoordinator(obj));
        }
        await Promise.all(promises);
        const data = (0, helpers_1.formatResponse)(200, false, "Coordinator assigned to camps successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
    }
};
exports.assignCampsToCoordinator = assignCampsToCoordinator;
//# sourceMappingURL=assign-camp-to-coordinator.js.map