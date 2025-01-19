"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCoordinator = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const enums_1 = require("../../types/enums");
const addCoordinator = async (req, res) => {
    try {
        const role = await services_1.roleService.getRoleBySlug(enums_1.Roles.ROLE_COORDINATOR);
        if (!role) {
            const data = (0, helpers_1.formatResponse)(401, true, "Coordinator role not available.", null);
            res.status(401).json(data);
            return;
        }
        let client_id = null;
        if (req.decodedToken.data.role_slug == enums_1.Roles.ROLE_CLIENT_ADMIN) {
            const totalCount = await services_1.coordinatorService.getCoordinatorCount(req.decodedToken.data.id);
            const limit = req.decodedToken.data.no_cordinator;
            if (totalCount >= limit) {
                const data = (0, helpers_1.formatResponse)(400, true, "Your can't exceed your coordinator limit", null);
                res.status(200).json(data);
                return;
            }
            client_id = req.decodedToken.data.id;
        }
        req.body.client_id = client_id;
        await services_1.coordinatorService.createCoordinator(role._id, req.body);
        const data = (0, helpers_1.formatResponse)(200, false, "Coordinator created successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.addCoordinator = addCoordinator;
//# sourceMappingURL=add-coordinator.js.map