"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseCamp = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const getBaseCamp = async (req, res) => {
    try {
        const campDetails = await services_1.userCampService.getBaseCampDetailsFromUser(req.decodedToken.data.id);
        if (!campDetails) {
            const data = (0, helpers_1.formatResponse)(400, true, "No base camp found.", null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "camp details", {
            camp_details: campDetails,
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
exports.getBaseCamp = getBaseCamp;
//# sourceMappingURL=get-base-camp.js.map