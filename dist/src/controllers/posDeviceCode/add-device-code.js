"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDeviceCode = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("../../models"));
const addDeviceCode = async (req, res) => {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.body.client_id) ||
            !(await services_1.clientService.getClientById(req.body.client_id))) {
            const data = (0, helpers_1.formatResponse)(400, true, "Client admin not found.", null);
            res.status(400).json(data);
            return;
        }
        let deviceCodeFound = null;
        let code = "";
        for (let index = 0; index < req.body.no_of_code; index++) {
            const deviceCode = new models_1.default.posDeviceCodeModel();
            deviceCode.client_id = req.body.client_id;
            deviceCode.is_used = 0;
            deviceCode.status = 1;
            do {
                code = (0, helpers_1.generateRandomDeviceCode)();
                deviceCodeFound = await services_1.posDeviceCodeService.isDeviceCodeFound(code);
            } while (deviceCodeFound != null);
            deviceCode.pos_device_code = code;
            await services_1.posDeviceCodeService.createDeviceCode(deviceCode);
        }
        const data = (0, helpers_1.formatResponse)(200, false, "POS device code created successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
    }
};
exports.addDeviceCode = addDeviceCode;
//# sourceMappingURL=add-device-code.js.map