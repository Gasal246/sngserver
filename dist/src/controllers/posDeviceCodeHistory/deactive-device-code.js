"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deActiveDeviceCode = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const deActiveDeviceCode = async (req, res) => {
    try {
        const deviceCode = await services_1.posDeviceCodeService.deviceCodeAvailableForActive(req.decodedToken.data.id, req.body.pos_device_code);
        if (!deviceCode) {
            const data = (0, helpers_1.formatResponse)(400, true, "POS device code not found", null);
            res.status(400).json(data);
            return;
        }
        if (deviceCode.status != 1) {
            const data = (0, helpers_1.formatResponse)(400, true, "POS device code either deleted or inactivated", null);
            res.status(400).json(data);
            return;
        }
        if (deviceCode.is_used != 1) {
            const data = (0, helpers_1.formatResponse)(400, true, "POS device code is not used so you can't deactivate this", null);
            res.status(400).json(data);
            return;
        }
        const deviceCodeHistory = await services_1.posDeviceCodeHistoryService.getDeviceCodeHistory(deviceCode._id);
        if (!deviceCodeHistory) {
            const data = (0, helpers_1.formatResponse)(400, true, "POS device code is not used so you can't deactivate this", null);
            res.status(400).json(data);
            return;
        }
        await services_1.posDeviceCodeHistoryService.deactivatePosDeviceCodeHistory(deviceCodeHistory._id);
        await services_1.posDeviceCodeService.deactivateDeviceCode(deviceCode._id);
        const data = (0, helpers_1.formatResponse)(200, false, "POS device code DeActivated.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
    }
};
exports.deActiveDeviceCode = deActiveDeviceCode;
//# sourceMappingURL=deactive-device-code.js.map