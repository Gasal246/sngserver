"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleBySlug = exports.getRoleById = void 0;
const models_1 = __importDefault(require("../models"));
const roleModel = models_1.default.roleModel;
const getRoleById = async (_id) => {
    const result = await roleModel.findById(_id);
    return result;
};
exports.getRoleById = getRoleById;
const getRoleBySlug = async (slug) => {
    const result = await roleModel.findOne({ slug: slug });
    return result;
};
exports.getRoleBySlug = getRoleBySlug;
//# sourceMappingURL=roles.js.map