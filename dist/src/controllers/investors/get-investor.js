"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneInvestor = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const enums_1 = require("../../types/enums");
const getOneInvestor = async (req, res) => {
    try {
        let client_id = null;
        if (req.decodedToken.data.role_slug == enums_1.Roles.ROLE_CLIENT_ADMIN) {
            client_id = req.decodedToken.data.id;
        }
        const investor = await services_1.investorsService.getInvestorById(req.params.id, client_id);
        if (!investor) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Investor detail.", {
            list: investor,
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
exports.getOneInvestor = getOneInvestor;
//# sourceMappingURL=get-investor.js.map