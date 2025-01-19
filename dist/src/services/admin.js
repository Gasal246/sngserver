"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminWithRole = exports.updateOne = exports.getAdminById = exports.getAdminByEmail = void 0;
const models_1 = __importDefault(require("../models"));
const adminModel = models_1.default.adminModel;
const getAdminByEmail = async (email) => {
    const result = await adminModel.findOne({ email: email });
    return result;
};
exports.getAdminByEmail = getAdminByEmail;
const getAdminById = async (_id) => {
    const result = await adminModel.findOne({ _id: _id });
    return result;
};
exports.getAdminById = getAdminById;
const updateOne = async (_id, obj) => {
    await adminModel.updateOne({ _id: _id }, obj);
};
exports.updateOne = updateOne;
const getAdminWithRole = async (_id) => {
    const result = await adminModel.aggregate([
        {
            $match: {
                _id: _id,
            },
        },
        {
            $lookup: {
                from: "roles",
                as: "roles",
                pipeline: [{ $project: { name: 1 } }],
            },
        },
        {
            $match: {
                "roles.name": "Admin",
            },
        },
        { $unwind: "$roles" },
    ]);
    return result;
};
exports.getAdminWithRole = getAdminWithRole;
//# sourceMappingURL=admin.js.map