"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceByMacAddress = exports.getDeviceCodeHistory = exports.deactivatePosDeviceCodeHistory = exports.createPosDeviceHistory = void 0;
const models_1 = __importDefault(require("../models"));
const posDeviceCodeHistoryModel = models_1.default.posDeviceCodeHistoryModel;
const createPosDeviceHistory = async (deviceCodeId, deviceCodeHistoryObj) => {
    const posDeviceCodeHistory = deviceCodeHistoryObj;
    posDeviceCodeHistory.pos_dc_id = deviceCodeId;
    posDeviceCodeHistory.code_status = 1;
    const result = await posDeviceCodeHistoryModel.create(posDeviceCodeHistory);
    return result;
};
exports.createPosDeviceHistory = createPosDeviceHistory;
const deactivatePosDeviceCodeHistory = async (id) => {
    await posDeviceCodeHistoryModel.updateOne({ _id: id }, { code_status: 3 });
};
exports.deactivatePosDeviceCodeHistory = deactivatePosDeviceCodeHistory;
const getDeviceCodeHistory = async (deviceCodeId) => {
    const result = await posDeviceCodeHistoryModel.findOne({
        pos_dc_id: deviceCodeId,
        code_status: 1,
    });
    return result;
};
exports.getDeviceCodeHistory = getDeviceCodeHistory;
const getDeviceByMacAddress = async (mac) => {
    const result = await posDeviceCodeHistoryModel.findOne({
        device_mac_address: mac,
        code_status: 1,
    });
    return result;
};
exports.getDeviceByMacAddress = getDeviceByMacAddress;
//# sourceMappingURL=pos_device_code_history.js.map