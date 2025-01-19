"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignCampToDeviceCode = exports.isCampAssignToDeviceModel = void 0;
const models_1 = __importDefault(require("../models"));
const campAssignPosDeviceModel = models_1.default.campAssignPosDeviceModel;
const isCampAssignToDeviceModel = async (poc_dc_id, camp_id) => {
    const result = await campAssignPosDeviceModel.findOne({
        pos_dc_id: poc_dc_id,
        camp_id: camp_id,
        status: 1,
    });
    return result;
};
exports.isCampAssignToDeviceModel = isCampAssignToDeviceModel;
const assignCampToDeviceCode = async (obj) => {
    const result = await campAssignPosDeviceModel.create(obj);
    return result;
};
exports.assignCampToDeviceCode = assignCampToDeviceCode;
//# sourceMappingURL=camp_assign_pos_device.js.map