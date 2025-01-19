"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCoordinator = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const updateCoordinator = async (req, res) => {
    try {
        await services_1.coordinatorService.updateCoordinator(req.params.id, req.body);
        const data = (0, helpers_1.formatResponse)(200, false, "Coordinator updated successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.updateCoordinator = updateCoordinator;
//# sourceMappingURL=update-coordinator.js.map