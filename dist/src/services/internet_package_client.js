"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternetPackageFromCampAndPackageId = exports.getInternetPackageForPosOrder = exports.assignedPackageListClientPackageWise = exports.assignedPackageListCampsWise = exports.assignCamps = exports.getAssignCampsByPackageIdAndCampId = exports.getAllInternetPackagesClient = exports.updatePackageStatus = exports.getInternetPackageClientByIdWithoutStatus = exports.getInternetPackageClientById = exports.updateInternetPackageClient = exports.createInternetPackageClient = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const InternetPackageClientModel = models_1.default.InternetPackageClientModel;
const InternetPackageAssignCampsModel = models_1.default.InternetPackageAssignCampsModel;
const createInternetPackageClient = async (internetPackageClient) => {
    const data = internetPackageClient;
    data.package_status = 1;
    const result = await InternetPackageClientModel.create(data);
    return result;
};
exports.createInternetPackageClient = createInternetPackageClient;
const updateInternetPackageClient = async (id, internetPackageClient) => {
    const data = internetPackageClient;
    await InternetPackageClientModel.updateOne({ _id: id }, data);
};
exports.updateInternetPackageClient = updateInternetPackageClient;
const getInternetPackageClientById = async (id, client_id) => {
    const result = await InternetPackageClientModel.findOne({
        _id: id,
        package_status: 1,
        client_id: client_id,
    });
    return result;
};
exports.getInternetPackageClientById = getInternetPackageClientById;
const getInternetPackageClientByIdWithoutStatus = async (id) => {
    const result = await InternetPackageClientModel.findOne({ _id: id });
    return result;
};
exports.getInternetPackageClientByIdWithoutStatus = getInternetPackageClientByIdWithoutStatus;
const updatePackageStatus = async (id, package_status) => {
    await InternetPackageClientModel.updateOne({ _id: id }, { package_status: package_status });
};
exports.updatePackageStatus = updatePackageStatus;
const getAllInternetPackagesClient = async (filter) => {
    const internetPackageClient = await InternetPackageClientModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "internet_packages",
                localField: "internet_package_id",
                foreignField: "_id",
                as: "internet_package",
            },
        },
        {
            $unwind: "$internet_package",
        },
    ]);
    const results = [];
    for (const element of internetPackageClient) {
        const obj = {};
        obj.id = element._id;
        obj.client_id = element.client_id;
        obj.internet_package_id = element.internet_package_id;
        obj.package_name = element.package_name;
        obj.package_code = element.package_code;
        obj.package_speed = element.package_speed;
        obj.package_status = element.package_status;
        obj.package_price = element.package_price;
        obj.created_at = element.createdAt;
        obj.updated_at = element.updatedAt;
        obj.deleted_at = element.deleted_at;
        obj.original_package_name = "";
        obj.original_package_code = "";
        obj.original_package_speed = "";
        obj.original_package_status = "";
        obj.original_duration = "";
        obj.original_type = "";
        obj.original_volume = "";
        obj.original_download_bandwidth = "";
        obj.original_upload_bandwidth = "";
        if (element.internet_package) {
            obj.original_package_name = element.internet_package.package_name;
            obj.original_package_code = element.internet_package.package_code;
            obj.original_package_speed = element.internet_package.package_speed;
            obj.original_package_status = element.internet_package.package_status;
            obj.original_duration = (0, helpers_1.minutesToDay)(element.internet_package.duration);
            obj.original_type = element.internet_package.type;
            obj.original_volume = element.internet_package.volume;
            obj.original_download_bandwidth =
                element.internet_package.download_bandwidth;
            obj.original_upload_bandwidth = element.internet_package.upload_bandwidth;
        }
        results.push(obj);
    }
    return results;
};
exports.getAllInternetPackagesClient = getAllInternetPackagesClient;
const getAssignCampsByPackageIdAndCampId = async (client_id, package_id) => {
    const result = await InternetPackageAssignCampsModel.findOne({
        camp_id: client_id,
        package_id: package_id,
    });
    return result;
};
exports.getAssignCampsByPackageIdAndCampId = getAssignCampsByPackageIdAndCampId;
const assignCamps = async (objAssignCamps) => {
    const result = await InternetPackageAssignCampsModel.insertMany(objAssignCamps);
    return result;
};
exports.assignCamps = assignCamps;
const assignedPackageListCampsWise = async (camp_ids, status) => {
    const filter = {
        camp_id: {
            $in: camp_ids,
        },
        status: status ? parseInt(status) : { $ne: 0 },
    };
    const result = await InternetPackageAssignCampsModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "internet_package_clients",
                localField: "package_id",
                foreignField: "_id",
                as: "internet_package_client",
                pipeline: [
                    {
                        $lookup: {
                            from: "internet_packages",
                            localField: "internet_package_id",
                            foreignField: "_id",
                            as: "internet_package",
                            pipeline: [],
                        },
                    },
                    {
                        $unwind: "$internet_package",
                    },
                ],
            },
        },
        {
            $unwind: "$internet_package_client",
        },
        {
            $lookup: {
                from: "camps",
                localField: "camp_id",
                foreignField: "_id",
                as: "camp",
            },
        },
        {
            $unwind: "$camp",
        },
    ]);
    return result;
};
exports.assignedPackageListCampsWise = assignedPackageListCampsWise;
const assignedPackageListClientPackageWise = async (package_id, status, client_id) => {
    const filter = {
        package_id: (0, helpers_1.createObjectId)(package_id),
        status: status ? parseInt(status) : { $ne: 0 },
    };
    const result = await InternetPackageAssignCampsModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "internet_package_clients",
                localField: "package_id",
                foreignField: "_id",
                as: "internet_package_client",
                pipeline: [
                    {
                        $match: {
                            client_id: (0, helpers_1.createObjectId)(client_id),
                        },
                    },
                    {
                        $lookup: {
                            from: "internet_packages",
                            localField: "internet_package_id",
                            foreignField: "_id",
                            as: "internet_package",
                            pipeline: [],
                        },
                    },
                    {
                        $unwind: "$internet_package",
                    },
                ],
            },
        },
        {
            $unwind: "$internet_package_client",
        },
        {
            $lookup: {
                from: "camps",
                localField: "camp_id",
                foreignField: "_id",
                as: "camp",
            },
        },
        {
            $unwind: "$camp",
        },
    ]);
    return result;
};
exports.assignedPackageListClientPackageWise = assignedPackageListClientPackageWise;
const getInternetPackageForPosOrder = async (camp_id) => {
    const filter = {
        camp_id: camp_id,
        status: 1,
    };
    const result = await InternetPackageAssignCampsModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "internet_package_clients",
                localField: "package_id",
                foreignField: "_id",
                as: "internet_package_client",
                pipeline: [
                    {
                        $match: {
                            package_status: 1,
                        },
                    },
                    {
                        $lookup: {
                            from: "internet_packages",
                            localField: "internet_package_id",
                            foreignField: "_id",
                            as: "internet_package",
                            pipeline: [
                                {
                                    $match: {
                                        package_status: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: "$internet_package",
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
                ],
            },
        },
        {
            $unwind: "$internet_package_client",
        },
        {
            $lookup: {
                from: "camps",
                localField: "camp_id",
                foreignField: "_id",
                as: "camp",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            camp_name: 1,
                            camp_address: 1,
                            camp_city: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$camp",
        },
    ]);
    return result;
};
exports.getInternetPackageForPosOrder = getInternetPackageForPosOrder;
const getInternetPackageFromCampAndPackageId = async (camp_id, package_id) => {
    const filter = {
        camp_id: camp_id,
        package_id: package_id,
        status: 1,
    };
    const result = await InternetPackageAssignCampsModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "internet_package_clients",
                localField: "package_id",
                foreignField: "_id",
                as: "internet_package_client",
                pipeline: [
                    {
                        $match: {
                            package_status: 1,
                        },
                    },
                    {
                        $lookup: {
                            from: "internet_packages",
                            localField: "internet_package_id",
                            foreignField: "_id",
                            as: "internet_package",
                            pipeline: [
                                {
                                    $match: {
                                        package_status: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: "$internet_package",
                    },
                ],
            },
        },
        {
            $unwind: "$internet_package_client",
        },
    ]);
    if (!result || !result.length) {
        return null;
    }
    return result[0];
};
exports.getInternetPackageFromCampAndPackageId = getInternetPackageFromCampAndPackageId;
//# sourceMappingURL=internet_package_client.js.map