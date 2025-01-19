"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampByCoordinator = exports.getCampAssignCoordinatorDetails = exports.assignCampToCoordinator = exports.totalCountOfCamps = exports.isCampAssignWithCoordinator = void 0;
const models_1 = __importDefault(require("../models"));
const campAssignCoordinatorModel = models_1.default.campAssignCoordinatorModel;
const isCampAssignWithCoordinator = async (camp_id) => {
    const result = await campAssignCoordinatorModel.findOne({
        camp_id: camp_id,
        status: 1,
    });
    return result;
};
exports.isCampAssignWithCoordinator = isCampAssignWithCoordinator;
const totalCountOfCamps = async (camp_id) => {
    const result = await campAssignCoordinatorModel.count({
        camp_id: camp_id,
        status: 1,
    });
    return result;
};
exports.totalCountOfCamps = totalCountOfCamps;
const assignCampToCoordinator = async (obj) => {
    const result = await campAssignCoordinatorModel.create(obj);
    return result;
};
exports.assignCampToCoordinator = assignCampToCoordinator;
const getCampAssignCoordinatorDetails = async (campId, status) => {
    const filter = {
        camp_id: campId,
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const result = await campAssignCoordinatorModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "coordinators",
                localField: "coordinator_id",
                foreignField: "_id",
                as: "coordinator",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                assigned_id: "$_id",
            },
        },
        { $unwind: "$coordinator" },
        {
            $unset: [
                "__v",
                "coordinator.__v",
                "_id",
                "coordinator._id",
                "coordinator.password",
            ],
        },
    ]);
    return result;
};
exports.getCampAssignCoordinatorDetails = getCampAssignCoordinatorDetails;
const getCampByCoordinator = async (coordinatorId, status) => {
    const filter = {
        coordinator_id: coordinatorId,
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const result = await campAssignCoordinatorModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "camps",
                localField: "camp_id",
                foreignField: "_id",
                as: "camp",
                pipeline: [
                    {
                        $addFields: {
                            id: "$_id",
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                assigned_id: "$_id",
            },
        },
        { $unwind: "$camp" },
        {
            $unset: ["__v", "camp.__v", "_id", "camp._id"],
        },
    ]);
    return result;
};
exports.getCampByCoordinator = getCampByCoordinator;
//# sourceMappingURL=camp_assign_coordinator.js.map