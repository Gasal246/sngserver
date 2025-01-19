"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNationalType = exports.updateStatus = exports.getNationalTypeByIdWithoutStatus = exports.getNationalTypeById = exports.getAllNationalTypes = exports.checkUniqueName = exports.createNationalType = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const nationalTypeModel = models_1.default.nationalTypeModel;
const createNationalType = async (nationalType) => {
    const nationalTypeData = nationalType;
    nationalTypeData.status = 1;
    return await nationalTypeModel.create(nationalTypeData);
};
exports.createNationalType = createNationalType;
const checkUniqueName = async (name, id) => {
    const filter = {
        name: name,
        status: {
            $ne: 0,
        },
    };
    if (id) {
        filter._id = { $ne: (0, helpers_1.createObjectId)(id) };
    }
    return await nationalTypeModel.findOne(filter);
};
exports.checkUniqueName = checkUniqueName;
const getAllNationalTypes = async (status) => {
    const filter = {
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const results = await nationalTypeModel.find(filter);
    return results;
};
exports.getAllNationalTypes = getAllNationalTypes;
const getNationalTypeById = async (id) => {
    return await nationalTypeModel.findOne({ _id: id, status: 1 });
};
exports.getNationalTypeById = getNationalTypeById;
const getNationalTypeByIdWithoutStatus = async (id) => {
    return await nationalTypeModel.findOne({ _id: id });
};
exports.getNationalTypeByIdWithoutStatus = getNationalTypeByIdWithoutStatus;
const updateStatus = async (id, status) => {
    await nationalTypeModel.updateOne({ _id: id }, { status: status });
    return;
};
exports.updateStatus = updateStatus;
const updateNationalType = async (id, nationalType) => {
    const nationalTypeData = nationalType;
    await nationalTypeModel.updateOne({ _id: id }, nationalTypeData);
    return;
};
exports.updateNationalType = updateNationalType;
//# sourceMappingURL=national_type.js.map