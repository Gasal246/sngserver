"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlantManager = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const updatePlantManager = async (req, res) => {
    try {
        await services_1.plantManagerService.updatePlantManager(req.params.id, req.body);
        const data = (0, helpers_1.formatResponse)(200, false, "Plant manager updated successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.updatePlantManager = updatePlantManager;
//# sourceMappingURL=update-plant-manager.js.map