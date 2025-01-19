"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternetPackageForCoordinator = exports.getInternetPackageForAccountant = exports.getInternetPackageForClient = exports.getInternetPackageFromOrderId = exports.getInternetPackageForCamp = exports.getInternetPackageForUser = exports.getManualPendingPackage = exports.updateInternetPackage = exports.getUpcomingPendingPlanOfUser = exports.getExpireInternetPackage = exports.expireInternetPackage = exports.activeInternetPackageForUser = exports.createOrderInternetPackage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = __importDefault(require("../models"));
const enums_1 = require("../types/enums");
const orderInternetPackageModel = models_1.default.orderInternetPackageModel;
const createOrderInternetPackage = async (obj) => {
    return await orderInternetPackageModel.create(obj);
};
exports.createOrderInternetPackage = createOrderInternetPackage;
const activeInternetPackageForUser = async (user_id) => {
    const result = await orderInternetPackageModel.findOne({
        user_id: user_id,
        order_status: enums_1.OrderStatus.active,
    });
    return result;
};
exports.activeInternetPackageForUser = activeInternetPackageForUser;
const expireInternetPackage = async (id) => {
    await orderInternetPackageModel.updateOne({ _id: id }, { order_status: enums_1.OrderStatus.expire, expired_on: new Date() });
};
exports.expireInternetPackage = expireInternetPackage;
const getExpireInternetPackage = async (date) => {
    const result = await orderInternetPackageModel.find({
        package_expiry_date: { $lte: date },
        order_status: enums_1.OrderStatus.active,
    });
    return result;
};
exports.getExpireInternetPackage = getExpireInternetPackage;
const getUpcomingPendingPlanOfUser = async (user_id) => {
    const result = await orderInternetPackageModel
        .find({ user_id: user_id, order_status: enums_1.OrderStatus.pending })
        .sort({ purchase_date: 1 })
        .limit(1);
    if (!result || !result.length) {
        return null;
    }
    return result[0];
};
exports.getUpcomingPendingPlanOfUser = getUpcomingPendingPlanOfUser;
const updateInternetPackage = async (id, obj) => {
    await orderInternetPackageModel.updateOne({ _id: id }, obj);
};
exports.updateInternetPackage = updateInternetPackage;
const getManualPendingPackage = async (user_id, order_id) => {
    const result = await orderInternetPackageModel.findOne({
        user_id: user_id,
        order_status: enums_1.OrderStatus.pending,
        _id: order_id,
    });
    return result;
};
exports.getManualPendingPackage = getManualPendingPackage;
const getInternetPackageForUser = async (user_id, order_status, base_client_id) => {
    const filter = {
        user_id: user_id,
    };
    if (order_status) {
        filter.order_status = parseInt(order_status);
    }
    const result = await orderInternetPackageModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "camps",
                localField: "camp_id",
                foreignField: "_id",
                as: "order_from_camp_detail",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            camp_name: 1,
                            camp_address: 1,
                            camp_city: 1,
                            client_id: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$order_from_camp_detail",
            },
        },
        {
            $match: {
                "order_from_camp_detail.client_id": new mongoose_1.default.Types.ObjectId(base_client_id),
            },
        },
        {
            $lookup: {
                from: "user_registers",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            name: 1,
                            uuid: 1,
                            phone: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                id: "$_id",
            },
        },
        {
            $unset: ["__v", "order_from_camp_detail.__v", "_id", "user.__v"],
        },
        {
            $sort: { createdAt: -1 },
        },
        {
            $limit: 10,
        },
    ]);
    return result;
};
exports.getInternetPackageForUser = getInternetPackageForUser;
const getInternetPackageForCamp = async (camp_id, order_status) => {
    const filter = {
        camp_id: camp_id,
    };
    if (order_status) {
        filter.order_status = parseInt(order_status);
    }
    const result = await orderInternetPackageModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "camps",
                localField: "camp_id",
                foreignField: "_id",
                as: "order_from_camp_detail",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            camp_name: 1,
                            camp_address: 1,
                            camp_city: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$order_from_camp_detail",
        },
        {
            $lookup: {
                from: "user_registers",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            name: 1,
                            uuid: 1,
                            phone: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$user",
        },
        {
            $addFields: {
                id: "$_id",
            },
        },
        {
            $unset: ["__v", "order_from_camp_detail.__v", "_id", "user.__v"],
        },
    ]);
    return result;
};
exports.getInternetPackageForCamp = getInternetPackageForCamp;
const getInternetPackageFromOrderId = async (id, user_id) => {
    const result = await orderInternetPackageModel.aggregate([
        {
            $match: { _id: id, user_id: user_id },
        },
        {
            $lookup: {
                from: "camps",
                localField: "camp_id",
                foreignField: "_id",
                as: "order_from_camp_detail",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            camp_name: 1,
                            camp_address: 1,
                            camp_city: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$order_from_camp_detail",
        },
        {
            $lookup: {
                from: "user_registers",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            name: 1,
                            uuid: 1,
                            phone: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$user",
        },
        {
            $addFields: {
                id: "$_id",
            },
        },
        {
            $unset: ["__v", "order_from_camp_detail.__v", "_id", "user.__v"],
        },
    ]);
    if (!result || !result.length) {
        return null;
    }
    return result[0];
};
exports.getInternetPackageFromOrderId = getInternetPackageFromOrderId;
const getInternetPackageForClient = async (client_id, order_status) => {
    const filter = {};
    if (order_status) {
        filter.order_status = parseInt(order_status);
    }
    const result = await orderInternetPackageModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "camps",
                localField: "camp_id",
                foreignField: "_id",
                as: "order_from_camp_detail",
                pipeline: [
                    {
                        $match: {
                            client_id: client_id,
                        },
                    },
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            camp_name: 1,
                            camp_address: 1,
                            camp_city: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$order_from_camp_detail",
        },
        {
            $lookup: {
                from: "user_registers",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            name: 1,
                            uuid: 1,
                            phone: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$user",
        },
        {
            $addFields: {
                id: "$_id",
            },
        },
        {
            $unset: ["__v", "order_from_camp_detail.__v", "_id", "user.__v"],
        },
    ]);
    return result;
};
exports.getInternetPackageForClient = getInternetPackageForClient;
const getInternetPackageForAccountant = async (accountant_id, order_status) => {
    const filter = {};
    if (order_status) {
        filter.order_status = parseInt(order_status);
    }
    const result = await orderInternetPackageModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "cam_assign_accountants",
                localField: "camp_id",
                foreignField: "camp_id",
                as: "assign_accountant_details",
                pipeline: [
                    {
                        $match: {
                            accountant_id: accountant_id,
                            status: 1,
                        },
                    },
                    {
                        $addFields: {
                            assign_id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            assign_id: 1,
                            camp_id: 1,
                            accountant_id: 1,
                            status: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$assign_accountant_details",
        },
        {
            $lookup: {
                from: "camps",
                localField: "camp_id",
                foreignField: "_id",
                as: "order_from_camp_detail",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            camp_name: 1,
                            camp_address: 1,
                            camp_city: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$order_from_camp_detail",
        },
        {
            $lookup: {
                from: "user_registers",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            name: 1,
                            uuid: 1,
                            phone: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$user",
        },
        {
            $addFields: {
                id: "$_id",
            },
        },
        {
            $unset: ["__v", "order_from_camp_detail.__v", "_id", "user.__v"],
        },
    ]);
    return result;
};
exports.getInternetPackageForAccountant = getInternetPackageForAccountant;
const getInternetPackageForCoordinator = async (coordinator_id, order_status) => {
    const filter = {};
    if (order_status) {
        filter.order_status = parseInt(order_status);
    }
    const result = await orderInternetPackageModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "cam_assign_coordinators",
                localField: "camp_id",
                foreignField: "camp_id",
                as: "assign_coordinator_details",
                pipeline: [
                    {
                        $match: {
                            coordinator_id: coordinator_id,
                            status: 1,
                        },
                    },
                    {
                        $addFields: {
                            assign_id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            assign_id: 1,
                            camp_id: 1,
                            coordinator_id: 1,
                            status: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$assign_coordinator_details",
        },
        {
            $lookup: {
                from: "camps",
                localField: "camp_id",
                foreignField: "_id",
                as: "order_from_camp_detail",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            camp_name: 1,
                            camp_address: 1,
                            camp_city: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$order_from_camp_detail",
        },
        {
            $lookup: {
                from: "user_registers",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            name: 1,
                            uuid: 1,
                            phone: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$user",
        },
        {
            $addFields: {
                id: "$_id",
            },
        },
        {
            $unset: ["__v", "order_from_camp_detail.__v", "_id", "user.__v"],
        },
    ]);
    return result;
};
exports.getInternetPackageForCoordinator = getInternetPackageForCoordinator;
//# sourceMappingURL=order_internet_package.js.map