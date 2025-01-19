"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = exports.getPosWithRole = exports.getPosByEmail = exports.getPosByClientIdAndId = exports.getAllPos = exports.updateStatus = exports.updatePos = exports.createPos = exports.getPosByIdWithoutStatus = exports.getPosById = exports.getPosCount = exports.checkIp = exports.checkEmail = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const posModel = models_1.default.posModel;
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
    const result = await posModel.findOne(filter);
    return result;
};
exports.checkEmail = checkEmail;
const checkIp = async (ip, id) => {
    const filter = {
        ip_mac: ip,
        status: {
            $ne: 0,
        },
    };
    if (id) {
        filter._id = { $ne: (0, helpers_1.createObjectId)(id) };
    }
    const result = await posModel.findOne(filter);
    return result;
};
exports.checkIp = checkIp;
const getPosCount = async (clientId) => {
    const result = await posModel.count({
        client_id: clientId,
        status: {
            $ne: 0,
        },
    });
    return result;
};
exports.getPosCount = getPosCount;
const getPosById = async (id) => {
    const result = await posModel.findOne({ _id: id, status: 1 });
    return result;
};
exports.getPosById = getPosById;
const getPosByIdWithoutStatus = async (id) => {
    const result = await posModel.findOne({ _id: id });
    return result;
};
exports.getPosByIdWithoutStatus = getPosByIdWithoutStatus;
const createPos = async (clientId, roleId, posObj) => {
    const pos = posObj;
    pos.status = 1;
    pos.role_id = roleId;
    pos.client_id = clientId;
    pos.password = (0, helpers_1.generateHash)(pos.password);
    return await posModel.create(pos);
};
exports.createPos = createPos;
const updatePos = async (id, posObj) => {
    const pos = posObj;
    pos.password = (0, helpers_1.generateHash)(pos.password);
    await posModel.updateOne({ _id: id }, pos);
};
exports.updatePos = updatePos;
const updateStatus = async (id, status) => {
    await posModel.updateOne({ _id: id }, { status: status });
};
exports.updateStatus = updateStatus;
const getAllPos = async (id, status) => {
    const filter = {
        client_id: id,
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const result = await posModel.find(filter);
    return result;
};
exports.getAllPos = getAllPos;
const getPosByClientIdAndId = async (clientId, id) => {
    const result = await posModel.findOne({
        _id: id,
        client_id: clientId,
        status: 1,
    });
    return result;
};
exports.getPosByClientIdAndId = getPosByClientIdAndId;
const getPosByEmail = async (email) => {
    const result = await posModel.findOne({ email: email, status: 1 });
    return result;
};
exports.getPosByEmail = getPosByEmail;
const getPosWithRole = async (_id) => {
    const result = await posModel.aggregate([
        {
            $match: { _id: _id, status: 1 },
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
                "roles.name": "POS",
            },
        },
        { $unwind: "$roles" },
    ]);
    return result;
};
exports.getPosWithRole = getPosWithRole;
const updateOne = async (_id, obj) => {
    await posModel.updateOne({ _id: _id }, obj);
};
exports.updateOne = updateOne;
//# sourceMappingURL=pos.js.map