"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPosToDeviceCode = exports.isPosAssignToDeviceModel = void 0;
const models_1 = __importDefault(require("../models"));
const posAssignPosDeviceModel = models_1.default.posAssignPosDeviceModel;
const isPosAssignToDeviceModel = async (poc_dc_id, pos_id) => {
    const result = await posAssignPosDeviceModel.findOne({
        pos_dc_id: poc_dc_id,
        pos_id: pos_id,
        status: 1,
    });
    return result;
};
exports.isPosAssignToDeviceModel = isPosAssignToDeviceModel;
const assignPosToDeviceCode = async (obj) => {
    const result = await posAssignPosDeviceModel.create(obj);
    return result;
};
exports.assignPosToDeviceCode = assignPosToDeviceCode;
//# sourceMappingURL=pos_assign_pos_device.js.map