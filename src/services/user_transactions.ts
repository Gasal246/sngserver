import { Document } from "mongoose";
import db from "../models";
import { IUser_transactions } from "../models/transaction.model";
import { createObjectId } from "../helpers";
import { appConstants } from "../constants";

const userTransactions = db.userTransactions;

interface TransactionObj {
  amount: number;
  title: string;
  userid: string;
  walletid: string;
  type: string;
  currency: string | String;
  serviceid?: string;
}

export const getTransactionsByWalletId = async (
  walletID: string,
  see_more_times: number | 1
) => {
  const result = await userTransactions
    .find({ walletId: createObjectId(walletID) })
    .limit(appConstants.transaction_limit * see_more_times);
  return result;
};

export const addNewTransaction = async (data: TransactionObj) => {
  const newTransaction = new userTransactions({
    title: data.title,
    userId: data.userid,
    walletId: data.walletid,
    type: data.type,
    amount: data.amount,
    currencyType: data.currency,
    serviceId: data?.serviceid || null,
  });
  const savedTransaction = await newTransaction.save();
  return savedTransaction;
};
