"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceListAssignToPos = exports.assignPosToDeviceCode = exports.isPosAssignToDeviceModel = void 0;
const helpers_1 = require("../helpers");
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
const getDeviceListAssignToPos = async (posId) => {
    const result = await posAssignPosDeviceModel.aggregate([
        {
            $match: { pos_id: (0, helpers_1.createObjectId)(posId) },
        },
        {
            $lookup: {
                from: "pos_device_code_histories",
                localField: "pos_dc_id",
                foreignField: "pos_dc_id",
                as: "device",
            },
        },
        { $unwind: "$device" },
    ]);
    return result;
};
exports.getDeviceListAssignToPos = getDeviceListAssignToPos;
//# sourceMappingURL=pos_assign_pos_device.js.map