"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignDeviceCodeToPos = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("../../models"));
const assignDeviceCodeToPos = async (req, res) => {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.body.pos_id)) {
            const data = (0, helpers_1.formatResponse)(400, true, "POS user record not available", null);
            res.status(400).json(data);
            return;
        }
        const pos = await services_1.posService.getPosByClientIdAndId(req.decodedToken.data.id, req.body.pos_id);
        if (!pos) {
            const data = (0, helpers_1.formatResponse)(400, true, "POS user record not available", null);
            res.status(400).json(data);
            return;
        }
        const deviceIdArray = req.body.pos_device_codes.split(",");
        const deviceCodeArray = [];
        if ((0, helpers_1.hasDuplicate)(deviceIdArray)) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_DEVICE_SELECTION, null);
            res.status(400).json(data);
            return;
        }
        for (let index = 0; index < deviceIdArray.length; index++) {
            const element = deviceIdArray[index];
            const deviceCode = await services_1.posDeviceCodeService.deviceCodeAvailableForPos(req.decodedToken.data.id, element);
            if (!deviceCode) {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_DEVICE_SELECTION, null);
                res.status(400).json(data);
                return;
            }
            const deviceAssigned = await services_1.posAssignPosDeviceService.isPosAssignToDeviceModel(deviceCode._id.toString(), req.body.pos_id);
            if (deviceAssigned) {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_DEVICE_SELECTION, null);
                res.status(400).json(data);
                return;
            }
            deviceCodeArray.push(deviceCode);
        }
        const promises = [];
        for (const deviceCode of deviceCodeArray) {
            const obj = new models_1.default.posAssignPosDeviceModel();
            obj.pos_dc_id = deviceCode._id;
            obj.pos_id = (0, helpers_1.createObjectId)(req.body.pos_id);
            obj.status = 1;
            promises.push(services_1.posAssignPosDeviceService.assignPosToDeviceCode(obj));
        }
        await Promise.all(promises);
        const data = (0, helpers_1.formatResponse)(200, false, "POS device codes assigned to pos successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
    }
};
exports.assignDeviceCodeToPos = assignDeviceCodeToPos;
//# sourceMappingURL=assign-device-code-to-pos.js.map