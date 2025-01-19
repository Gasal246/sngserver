"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneDeviceCode = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getOneDeviceCode = async (req, res) => {
    try {
        const deviceCode = await services_1.posDeviceCodeService.getPosDeviceCodeById(req.params.id);
        if (!deviceCode) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Device code detail.", {
            list: deviceCode,
        });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
    }
};
exports.getOneDeviceCode = getOneDeviceCode;
//# sourceMappingURL=get-device-code.js.map