"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInvestors = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const enums_1 = require("../../types/enums");
const getAllInvestors = async (req, res) => {
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
        const investors = await services_1.investorsService.getAllInvestors(filter);
        const data = (0, helpers_1.formatResponse)(200, false, helpers_1.Message.INVESTOR_DETAIL, {
            list: investors,
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
exports.getAllInvestors = getAllInvestors;
//# sourceMappingURL=get-investors.js.map