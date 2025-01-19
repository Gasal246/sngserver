"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCampClientWise = exports.getExpireSubscriptionClient = exports.checkClientsByIds = exports.updateOne = exports.getClientByIdWithoutStatus = exports.getClientById = exports.getAllClient = exports.updateStatus = exports.updateClient = exports.createClient = exports.getClientWithRole = exports.checkEmail = exports.getClientByEmail = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const clientModel = models_1.default.clientModel;
const getClientByEmail = async (email) => {
    const result = await clientModel.findOne({ email: email, status: 1 });
    return result;
};
exports.getClientByEmail = getClientByEmail;
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
    const result = await clientModel.findOne(filter);
    return result;
};
exports.checkEmail = checkEmail;
const getClientWithRole = async (_id) => {
    const result = await clientModel.aggregate([
        {
            $match: { $and: [{ _id: _id }, { status: 1 }] },
        },
        {
            $lookup: {
                from: "roles",
                localField: "role_id",
                foreignField: "_id",
                pipeline: [{ $project: { name: 1 } }],
                as: "roles",
            },
        },
        {
            $match: {
                "roles.name": "Client Admin",
            },
        },
        { $unwind: "$roles" },
    ]);
    return result;
};
exports.getClientWithRole = getClientWithRole;
const createClient = async (roleId, client) => {
    const user = client;
    user.status = 1;
    user.role_id = roleId;
    user.password = (0, helpers_1.generateHash)(user.password);
    const result = await clientModel.create(user);
    return result;
};
exports.createClient = createClient;
const updateClient = async (id, client) => {
    const user = client;
    user.password = (0, helpers_1.generateHash)(user.password);
    await clientModel.updateOne({ _id: id }, user);
};
exports.updateClient = updateClient;
const updateStatus = async (id, status) => {
    await clientModel.updateOne({ _id: id }, { status: status });
};
exports.updateStatus = updateStatus;
const getAllClient = async (status) => {
    const filter = {
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const result = await clientModel.find(filter, { password: 0 });
    return result;
};
exports.getAllClient = getAllClient;
const getClientById = async (id) => {
    const result = await clientModel.findOne({ _id: id, status: 1 });
    return result;
};
exports.getClientById = getClientById;
const getClientByIdWithoutStatus = async (id) => {
    const result = await clientModel.findOne({ _id: id });
    return result;
};
exports.getClientByIdWithoutStatus = getClientByIdWithoutStatus;
const updateOne = async (_id, obj) => {
    await clientModel.updateOne({ _id: _id }, obj);
};
exports.updateOne = updateOne;
const checkClientsByIds = async (clientIds) => {
    const getClients = await clientModel.find({
        _id: {
            $in: clientIds,
        },
        status: 1,
    });
    if (clientIds.length !== getClients.length) {
        return false;
    }
    return true;
};
exports.checkClientsByIds = checkClientsByIds;
const getExpireSubscriptionClient = async (date) => {
    const result = await clientModel.find({
        subscription_end: { $lt: date },
        status: 1,
    });
    return result;
};
exports.getExpireSubscriptionClient = getExpireSubscriptionClient;
const getAllCampClientWise = async () => {
    const result = await clientModel.aggregate([
        {
            $match: { status: 1 },
        },
        {
            $lookup: {
                from: "camps",
                localField: "_id",
                foreignField: "client_id",
                as: "camps",
                pipeline: [
                    {
                        $match: {
                            status: 1,
                        },
                    },
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                ],
            },
        },
        {
            $project: {
                id: "$_id",
                _id: 0,
                full_name: 1,
                camps: 1,
            },
        },
        {
            $unset: ["camps.__v", "camps._id"],
        },
    ]);
    return result;
};
exports.getAllCampClientWise = getAllCampClientWise;
//# sourceMappingURL=client.js.map