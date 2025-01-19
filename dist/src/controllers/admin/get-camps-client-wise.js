"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampsClientWise = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const getCampsClientWise = async (req, res) => {
    try {
        const campDetails = await services_1.campService.getCampByClientId(req.params.id);
        if (!campDetails || !campDetails.length) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
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
exports.getCampsClientWise = getCampsClientWise;
//# sourceMappingURL=get-camps-client-wise.js.map