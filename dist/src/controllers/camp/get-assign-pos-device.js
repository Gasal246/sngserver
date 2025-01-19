"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignPosDevice = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getAssignPosDevice = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id : "";
        const camps = await services_1.campService.getCampAssignDeviceDetails((0, helpers_1.createObjectId)(id), (0, helpers_1.createObjectId)(req.decodedToken.data.id));
        if (!camps || !camps.length) {
            const data = (0, helpers_1.formatResponse)(400, true, "Camp record not available", null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "camp assign pos device details", {
            list: camps,
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
exports.getAssignPosDevice = getAssignPosDevice;
//# sourceMappingURL=get-assign-pos-device.js.map