"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignCampToInvestor = void 0;
const helpers_1 = require("../../helpers");
const investor_assign_camps_1 = require("../../services/investor_assign_camps");
const assignCampToInvestor = async (req, res) => {
    try {
        const campIds = req.body.camp_id ? req.body.camp_id.split(",") : [];
        const documentPromises = campIds.map((campId) => (0, investor_assign_camps_1.createInvestorAssignCampDocument)(req.body.investor_id, campId));
        const addedDocuments = await Promise.all(documentPromises);
        const data = (0, helpers_1.formatResponse)(200, false, "Camp Successfully Assigned!", addedDocuments);
        res.status(200).json(data);
    }
    catch (error) {
        const data = (0, helpers_1.formatResponse)(500, true, error.message || "An unexpected error occurred", null);
        res.status(500).json(data);
    }
};
exports.assignCampToInvestor = assignCampToInvestor;
//# sourceMappingURL=assign-camp.js.map