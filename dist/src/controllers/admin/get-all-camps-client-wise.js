"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCampsClientWise = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const getAllCampsClientWise = async (req, res) => {
    try {
        const campsData = await services_1.clientService.getAllCampClientWise();
        const data = (0, helpers_1.formatResponse)(200, false, "camp details", {
            camp_details: campsData,
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
exports.getAllCampsClientWise = getAllCampsClientWise;
//# sourceMappingURL=get-all-camps-client-wise.js.map