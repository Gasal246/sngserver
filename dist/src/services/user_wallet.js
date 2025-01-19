"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseAmount = exports.walletAvailableForUserAndClient = exports.updateWalletAmount = exports.createWallet = void 0;
const models_1 = __importDefault(require("../models"));
const userWalletModel = models_1.default.userWalletModel;
const createWallet = async (obj) => {
    return await userWalletModel.create(obj);
};
exports.createWallet = createWallet;
const updateWalletAmount = async (id, amount) => {
    await userWalletModel.updateOne({ _id: id }, { wallet_amount: amount });
};
exports.updateWalletAmount = updateWalletAmount;
const walletAvailableForUserAndClient = async (client_id, user_id) => {
    const result = await userWalletModel.findOne({
        user_id: user_id,
        client_id: client_id,
        status: 1,
    });
    return result;
};
exports.walletAvailableForUserAndClient = walletAvailableForUserAndClient;
const increaseAmount = async (user_Id, client_id, amount) => {
    await userWalletModel.updateOne({ user_id: user_Id, client_id: client_id, status: 1 }, { $inc: { wallet_amount: amount } });
};
exports.increaseAmount = increaseAmount;
//# sourceMappingURL=user_wallet.js.map