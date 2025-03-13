import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser_transactions extends Document {
  _id: ObjectId;
  clientId: ObjectId | null;
  campId: ObjectId | null;
  userId: ObjectId | null;
  walletId: ObjectId | null;
  type: String | null;
  amount: Number | null;
  title: String | null;
  currencyType: String | null;
  serviceId: String | null;
  revenue: Number | null;
  sales_amount: Number | null;
  cost_amount: Number | null;
  created_by_type: String | null;
  pos_user_id: ObjectId | null;
  ref_id: String | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserTransactionsSchema: Schema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "client" },
    campId: { type: Schema.Types.ObjectId, ref: "camp" },
    userId: { type: Schema.Types.ObjectId, ref: "user_register" },
    walletId: { type: Schema.Types.ObjectId, ref: "user_wallet" },
    type: { type: String, enum: ["credit", "debit"] },
    amount: { type: Number },
    title: { type: String },
    currencyType: { type: String },
    serviceId: { type: Schema.Types.ObjectId },
    revenue: { type: Number },
    sales_amount: { type: Number },
    cost_amount: { type: Number },
    pos_user_id: { type: Schema.Types.ObjectId },
    ref_id: { type: String },
    created_by_type: { type: String, enum: ["user", "pos"] },
  },
  { timestamps: true }
);

UserTransactionsSchema.method("toJSON", function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...object } = this.toObject() as any;
  object.id = _id;
  return object;
});

const UserTransactions = mongoose.model<IUser_transactions>(
  "UserTransactions",
  UserTransactionsSchema
);
export default UserTransactions;
