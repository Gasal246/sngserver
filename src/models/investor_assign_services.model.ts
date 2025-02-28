import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IInvestor_assign_services extends Document {
  _id: ObjectId;
  investor_id: ObjectId | null;
  camp_id: ObjectId | null;
  service_id: ObjectId | null;
  status: Number | null;
  createdAt: Date;
  updatedAt: Date;
}

const Investor_assign_servicesSchema: Schema = new Schema(
  {
    investor_id: { type: Schema.Types.ObjectId, ref: "investors" },
    camp_id: { type: Schema.Types.ObjectId, ref: "camp" },
    service_id: { type: Schema.Types.ObjectId, ref: "services" },
    status: { type: Number, enum: [0, 1], default: 1 },
  },
  { timestamps: true }
);

Investor_assign_servicesSchema.method("toJSON", function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...object } = this.toObject() as any;
  object.id = _id;
  return object;
});

const Investor_assign_services = mongoose.model<IInvestor_assign_services>(
  "investor_assign_services",
  Investor_assign_servicesSchema
);
export default Investor_assign_services;
