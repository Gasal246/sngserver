"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDeviceCodesByClient = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getAllDeviceCodesByClient = async (req, res) => {
    var _a;
    try {
        const status = (_a = req.query.status) === null || _a === void 0 ? void 0 : _a.toString();
        const posDeviceCodes = await services_1.posDeviceCodeService.getDeviceCodeWithHistoryByClient(req.decodedToken.data.id, status);
        const result = [];
        for (let index = 0; index < posDeviceCodes.length; index++) {
            const obj = {};
            const element = posDeviceCodes[index];
            obj.id = element._id;
            obj.client_id = element.client_id;
            obj.is_used = element.is_used;
            obj.status = element.status;
            obj.pos_device_code = element.pos_device_code;
            obj.device_name = "";
            obj.device_model = "";
            obj.device_mac_address = "";
            obj.code_status = "";
            obj.id_history = "";
            if (element.pos_device_code_history) {
                obj.device_name = element.pos_device_code_history.device_name;
                obj.device_model = element.pos_device_code_history.device_model;
                obj.device_mac_address =
                    element.pos_device_code_history.device_mac_address;
                obj.code_status = element.pos_device_code_history.code_status;
                obj.id_history = element.pos_device_code_history._id;
            }
            result.push(obj);
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Device code detail.", {
            list: result,
        });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
    }
};
exports.getAllDeviceCodesByClient = getAllDeviceCodesByClient;
//# sourceMappingURL=get-device-code-by-client.js.map