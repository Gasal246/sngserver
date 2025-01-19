"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campStatusUpdate = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const campStatusUpdate = async (req, res) => {
    try {
        const isIdAvailable = await services_1.campService.getCampByIdWithoutStatus(req.params.id);
        if (!isIdAvailable) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        await services_1.campService.updateStatus(req.params.id, req.body.status);
        const data = (0, helpers_1.formatResponse)(200, false, "Camp status updated successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.campStatusUpdate = campStatusUpdate;
//# sourceMappingURL=status-update.js.map