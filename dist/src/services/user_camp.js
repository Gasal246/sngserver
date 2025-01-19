"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseCampDetailsFromUser = exports.deactivateBaseCamp = exports.getAssignCampDetailsOfUser = exports.isCampAssignedToUser = exports.assignUserToCamp = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const userCampModel = models_1.default.userCampModel;
const assignUserToCamp = async (obj) => {
    return await userCampModel.create(obj);
};
exports.assignUserToCamp = assignUserToCamp;
const isCampAssignedToUser = async (camp_id) => {
    const result = await userCampModel.findOne({ camp_id: camp_id, status: 1 });
    return result;
};
exports.isCampAssignedToUser = isCampAssignedToUser;
const getAssignCampDetailsOfUser = async (user_id) => {
    const result = await userCampModel.findOne({ user_id: user_id, status: 1 });
    return result;
};
exports.getAssignCampDetailsOfUser = getAssignCampDetailsOfUser;
const deactivateBaseCamp = async (id) => {
    await userCampModel.updateOne({ _id: id }, { status: 2 });
};
exports.deactivateBaseCamp = deactivateBaseCamp;
const getBaseCampDetailsFromUser = async (user_id) => {
    const result = await userCampModel.aggregate([
        {
            $match: { user_id: (0, helpers_1.createObjectId)(user_id), status: 1 },
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
                campAssignUserId: "$_id",
                _id: 0,
                user_id: 1,
                camp_id: 1,
                client_id: 1,
                status: 1,
                camp: 1,
            },
        },
    ]);
    if (!result || !result.length) {
        return null;
    }
    return result[0];
};
exports.getBaseCampDetailsFromUser = getBaseCampDetailsFromUser;
//# sourceMappingURL=user_camp.js.map