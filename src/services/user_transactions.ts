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
  revenue?: number;
  sales_amount?: number;
  cost_amount?: number;
  created_by_type?: string;
  pos_user_id?: string;
  ref_id?: string;
  campId?: string;
  clientId?: string;
}

export const getTransactionsByWalletId = async (
  walletID: string,
  see_more_times: number | 1
) => {
  const result = await userTransactions
    .find({ walletId: createObjectId(walletID) })
    .sort({ createdAt: -1 })
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
    revenue: data?.revenue || null,
    sales_amount: data?.sales_amount || null,
    cost_amount: data?.cost_amount || null,
    created_by_type: data?.created_by_type || null,
    pos_user_id: data?.pos_user_id || null,
    ref_id: data?.ref_id || null,
    campId: data?.campId || null,
    clientId: data?.clientId || null,
  });
  const savedTransaction = await newTransaction.save();
  return savedTransaction;
};

export const getServiceBasedTransactionsOfCamp = async (
  camp_id: string,
  service_ids: string[]
) => {
  const result = await userTransactions.aggregate([
    {
      $match: {
        campId: createObjectId(camp_id),
        serviceId: { $in: service_ids.map((id) => createObjectId(id)) },
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "service",
      },
    },
    { $unwind: { path: "$service", preserveNullAndEmptyArrays: true } },
  ]);
  return result;
};

export const getUserTransactionsWithStartAndEndDateIncludingServiceId = async (
  ge_date: Date,
  le_date: Date,
  service_ids: string[]
) => {
  const transactions = await userTransactions.find({
    serviceId: { $in: service_ids.map((id) => createObjectId(id)) },
    createdAt: { $gte: ge_date, $lte: le_date },
  });
  return transactions;
};

export const getTransactionsOfClientWithinDates = async (
  start_date: Date,
  end_date: Date,
  client_id: string
) => {
  const result = await userTransactions.find({
    clientId: createObjectId(client_id),
    createdAt: { $gte: start_date, $lte: end_date },
  });
  return result;
};

export const getCampTransactionsWithinDates = async (
  client_id: string,
  camp_id: string,
  start_date: Date,
  end_date: Date
) => {
  const result = await userTransactions.find({
    clientId: createObjectId(client_id),
    campId: createObjectId(camp_id),
    createdAt: { $gte: start_date, $lte: end_date },
  });
  return result;
};

export const getServiceIdTransactionWithinDates = async (
  client_id: string,
  service_id: string,
  start_date: Date,
  end_date: Date
) => {
  const result = await userTransactions.find({
    clientId: createObjectId(client_id),
    serviceId: createObjectId(service_id),
    createdAt: { $gte: start_date, $lte: end_date },
  });
  return result;
};
