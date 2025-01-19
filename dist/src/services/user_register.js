"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSearchWithKeyword = exports.checkUniquePhone = exports.checkEmail = exports.findUserWithWallet = exports.findUser = exports.updateProfile = exports.updateUserById = exports.updateUser = exports.createUser = exports.isUuidFound = exports.findUserForVerification = exports.findUserByEmail = exports.findUserByMobileNumber = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const userRegisterModel = models_1.default.userRegisterModel;
const findUserByMobileNumber = async (phone) => {
    const result = await userRegisterModel.findOne({
        phone: phone,
        $or: [
            {
                status: 1,
            },
            {
                status: 5,
            },
        ],
    });
    return result;
};
exports.findUserByMobileNumber = findUserByMobileNumber;
// gasal
const findUserByEmail = async (email) => {
    const result = await userRegisterModel.findOne({
        email: email,
        $or: [
            {
                status: 1,
            },
            {
                status: 5,
            },
        ],
    });
    return result;
};
exports.findUserByEmail = findUserByEmail;
const findUserForVerification = async (phone, otp, device_mac_id, country_code) => {
    const result = await userRegisterModel.findOne({
        phone: phone,
        otp: otp,
        device_mac_id: device_mac_id,
        country_code: country_code,
        status: 5,
    });
    return result;
};
exports.findUserForVerification = findUserForVerification;
const isUuidFound = async (code) => {
    const result = await userRegisterModel.findOne({ uuid: code });
    return result;
};
exports.isUuidFound = isUuidFound;
const createUser = async (obj) => {
    const result = await userRegisterModel.create(obj);
    return result;
};
exports.createUser = createUser;
const updateUser = async (id, user) => {
    const result = await userRegisterModel.findOneAndUpdate({ _id: id }, user, {
        new: true,
    });
    return result;
};
exports.updateUser = updateUser;
const updateUserById = async (id, data) => {
    try {
        const result = await userRegisterModel.findByIdAndUpdate(id, data, {
            new: true,
        });
        return result;
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateUserById = updateUserById;
const updateProfile = async (id, user) => {
    await userRegisterModel.updateOne({ _id: id }, user);
};
exports.updateProfile = updateProfile;
const findUser = async (_id) => {
    const result = await userRegisterModel.findOne({ _id: _id, status: 1 });
    return result;
};
exports.findUser = findUser;
const findUserWithWallet = async (_id) => {
    const result = await userRegisterModel.aggregate([
        {
            $match: { _id: _id, status: 1 },
        },
        {
            $lookup: {
                from: "user_wallets",
                localField: "_id",
                foreignField: "user_id",
                as: "user_wallet",
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
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            user_id: 1,
                            client_id: 1,
                            wallet_amount: 1,
                            status: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$user_wallet",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                id: "$_id",
            },
        },
        {
            $unset: ["__v", "_id", "wallet_balance", "user_wallet__v"],
        },
    ]);
    if (!result || !result.length) {
        return null;
    }
    return result[0];
};
exports.findUserWithWallet = findUserWithWallet;
const checkEmail = async (email, id) => {
    const filter = {
        email: email,
        status: {
            $ne: 0,
        },
        _id: { $ne: (0, helpers_1.createObjectId)(id) },
    };
    const result = await userRegisterModel.findOne(filter);
    return result;
};
exports.checkEmail = checkEmail;
const checkUniquePhone = async (phone, id) => {
    const result = await userRegisterModel.findOne({
        phone: phone,
        status: 1,
        id: { $ne: (0, helpers_1.createObjectId)(id) },
    });
    return result;
};
exports.checkUniquePhone = checkUniquePhone;
const userSearchWithKeyword = async (keyword) => {
    const searchRegex = new RegExp(keyword, "i");
    const filter = {
        $or: [
            { uuid: { $regex: searchRegex } },
            { phone: { $regex: searchRegex } },
        ],
        status: 1,
    };
    const result = await userRegisterModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "user_camps",
                localField: "_id",
                foreignField: "user_id",
                as: "camp_assign",
                pipeline: [
                    {
                        $match: {
                            status: 1,
                        },
                    },
                    {
                        $lookup: {
                            from: "camps",
                            localField: "camp_id",
                            foreignField: "_id",
                            as: "camp_details",
                        },
                    },
                    { $unwind: "$camp_details" },
                    {
                        $addFields: {
                            id: "$_id",
                            "camp_details.id": "$camp_details._id",
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$camp_assign",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "user_wallets",
                localField: "_id",
                foreignField: "user_id",
                as: "user_wallet",
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
                    {
                        $project: {
                            _id: 0,
                            id: 1,
                            user_id: 1,
                            client_id: 1,
                            wallet_amount: 1,
                            status: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$user_wallet",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                id: "$_id",
                user_image: {
                    $cond: {
                        if: { $eq: ["$user_image", ""] },
                        then: "",
                        else: { $concat: [helpers_1.getUrlForMongodb, "$user_image"] },
                    },
                },
                passport_image: {
                    $cond: {
                        if: { $eq: ["$passport_image", ""] },
                        then: "",
                        else: { $concat: [helpers_1.getUrlForMongodb, "$passport_image"] },
                    },
                },
                national_id: {
                    $cond: {
                        if: { $eq: ["$national_id", ""] },
                        then: "",
                        else: { $concat: [helpers_1.getUrlForMongodb, "$national_id"] },
                    },
                },
            },
        },
        {
            $unset: [
                "__v",
                "camp_assign.camp_details.__v",
                "camp_assign.__v",
                "_id",
                "camp_assign.camp_details._id",
                "camp_assign._id",
                "wallet_balance",
                "user_wallet__v",
            ],
        },
    ]);
    return result;
};
exports.userSearchWithKeyword = userSearchWithKeyword;
//# sourceMappingURL=user_register.js.map