"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantManagerStatusUpdate = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const plantManagerStatusUpdate = async (req, res) => {
    try {
        const plantManager = await services_1.plantManagerService.getPlantManagerByIdWithoutStatus(req.params.id);
        if (!plantManager) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        await services_1.plantManagerService.updateStatus(req.params.id, req.body.status);
        const data = (0, helpers_1.formatResponse)(200, false, "Plant Manager status updated successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.plantManagerStatusUpdate = plantManagerStatusUpdate;
//# sourceMappingURL=status-update.js.map