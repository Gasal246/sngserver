"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDeviceCodeHistory = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const addDeviceCodeHistory = async (req, res) => {
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
        if (deviceCode.is_used != 0) {
            const data = (0, helpers_1.formatResponse)(400, true, "POS device code already activated. Please de-active first existing one.", null);
            res.status(400).json(data);
            return;
        }
        const deviceCodeActiveWithMac = await services_1.posDeviceCodeHistoryService.getDeviceByMacAddress(req.body.device_mac_address);
        if (deviceCodeActiveWithMac) {
            const data = (0, helpers_1.formatResponse)(400, true, "Device mac address already associate with another device code.Please provide new mac address.", null);
            res.status(400).json(data);
            return;
        }
        await services_1.posDeviceCodeHistoryService.createPosDeviceHistory(deviceCode._id, req.body);
        await services_1.posDeviceCodeService.activeDeviceCode(deviceCode._id);
        const data = (0, helpers_1.formatResponse)(200, false, "POS device code activated.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
    }
};
exports.addDeviceCodeHistory = addDeviceCodeHistory;
//# sourceMappingURL=add-device-code-history.js.map