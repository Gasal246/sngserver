"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = exports.getAccountantByIdWithPassword = exports.getAccountantByEmail = exports.getAccountantCount = exports.updateStatus = exports.getAllAccountant = exports.updateAccountant = exports.getAccountantByIdWithoutStatus = exports.getAccountantById = exports.checkEmail = exports.createAccountant = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const accountantModel = models_1.default.accountantModel;
const createAccountant = async (role_id, accountant) => {
    const accountantData = accountant;
    accountantData.role_id = role_id;
    accountantData.status = 1;
    accountantData.password = (0, helpers_1.generateHash)(accountantData.password);
    return await accountantModel.create(accountantData);
};
exports.createAccountant = createAccountant;
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
    return await accountantModel.findOne(filter);
};
exports.checkEmail = checkEmail;
const getAccountantById = async (id, client_id) => {
    return await accountantModel.findOne({ _id: id, client_id: client_id, status: 1 }, { password: 0 });
};
exports.getAccountantById = getAccountantById;
const getAccountantByIdWithoutStatus = async (id, client_id) => {
    return await accountantModel.findOne({ _id: id, client_id: client_id });
};
exports.getAccountantByIdWithoutStatus = getAccountantByIdWithoutStatus;
const updateAccountant = async (id, accountant) => {
    const accountantData = accountant;
    accountantData.password = (0, helpers_1.generateHash)(accountantData.password);
    await accountantModel.updateOne({ _id: id }, accountantData);
    return;
};
exports.updateAccountant = updateAccountant;
const getAllAccountant = async (filter) => {
    const result = await accountantModel.find(filter, { password: 0 });
    return result;
};
exports.getAllAccountant = getAllAccountant;
const updateStatus = async (id, status) => {
    await accountantModel.updateOne({ _id: id }, { status: status });
    return;
};
exports.updateStatus = updateStatus;
const getAccountantCount = async (clientId) => {
    const result = await accountantModel.count({
        client_id: clientId,
        status: {
            $ne: 0,
        },
    });
    return result;
};
exports.getAccountantCount = getAccountantCount;
const getAccountantByEmail = async (email) => {
    const result = await accountantModel.findOne({ email: email, status: 1 });
    return result;
};
exports.getAccountantByEmail = getAccountantByEmail;
const getAccountantByIdWithPassword = async (id, client_id) => {
    return await accountantModel.findOne({
        _id: id,
        client_id: client_id,
        status: 1,
    });
};
exports.getAccountantByIdWithPassword = getAccountantByIdWithPassword;
const updateOne = async (_id, obj) => {
    await accountantModel.updateOne({ _id: _id }, obj);
};
exports.updateOne = updateOne;
//# sourceMappingURL=accountant.js.map