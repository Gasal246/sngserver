"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignDeviceCodeToCamps = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("../../models"));
const assignDeviceCodeToCamps = async (req, res) => {
    try {
        const deviceCode = await services_1.posDeviceCodeService.deviceCodeAvailableForActive(req.decodedToken.data.id, req.body.pos_device_code);
        if (!deviceCode) {
            const data = (0, helpers_1.formatResponse)(400, true, "POS device code not found", null);
            res.status(400).json(data);
            return;
        }
        if (deviceCode.is_used != 1) {
            const data = (0, helpers_1.formatResponse)(400, true, "POS device code not active", null);
            res.status(400).json(data);
            return;
        }
        const campIdArray = req.body.camp_ids.split(",");
        if ((0, helpers_1.hasDuplicate)(campIdArray)) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_CAMP_SELECTION, null);
            res.status(400).json(data);
            return;
        }
        for (const camp of campIdArray) {
            if (!(0, mongoose_1.isValidObjectId)(camp)) {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_CAMP_SELECTION, null);
                res.status(400).json(data);
                return;
            }
            const clientIdPromise = services_1.campService.getCampByClientIdAndId(req.decodedToken.data.id, camp);
            const isCampAssignToDevicePromise = services_1.campAssignPosDeviceService.isCampAssignToDeviceModel(deviceCode._id.toString(), camp);
            const [clientId, isCampAssignToDevice] = await Promise.all([
                clientIdPromise,
                isCampAssignToDevicePromise,
            ]);
            if (!clientId || isCampAssignToDevice) {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WRONG_IN_CAMP_SELECTION, null);
                res.status(400).json(data);
                return;
            }
        }
        const promises = [];
        for (const camp of campIdArray) {
            const obj = new models_1.default.campAssignPosDeviceModel();
            obj.camp_id = (0, helpers_1.createObjectId)(camp);
            obj.pos_dc_id = deviceCode._id;
            obj.status = 1;
            promises.push(services_1.campAssignPosDeviceService.assignCampToDeviceCode(obj));
        }
        await Promise.all(promises);
        const data = (0, helpers_1.formatResponse)(200, false, "POS device assigned to camps successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
    }
};
exports.assignDeviceCodeToCamps = assignDeviceCodeToCamps;
//# sourceMappingURL=assign-device-code-to-camps.js.map