"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignedClientsListPackageWise = exports.assignedPackageListClientWise = exports.isPackageCodeFound = exports.updatePackageStatus = exports.assignClients = exports.getAssignClientByPackageIdAndClientId = exports.getAllInternetPackage = exports.getInternetPackageByIdWithoutStatus = exports.checkAssignedInternetPackageByAdmin = exports.getInternetPackageById = exports.updateInternetPackage = exports.createInternetPackage = exports.checkPackageCode = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const internet_package_assign_client_model_1 = __importDefault(require("../models/internet_package_assign_client.model"));
const enums_1 = require("../types/enums");
const internetPackageModel = models_1.default.internetPackageModel;
const InternetPackageAssignClientModel = models_1.default.InternetPackageAssignClientModel;
const checkPackageCode = async (package_code, id) => {
    const filter = {
        package_code: package_code,
        package_status: {
            $ne: 0,
        },
    };
    if (id) {
        filter._id = { $ne: (0, helpers_1.createObjectId)(id) };
    }
    const result = await internetPackageModel.findOne(filter);
    return result;
};
exports.checkPackageCode = checkPackageCode;
const createInternetPackage = async (internetPackage) => {
    const data = internetPackage;
    data.type = enums_1.InternetPackageType.FIXED_DURATION;
    data.duration = (0, helpers_1.dayToMinutes)(internetPackage.duration);
    data.package_status = 1;
    const result = await internetPackageModel.create(data);
    return result;
};
exports.createInternetPackage = createInternetPackage;
const updateInternetPackage = async (id, internetPackage) => {
    const data = internetPackage;
    data.duration = (0, helpers_1.dayToMinutes)(internetPackage.duration);
    await internetPackageModel.updateOne({ _id: id }, data);
};
exports.updateInternetPackage = updateInternetPackage;
const getInternetPackageById = async (id) => {
    const result = await internetPackageModel.findOne({
        _id: id,
        package_status: 1,
    });
    return result;
};
exports.getInternetPackageById = getInternetPackageById;
const checkAssignedInternetPackageByAdmin = async (client_id, internet_package_id) => {
    const result = await internet_package_assign_client_model_1.default.findOne({
        client_id: client_id,
        internet_package_id: internet_package_id,
    });
    return result;
};
exports.checkAssignedInternetPackageByAdmin = checkAssignedInternetPackageByAdmin;
const getInternetPackageByIdWithoutStatus = async (id) => {
    const result = await internetPackageModel.findOne({ _id: id });
    return result;
};
exports.getInternetPackageByIdWithoutStatus = getInternetPackageByIdWithoutStatus;
const getAllInternetPackage = async (package_status) => {
    const filter = {
        package_status: package_status
            ? parseInt(package_status)
            : {
                $ne: 0,
            },
    };
    const result = await internetPackageModel.find(filter);
    return result;
};
exports.getAllInternetPackage = getAllInternetPackage;
const getAssignClientByPackageIdAndClientId = async (client_id, internet_package_id) => {
    const result = await InternetPackageAssignClientModel.findOne({
        client_id: client_id,
        internet_package_id: internet_package_id,
    });
    return result;
};
exports.getAssignClientByPackageIdAndClientId = getAssignClientByPackageIdAndClientId;
const assignClients = async (objAssignClients) => {
    const result = await InternetPackageAssignClientModel.insertMany(objAssignClients);
    return result;
};
exports.assignClients = assignClients;
const updatePackageStatus = async (id, package_status) => {
    await internetPackageModel.updateOne({ _id: id }, { package_status: package_status });
};
exports.updatePackageStatus = updatePackageStatus;
const isPackageCodeFound = async (code) => {
    const result = await internetPackageModel.findOne({
        package_code: code,
        status: 1,
    });
    return result;
};
exports.isPackageCodeFound = isPackageCodeFound;
const assignedPackageListClientWise = async (clientId, status) => {
    const filter = {
        package_status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const result = await InternetPackageAssignClientModel.aggregate([
        {
            $match: { client_id: (0, helpers_1.createObjectId)(clientId) },
        },
        {
            $lookup: {
                from: "internet_packages",
                localField: "internet_package_id",
                foreignField: "_id",
                as: "internet_package",
                pipeline: [
                    {
                        $match: filter,
                    },
                ],
            },
        },
        {
            $unwind: "$internet_package",
        },
    ]);
    return result;
};
exports.assignedPackageListClientWise = assignedPackageListClientWise;
const assignedClientsListPackageWise = async (internet_package_id, status) => {
    const filter = {
        package_status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const result = await InternetPackageAssignClientModel.aggregate([
        {
            $match: { internet_package_id: (0, helpers_1.createObjectId)(internet_package_id) },
        },
        {
            $lookup: {
                from: "internet_packages",
                localField: "internet_package_id",
                foreignField: "_id",
                as: "internet_package",
                pipeline: [
                    {
                        $match: filter,
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
                as: "client",
            },
        },
        {
            $unwind: "$client",
        },
    ]);
    return result;
};
exports.assignedClientsListPackageWise = assignedClientsListPackageWise;
//# sourceMappingURL=internet_package.js.map