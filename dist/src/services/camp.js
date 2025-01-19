"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampCurrencyCode = exports.getBaseCampUserDetails = exports.getCampAssignDeviceDetails = exports.getCampByLocationApi = exports.checkCampsByIdsFromClient = exports.getCampByMacAddress = exports.getCampByClientId = exports.getCampByClientIdAndId = exports.getCampsCount = exports.getAllCamps = exports.updateStatus = exports.getCampByIdWithoutStatus = exports.getCampById = exports.updateCamp = exports.createCamp = exports.checkCampName = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const campModel = models_1.default.campModel;
const checkCampName = async (camp_name, id) => {
    const filter = {
        camp_name: camp_name,
        status: {
            $ne: 0,
        },
    };
    if (id) {
        filter._id = { $ne: (0, helpers_1.createObjectId)(id) };
    }
    const result = await campModel.findOne(filter);
    return result;
};
exports.checkCampName = checkCampName;
const createCamp = async (clientId, camp) => {
    const obj = camp;
    obj.client_id = (0, helpers_1.createObjectId)(clientId);
    obj.status = 1;
    obj.router_ssid = obj.router_ssid ? obj.router_ssid : "";
    obj.router_secondary_ip = obj.router_secondary_ip
        ? obj.router_secondary_ip
        : "";
    obj.router_pass = obj.router_pass ? obj.router_pass : "";
    obj.router_secret = obj.router_secret ? obj.router_secret : "";
    obj.router_alias = obj.router_alias ? obj.router_alias : "";
    obj.router_hostname = obj.router_hostname ? obj.router_hostname : "";
    obj.camp_uuid = obj.camp_uuid ? obj.camp_uuid : "";
    const result = await campModel.create(obj);
    return result;
};
exports.createCamp = createCamp;
const updateCamp = async (id, client) => {
    const obj = client;
    obj.router_ssid = obj.router_ssid ? obj.router_ssid : "";
    obj.router_secondary_ip = obj.router_secondary_ip
        ? obj.router_secondary_ip
        : "";
    obj.router_pass = obj.router_pass ? obj.router_pass : "";
    obj.router_secret = obj.router_secret ? obj.router_secret : "";
    obj.router_alias = obj.router_alias ? obj.router_alias : "";
    obj.router_hostname = obj.router_hostname ? obj.router_hostname : "";
    obj.camp_uuid = obj.camp_uuid ? obj.camp_uuid : "";
    await campModel.updateOne({ _id: id }, obj);
};
exports.updateCamp = updateCamp;
const getCampById = async (id) => {
    const result = await campModel.findOne({
        _id: (0, helpers_1.createObjectId)(id),
        status: 1,
    });
    return result;
};
exports.getCampById = getCampById;
const getCampByIdWithoutStatus = async (id) => {
    const result = await campModel.findOne({ _id: id });
    return result;
};
exports.getCampByIdWithoutStatus = getCampByIdWithoutStatus;
const updateStatus = async (id, status) => {
    await campModel.updateOne({ _id: id }, { status: status });
};
exports.updateStatus = updateStatus;
const getAllCamps = async (id, status) => {
    const filter = {
        client_id: id,
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const result = await campModel.find(filter);
    return result;
};
exports.getAllCamps = getAllCamps;
const getCampsCount = async (clientId) => {
    const result = await campModel.count({
        client_id: clientId,
        status: {
            $ne: 0,
        },
    });
    return result;
};
exports.getCampsCount = getCampsCount;
const getCampByClientIdAndId = async (clientId, id) => {
    const result = await campModel.findOne({
        _id: id,
        client_id: clientId,
        status: 1,
    });
    return result;
};
exports.getCampByClientIdAndId = getCampByClientIdAndId;
const getCampByClientId = async (clientId) => {
    const result = await campModel.find({ client_id: clientId, status: 1 });
    return result;
};
exports.getCampByClientId = getCampByClientId;
const getCampByMacAddress = async (mac) => {
    const result = await campModel.findOne({
        router_mac_address: mac,
        status: 1,
    });
    return result;
};
exports.getCampByMacAddress = getCampByMacAddress;
const checkCampsByIdsFromClient = async (campIds, client_id) => {
    const filter = {
        _id: {
            $in: campIds,
        },
        status: 1,
    };
    if (client_id) {
        filter.client_id = client_id;
    }
    const getCamps = await campModel.find(filter);
    if (campIds.length !== getCamps.length) {
        return false;
    }
    return true;
};
exports.checkCampsByIdsFromClient = checkCampsByIdsFromClient;
const getCampByLocationApi = async () => {
    const result = await campModel.findOne({ status: 1 });
    return result;
};
exports.getCampByLocationApi = getCampByLocationApi;
const getCampAssignDeviceDetails = async (campId, clientId) => {
    const filter = {
        _id: campId,
        status: 1,
        client_id: clientId,
    };
    const result = await campModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "cam_assign_pos_devices",
                localField: "_id",
                foreignField: "camp_id",
                as: "camp_assign_pos_device",
                pipeline: [
                    {
                        $match: {
                            status: 1,
                        },
                    },
                    {
                        $lookup: {
                            from: "pos_device_codes",
                            localField: "pos_dc_id",
                            foreignField: "_id",
                            as: "pos_device_code",
                        },
                    },
                    { $unwind: "$pos_device_code" },
                    {
                        $addFields: {
                            assigned_id: "$_id",
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                id: "$_id",
            },
        },
        {
            $unset: [
                "__v",
                "camp_assign_pos_device.pos_device_code.__v",
                "camp_assign_pos_device.__v",
                "_id",
                "camp_assign_pos_device.pos_device_code._id",
                "camp_assign_pos_device._id",
            ],
        },
    ]);
    return result;
};
exports.getCampAssignDeviceDetails = getCampAssignDeviceDetails;
const getBaseCampUserDetails = async (client_id, camp_id) => {
    const filter = {
        client_id: client_id,
        status: 1,
    };
    if (camp_id) {
        filter._id = (0, helpers_1.createObjectId)(camp_id);
    }
    const result = await campModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "user_camps",
                localField: "_id",
                foreignField: "camp_id",
                as: "user_camp",
                pipeline: [
                    {
                        $match: {
                            status: 1,
                        },
                    },
                    {
                        $lookup: {
                            from: "user_registers",
                            localField: "user_id",
                            foreignField: "_id",
                            pipeline: [
                                {
                                    $match: {
                                        status: 1,
                                    },
                                },
                                {
                                    $project: {
                                        id: "$_id",
                                        _id: 0,
                                        name: 1,
                                        uuid: 1,
                                        device_mac_id: 1,
                                        status: 1,
                                        phone: 1,
                                    },
                                },
                            ],
                            as: "user",
                        },
                    },
                    { $unwind: "$user" },
                    {
                        $project: {
                            assign_id: "$_id",
                            _id: 0,
                            user_id: 1,
                            camp_id: 1,
                            client_id: 1,
                            status: 1,
                            user: 1,
                        },
                    },
                ],
            },
        },
        {
            $project: {
                id: "$_id",
                _id: 0,
                camp_name: 1,
                camp_address: 1,
                camp_city: 1,
                status: 1,
                user_camp: 1,
            },
        },
    ]);
    return result;
};
exports.getBaseCampUserDetails = getBaseCampUserDetails;
const getCampCurrencyCode = async (location_id) => {
    const result = await campModel.aggregate([
        {
            $match: { _id: (0, helpers_1.createObjectId)(location_id) },
        },
        {
            $lookup: {
                from: "clients",
                localField: "client_id",
                foreignField: "_id",
                as: "client_data",
                pipeline: [
                    {
                        $project: {
                            currency_code: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$client_data",
        },
    ]);
    return result;
};
exports.getCampCurrencyCode = getCampCurrencyCode;
//# sourceMappingURL=camp.js.map