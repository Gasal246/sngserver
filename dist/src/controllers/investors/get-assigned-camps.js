"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvestorAssignedCamps = void 0;
const helpers_1 = require("../../helpers");
const investor_assign_camps_1 = require("../../services/investor_assign_camps");
const getInvestorAssignedCamps = async (req, res) => {
    var _a;
    try {
        const status = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.status) || "active";
        const investorId = req.params.investorId;
        if (!investorId) {
            const data = (0, helpers_1.formatResponse)(500, true, "Investor Id is not found in params", null);
            res.status(500).json(data);
            return;
        }
        const list = await (0, investor_assign_camps_1.getInvestorAssignedCampsList)(investorId, status);
        const investor_data = (list === null || list === void 0 ? void 0 : list.length) > 0 ? list[0].investor : null;
        const camp_list = list.map((data) => data.camp_data);
        const result = {
            investor_data,
            camp_list: camp_list || [],
        };
        const data = (0, helpers_1.formatResponse)(200, false, "Invester Camps Successfully fetched!", result);
        res.status(200).json(data);
    }
    catch (error) {
        const data = (0, helpers_1.formatResponse)(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getInvestorAssignedCamps = getInvestorAssignedCamps;
//# sourceMappingURL=get-assigned-camps.js.map