"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPos = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const enums_1 = require("../../types/enums");
const addPos = async (req, res) => {
    try {
        const role = await services_1.roleService.getRoleBySlug(enums_1.Roles.ROLE_POS);
        if (!role) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const totalCount = await services_1.posService.getPosCount(req.decodedToken.data.id);
        const limit = req.decodedToken.data.no_pos;
        if (totalCount >= limit) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.EXCEED_LIMIT, null);
            res.status(200).json(data);
            return;
        }
        await services_1.posService.createPos((0, helpers_1.createObjectId)(req.decodedToken.data.id), role._id, req.body);
        const data = (0, helpers_1.formatResponse)(200, false, "Pos created successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.addPos = addPos;
//# sourceMappingURL=add-pos.js.map