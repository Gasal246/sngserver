"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceCodeAvailableForPos = exports.updateStatus = exports.getPosDeviceCodeByIdWithoutStatus = exports.getPosDeviceCodeById = exports.getDeviceCodeWithHistoryByClient = exports.getDeviceCodeWithHistory = exports.getAllDeviceCode = exports.deactivateDeviceCode = exports.activeDeviceCode = exports.createDeviceCode = exports.deviceCodeAvailableForActive = exports.isDeviceCodeFound = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const posDeviceCodeModel = models_1.default.posDeviceCodeModel;
const isDeviceCodeFound = async (code) => {
    const result = await posDeviceCodeModel.findOne({ pos_device_code: code });
    return result;
};
exports.isDeviceCodeFound = isDeviceCodeFound;
const deviceCodeAvailableForActive = async (clientId, code) => {
    const result = await posDeviceCodeModel.findOne({
        client_id: clientId,
        pos_device_code: code,
    });
    return result;
};
exports.deviceCodeAvailableForActive = deviceCodeAvailableForActive;
const createDeviceCode = async (obj) => {
    const result = await posDeviceCodeModel.create(obj);
    return result;
};
exports.createDeviceCode = createDeviceCode;
const activeDeviceCode = async (id) => {
    await posDeviceCodeModel.updateOne({ _id: id }, { is_used: 1 });
};
exports.activeDeviceCode = activeDeviceCode;
const deactivateDeviceCode = async (id) => {
    await posDeviceCodeModel.updateOne({ _id: id }, { is_used: 0 });
};
exports.deactivateDeviceCode = deactivateDeviceCode;
const getAllDeviceCode = async (status) => {
    const filter = {
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const result = await posDeviceCodeModel.find(filter);
    return result;
};
exports.getAllDeviceCode = getAllDeviceCode;
const getDeviceCodeWithHistory = async (status) => {
    const filter = {
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const result = await posDeviceCodeModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "pos_device_code_histories",
                localField: "_id",
                foreignField: "pos_dc_id",
                as: "pos_device_code_history",
                pipeline: [
                    {
                        $match: {
                            code_status: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$pos_device_code_history",
                preserveNullAndEmptyArrays: true,
            },
        },
    ]);
    return result;
};
exports.getDeviceCodeWithHistory = getDeviceCodeWithHistory;
const getDeviceCodeWithHistoryByClient = async (clientId, status) => {
    const filter = {
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
        client_id: (0, helpers_1.createObjectId)(clientId),
    };
    const result = await posDeviceCodeModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "pos_device_code_histories",
                localField: "_id",
                foreignField: "pos_dc_id",
                as: "pos_device_code_history",
                pipeline: [
                    {
                        $match: {
                            code_status: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$pos_device_code_history",
                preserveNullAndEmptyArrays: true,
            },
        },
    ]);
    return result;
};
exports.getDeviceCodeWithHistoryByClient = getDeviceCodeWithHistoryByClient;
const getPosDeviceCodeById = async (id) => {
    const result = await posDeviceCodeModel.findOne({ _id: id, status: 1 });
    return result;
};
exports.getPosDeviceCodeById = getPosDeviceCodeById;
const getPosDeviceCodeByIdWithoutStatus = async (id) => {
    const result = await posDeviceCodeModel.findOne({ _id: id });
    return result;
};
exports.getPosDeviceCodeByIdWithoutStatus = getPosDeviceCodeByIdWithoutStatus;
const updateStatus = async (id, status) => {
    await posDeviceCodeModel.updateOne({ _id: id }, { status: status });
};
exports.updateStatus = updateStatus;
const deviceCodeAvailableForPos = async (clientId, deviceCode) => {
    const result = await posDeviceCodeModel.findOne({
        pos_device_code: deviceCode,
        client_id: clientId,
        status: 1,
        is_used: 1,
    });
    return result;
};
exports.deviceCodeAvailableForPos = deviceCodeAvailableForPos;
//# sourceMappingURL=pos_device_code.js.map