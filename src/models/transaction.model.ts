import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser_transactions extends Document {
  _id: ObjectId;
  userId: ObjectId | null;
  walletId: ObjectId | null;
  type: String | null;
  amount: Number | null;
  title: String | null;
  currencyType: String | null;
  serviceId: String | null;
  revenue: Number | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserTransactionsSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user_register" },
    walletId: { type: Schema.Types.ObjectId, ref: "user_wallet" },
    type: { type: String, enum: ["credit", "debit"] },
    amount: { type: Number },
    title: { type: String },
    currencyType: { type: String },
    serviceId: { type: Schema.Types.ObjectId },
    revenue: { type: Number },
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
