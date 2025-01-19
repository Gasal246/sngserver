"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRechargeHistoryByUserId = exports.createUserRecharge = void 0;
const models_1 = __importDefault(require("../models"));
const userRechargeModel = models_1.default.userRechargeModel;
const createUserRecharge = async (obj) => {
    return await userRechargeModel.create(obj);
};
exports.createUserRecharge = createUserRecharge;
const getRechargeHistoryByUserId = async (id, status) => {
    const filter = {
        user_id: id,
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const result = await userRechargeModel.find(filter);
    return result;
};
exports.getRechargeHistoryByUserId = getRechargeHistoryByUserId;
//# sourceMappingURL=user_recharge.js.map