"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverInvestorAssignCamp = exports.RemoveInvestorAssignedCamp = void 0;
const helpers_1 = require("../../helpers");
const investor_assign_camps_1 = require("../../services/investor_assign_camps");
const RemoveInvestorAssignedCamp = async (req, res) => {
    try {
        const { investor_id, camp_id } = req.body;
        const result = await (0, investor_assign_camps_1.removeInvestorAssignedCampId)(investor_id, camp_id);
        const data = (0, helpers_1.formatResponse)(200, false, "Assigned Camp Soft Deleted!", result);
        res.status(200).json(data);
        return;
    }
    catch (error) {
        const data = (0, helpers_1.formatResponse)(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.RemoveInvestorAssignedCamp = RemoveInvestorAssignedCamp;
const RecoverInvestorAssignCamp = async (req, res) => {
    try {
        const { investor_id, camp_id } = req.body;
        const result = await (0, investor_assign_camps_1.restoreDeletedInvestorCampId)(investor_id, camp_id);
        const data = (0, helpers_1.formatResponse)(200, false, "Restored Camp To Investor!", result);
        res.status(200).json(data);
        return;
    }
    catch (error) {
        const data = (0, helpers_1.formatResponse)(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.RecoverInvestorAssignCamp = RecoverInvestorAssignCamp;
//# sourceMappingURL=remove-assigned-camp.js.map