"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampByAccountant = exports.getCampAssignAccountantDetails = exports.assignCampToAccountant = exports.totalCountOfCamps = exports.isCampAssignWithAccountant = void 0;
const models_1 = __importDefault(require("../models"));
const campAssignAccountantModel = models_1.default.campAssignAccountantModel;
const isCampAssignWithAccountant = async (camp_id, account_id) => {
    const result = await campAssignAccountantModel.findOne({
        camp_id: camp_id,
        accountant_id: account_id,
        status: 1,
    });
    return result;
};
exports.isCampAssignWithAccountant = isCampAssignWithAccountant;
const totalCountOfCamps = async (camp_id) => {
    const result = await campAssignAccountantModel.count({
        camp_id: camp_id,
        status: 1,
    });
    return result;
};
exports.totalCountOfCamps = totalCountOfCamps;
const assignCampToAccountant = async (obj) => {
    const result = await campAssignAccountantModel.create(obj);
    return result;
};
exports.assignCampToAccountant = assignCampToAccountant;
const getCampAssignAccountantDetails = async (campId, status) => {
    const filter = {
        camp_id: campId,
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const result = await campAssignAccountantModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "accountants",
                localField: "accountant_id",
                foreignField: "_id",
                as: "accountant",
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
        { $unwind: "$accountant" },
        {
            $unset: [
                "__v",
                "accountant.__v",
                "_id",
                "accountant._id",
                "accountant.password",
            ],
        },
    ]);
    return result;
};
exports.getCampAssignAccountantDetails = getCampAssignAccountantDetails;
const getCampByAccountant = async (account_id, status) => {
    const filter = {
        accountant_id: account_id,
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const result = await campAssignAccountantModel.aggregate([
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
exports.getCampByAccountant = getCampByAccountant;
//# sourceMappingURL=camp_assign_accountant.js.map