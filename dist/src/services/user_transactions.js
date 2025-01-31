"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewTransaction = exports.getTransactionsByWalletId = void 0;
const models_1 = __importDefault(require("../models"));
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const userTransactions = models_1.default.userTransactions;
const getTransactionsByWalletId = async (walletID, see_more_times) => {
    const result = await userTransactions
        .find({ walletId: (0, helpers_1.createObjectId)(walletID) })
        .limit(constants_1.appConstants.transaction_limit * see_more_times)
        .sort({ createdAt: -1 });
    return result;
};
exports.getTransactionsByWalletId = getTransactionsByWalletId;
const addNewTransaction = async (data) => {
    const newTransaction = new userTransactions({
        title: data.title,
        userId: data.userid,
        walletId: data.walletid,
        type: data.type,
        amount: data.amount,
        currencyType: data.currency,
        serviceId: (data === null || data === void 0 ? void 0 : data.serviceid) || null,
    });
    const savedTransaction = await newTransaction.save();
    return savedTransaction;
};
exports.addNewTransaction = addNewTransaction;
//# sourceMappingURL=user_transactions.js.map