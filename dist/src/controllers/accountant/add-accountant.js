"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccountant = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const enums_1 = require("../../types/enums");
const addAccountant = async (req, res) => {
    try {
        const role = await services_1.roleService.getRoleBySlug(enums_1.Roles.ROLE_ACCOUNTANT);
        if (!role) {
            const data = (0, helpers_1.formatResponse)(401, true, "Accountant role not available.", null);
            res.status(401).json(data);
            return;
        }
        let client_id = null;
        if (req.decodedToken.data.role_slug == enums_1.Roles.ROLE_CLIENT_ADMIN) {
            const totalCount = await services_1.accountantService.getAccountantCount(req.decodedToken.data.id);
            const limit = req.decodedToken.data.no_accountant;
            if (totalCount >= limit) {
                const data = (0, helpers_1.formatResponse)(400, true, "Your can't exceed your accountant limit", null);
                res.status(200).json(data);
                return;
            }
            client_id = req.decodedToken.data.id;
        }
        req.body.client_id = client_id;
        await services_1.accountantService.createAccountant(role._id, req.body);
        const data = (0, helpers_1.formatResponse)(200, false, "Accountant created successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.addAccountant = addAccountant;
//# sourceMappingURL=add-accountant.js.map