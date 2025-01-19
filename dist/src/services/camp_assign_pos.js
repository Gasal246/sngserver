"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampAssignPosDetails = exports.getCampDetails = exports.campMoveOnsiteToOffsite = exports.campMoveToOnsite = exports.assignCampToPos = exports.isCampAssignToPos = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const enums_1 = require("../types/enums");
const campAssignPosModel = models_1.default.campAssignPosModel;
const isCampAssignToPos = async (pos_id, camp_id) => {
    const result = await campAssignPosModel.findOne({
        pos_id: pos_id,
        camp_id: camp_id,
        status: 1,
    });
    return result;
};
exports.isCampAssignToPos = isCampAssignToPos;
const assignCampToPos = async (obj) => {
    const result = await campAssignPosModel.create(obj);
    return result;
};
exports.assignCampToPos = assignCampToPos;
const campMoveToOnsite = async (id) => {
    await campAssignPosModel.updateOne({ _id: id }, { camp_category: enums_1.PosCategoryEnum.ONSITE });
};
exports.campMoveToOnsite = campMoveToOnsite;
const campMoveOnsiteToOffsite = async (posId) => {
    await campAssignPosModel.updateMany({ pos_id: posId, camp_category: enums_1.PosCategoryEnum.ONSITE }, { camp_category: enums_1.PosCategoryEnum.OFFLINE });
};
exports.campMoveOnsiteToOffsite = campMoveOnsiteToOffsite;
const getCampDetails = async (posId) => {
    const result = await campAssignPosModel.aggregate([
        {
            $match: { pos_id: (0, helpers_1.createObjectId)(posId), status: 1 },
        },
        {
            $lookup: {
                from: "camps",
                localField: "camp_id",
                foreignField: "_id",
                as: "camp",
                pipeline: [
                    {
                        $match: {
                            status: 1,
                        },
                    },
                    {
                        $project: {
                            campId: "$_id",
                            _id: 0,
                            camp_name: 1,
                            camp_address: 1,
                            camp_city: 1,
                            router_primary_ip: 1,
                            no_of_allowed_user: 1,
                            no_of_allowed_kiosk: 1,
                            no_of_allowed_account: 1,
                            no_of_allowed_coordinators: 1,
                            is_allowed_package_meal: 1,
                            is_allowed_package_water: 1,
                            is_allowed_package_internet: 1,
                            router_mac_address: 1,
                            router_ssid: 1,
                            router_secondary_ip: 1,
                            router_pass: 1,
                            router_secret: 1,
                            router_alias: 1,
                            router_hostname: 1,
                            camp_uuid: 1,
                            client_id: 1,
                            status: 1,
                        },
                    },
                ],
            },
        },
        { $unwind: "$camp" },
        {
            $project: {
                campAssignPosId: "$_id",
                _id: 0,
                camp_id: 1,
                pos_id: 1,
                camp_category: 1,
                status: 1,
                camp: 1,
            },
        },
    ]);
    return result;
};
exports.getCampDetails = getCampDetails;
const getCampAssignPosDetails = async (campId, status, limit) => {
    const filter = {
        camp_id: campId,
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const pipeline = [
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "pos",
                localField: "pos_id",
                foreignField: "_id",
                as: "pos",
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
        { $unwind: "$pos" },
        {
            $unset: ["__v", "pos.__v", "_id", "pos._id", "pos.password"],
        },
    ];
    if (limit) {
        pipeline.push({ $limit: parseInt(limit) });
    }
    const result = await campAssignPosModel.aggregate(pipeline);
    return result;
};
exports.getCampAssignPosDetails = getCampAssignPosDetails;
//# sourceMappingURL=camp_assign_pos.js.map