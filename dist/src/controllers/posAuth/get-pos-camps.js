"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosCamps = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const getPosCamps = async (req, res) => {
    try {
        const campDetails = await services_1.CampAssignPosService.getCampDetails(req.decodedToken.data.id);
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
exports.getPosCamps = getPosCamps;
//# sourceMappingURL=get-pos-camps.js.map