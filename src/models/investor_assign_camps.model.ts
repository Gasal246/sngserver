import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IInvestor_assign_camps extends Document {
  investor_id: ObjectId | null;
  camp_id: ObjectId | null;
  services: {
    service_id: String | null;
    service_revenue_id: ObjectId | null;
  }[];
  status: string;
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const Investor_assign_campsSchema: Schema = new Schema(
  {
    investor_id: { type: Schema.Types.ObjectId, ref: "investors" },
    camp_id: { type: Schema.Types.ObjectId, ref: "camps" },
    services: [
      {
        service_id: { type: String },
        service_revenue_id: { type: Schema.Types.ObjectId },
      },
    ],
    status: {
      type: String,
      enum: ["active", "blocked", "deleted"],
      default: "active",
    },
  },
  { timestamps: true }
);

Investor_assign_campsSchema.method("toJSON", function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...object } = this.toObject() as any;
  object.id = _id;
  return object;
});

const Investor_assign_camps = mongoose.model<IInvestor_assign_camps>(
  "investor_assign_camps",
  Investor_assign_campsSchema
);
export default Investor_assign_camps;
