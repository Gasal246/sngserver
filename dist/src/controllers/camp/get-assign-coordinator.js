"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignCoordinator = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const mongoose_1 = require("mongoose");
const getAssignCoordinator = async (req, res) => {
    var _a;
    try {
        const status = req.query.status ? req.query.status.toString() : "";
        const campId = (_a = req.query.camp_id) === null || _a === void 0 ? void 0 : _a.toString();
        if (!campId || !(0, mongoose_1.isValidObjectId)(campId)) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const assignData = await services_1.campAssignCoordinatorService.getCampAssignCoordinatorDetails((0, helpers_1.createObjectId)(campId), status);
        if (!assignData || !assignData.length) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "camp assign coordinator details", {
            list: assignData,
        });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getAssignCoordinator = getAssignCoordinator;
//# sourceMappingURL=get-assign-coordinator.js.map