"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = exports.getPlantManagerByIdWithPassword = exports.getPlantManagerByEmail = exports.updatePlantManager = exports.updateStatus = exports.getAllPlantManager = exports.getPlantManagerByIdWithoutStatus = exports.getPlantManagerById = exports.checkEmail = exports.createPlantManager = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const plantManagerModel = models_1.default.plantManagerModel;
const createPlantManager = async (role_id, plantManager) => {
    const plantManagerData = plantManager;
    plantManagerData.client_id = null;
    plantManagerData.role_id = role_id;
    plantManagerData.status = 1;
    plantManagerData.password = (0, helpers_1.generateHash)(plantManagerData.password);
    return await plantManagerModel.create(plantManagerData);
};
exports.createPlantManager = createPlantManager;
const checkEmail = async (email, id) => {
    const filter = {
        email: email,
        status: {
            $ne: 0,
        },
    };
    if (id) {
        filter._id = { $ne: (0, helpers_1.createObjectId)(id) };
    }
    return await plantManagerModel.findOne(filter);
};
exports.checkEmail = checkEmail;
const getPlantManagerById = async (id) => {
    return await plantManagerModel.findOne({ _id: id, client_id: null, status: 1 }, { password: 0 });
};
exports.getPlantManagerById = getPlantManagerById;
const getPlantManagerByIdWithoutStatus = async (id) => {
    return await plantManagerModel.findOne({ _id: id, client_id: null });
};
exports.getPlantManagerByIdWithoutStatus = getPlantManagerByIdWithoutStatus;
const getAllPlantManager = async (filter) => {
    const results = await plantManagerModel.find(filter, { password: 0 });
    return results;
};
exports.getAllPlantManager = getAllPlantManager;
const updateStatus = async (id, status) => {
    await plantManagerModel.updateOne({ _id: id }, { status: status });
    return;
};
exports.updateStatus = updateStatus;
const updatePlantManager = async (id, plantManager) => {
    const plantManagerData = plantManager;
    plantManagerData.password = (0, helpers_1.generateHash)(plantManagerData.password);
    await plantManagerModel.updateOne({ _id: id }, plantManagerData);
    return;
};
exports.updatePlantManager = updatePlantManager;
const getPlantManagerByEmail = async (email) => {
    const result = await plantManagerModel.findOne({ email: email, status: 1 });
    return result;
};
exports.getPlantManagerByEmail = getPlantManagerByEmail;
const getPlantManagerByIdWithPassword = async (id) => {
    return await plantManagerModel.findOne({
        _id: id,
        client_id: null,
        status: 1,
    });
};
exports.getPlantManagerByIdWithPassword = getPlantManagerByIdWithPassword;
const updateOne = async (_id, obj) => {
    await plantManagerModel.updateOne({ _id: _id }, obj);
};
exports.updateOne = updateOne;
//# sourceMappingURL=plant_manager.js.map