"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = exports.getInvestorByIdWithPassword = exports.getInvestorByEmail = exports.updateStatus = exports.updateInvestor = exports.getAllInvestors = exports.getInvestorByIdWithoutStatus = exports.getInvestorById = exports.checkEmail = exports.createInvestor = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const investorsModel = models_1.default.investorsModel;
const createInvestor = async (role_id, investor) => {
    const investorData = investor;
    investorData.role_id = role_id;
    investorData.status = 1;
    investorData.password = (0, helpers_1.generateHash)(investorData.password);
    return await investorsModel.create(investorData);
};
exports.createInvestor = createInvestor;
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
    return await investorsModel.findOne(filter);
};
exports.checkEmail = checkEmail;
const getInvestorById = async (id, client_id) => {
    return await investorsModel.findOne({ _id: id, client_id: client_id, status: 1 }, { password: 0 });
};
exports.getInvestorById = getInvestorById;
const getInvestorByIdWithoutStatus = async (id, client_id) => {
    return await investorsModel.findOne({ _id: id, client_id: client_id });
};
exports.getInvestorByIdWithoutStatus = getInvestorByIdWithoutStatus;
const getAllInvestors = async (filter) => {
    const results = await investorsModel.find(filter, { password: 0 });
    return results;
};
exports.getAllInvestors = getAllInvestors;
const updateInvestor = async (id, investor) => {
    const investorData = investor;
    investorData.password = (0, helpers_1.generateHash)(investorData.password);
    await investorsModel.updateOne({ _id: id }, investorData);
    return;
};
exports.updateInvestor = updateInvestor;
const updateStatus = async (id, status) => {
    await investorsModel.updateOne({ _id: id }, { status: status });
    return;
};
exports.updateStatus = updateStatus;
const getInvestorByEmail = async (email) => {
    const result = await investorsModel.findOne({ email: email, status: 1 });
    return result;
};
exports.getInvestorByEmail = getInvestorByEmail;
const getInvestorByIdWithPassword = async (id, client_id) => {
    return await investorsModel.findOne({
        _id: id,
        client_id: client_id,
        status: 1,
    });
};
exports.getInvestorByIdWithPassword = getInvestorByIdWithPassword;
const updateOne = async (_id, obj) => {
    await investorsModel.updateOne({ _id: _id }, obj);
};
exports.updateOne = updateOne;
//# sourceMappingURL=investors.js.map