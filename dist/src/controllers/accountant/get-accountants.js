"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAccountants = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const enums_1 = require("../../types/enums");
const getAllAccountants = async (req, res) => {
    var _a;
    try {
        const status = (_a = req.query.status) === null || _a === void 0 ? void 0 : _a.toString();
        let client_id = null;
        if (req.decodedToken.data.role_slug == enums_1.Roles.ROLE_CLIENT_ADMIN) {
            client_id = req.decodedToken.data.id;
        }
        const filter = {
            client_id: client_id,
            status: status
                ? parseInt(status)
                : {
                    $ne: 0,
                },
        };
        const accountants = await services_1.accountantService.getAllAccountant(filter);
        const data = (0, helpers_1.formatResponse)(200, false, "Accountant details.", {
            list: accountants,
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
exports.getAllAccountants = getAllAccountants;
//# sourceMappingURL=get-accountants.js.map