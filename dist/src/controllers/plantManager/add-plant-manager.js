"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlantManager = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const enums_1 = require("../../types/enums");
const addPlantManager = async (req, res) => {
    try {
        const role = await services_1.roleService.getRoleBySlug(enums_1.Roles.ROLE_PLANT_MANAGER);
        if (!role) {
            const data = (0, helpers_1.formatResponse)(401, true, "Plant manager role not available.", null);
            res.status(401).json(data);
            return;
        }
        await services_1.plantManagerService.createPlantManager(role._id, req.body);
        const data = (0, helpers_1.formatResponse)(200, false, "Plant manager created successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.addPlantManager = addPlantManager;
//# sourceMappingURL=add-plant-manager.js.map