"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = exports.getCoordinatorByIdWithPassword = exports.getCoordinatorByEmail = exports.getCoordinatorCount = exports.getCoordinatorByIdWithoutStatus = exports.getCoordinatorById = exports.getAllCoordinator = exports.updateStatus = exports.updateCoordinator = exports.checkEmail = exports.createCoordinator = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const coordinatorModel = models_1.default.coordinatorModel;
const createCoordinator = async (role_id, coordinator) => {
    const coordinatorData = coordinator;
    coordinatorData.role_id = role_id;
    coordinatorData.status = 1;
    coordinatorData.password = (0, helpers_1.generateHash)(coordinatorData.password);
    return await coordinatorModel.create(coordinatorData);
};
exports.createCoordinator = createCoordinator;
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
    return await coordinatorModel.findOne(filter);
};
exports.checkEmail = checkEmail;
const updateCoordinator = async (id, coordinator) => {
    const coordinatorData = coordinator;
    coordinatorData.password = (0, helpers_1.generateHash)(coordinatorData.password);
    await coordinatorModel.updateOne({ _id: id }, coordinatorData);
    return;
};
exports.updateCoordinator = updateCoordinator;
const updateStatus = async (id, status) => {
    await coordinatorModel.updateOne({ _id: id }, { status: status });
    return;
};
exports.updateStatus = updateStatus;
const getAllCoordinator = async (filter) => {
    const results = await coordinatorModel.find(filter, { password: 0 });
    return results;
};
exports.getAllCoordinator = getAllCoordinator;
const getCoordinatorById = async (id, client_id) => {
    return await coordinatorModel.findOne({ _id: id, client_id: client_id, status: 1 }, { password: 0 });
};
exports.getCoordinatorById = getCoordinatorById;
const getCoordinatorByIdWithoutStatus = async (id, client_id) => {
    return await coordinatorModel.findOne({ _id: id, client_id: client_id });
};
exports.getCoordinatorByIdWithoutStatus = getCoordinatorByIdWithoutStatus;
const getCoordinatorCount = async (clientId) => {
    const result = await coordinatorModel.count({
        client_id: clientId,
        status: {
            $ne: 0,
        },
    });
    return result;
};
exports.getCoordinatorCount = getCoordinatorCount;
const getCoordinatorByEmail = async (email) => {
    const result = await coordinatorModel.findOne({ email: email, status: 1 });
    return result;
};
exports.getCoordinatorByEmail = getCoordinatorByEmail;
const getCoordinatorByIdWithPassword = async (id, client_id) => {
    return await coordinatorModel.findOne({
        _id: id,
        client_id: client_id,
        status: 1,
    });
};
exports.getCoordinatorByIdWithPassword = getCoordinatorByIdWithPassword;
const updateOne = async (_id, obj) => {
    await coordinatorModel.updateOne({ _id: _id }, obj);
};
exports.updateOne = updateOne;
//# sourceMappingURL=coordinator.js.map