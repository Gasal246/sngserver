"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosCampsClientWise = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const getPosCampsClientWise = async (req, res) => {
    try {
        const campDetails = await services_1.campService.getCampByClientId(req.decodedToken.data.client_id);
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
exports.getPosCampsClientWise = getPosCampsClientWise;
//# sourceMappingURL=get-pos-camps-client-wise.js.map