import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ICamp_assign_services extends Document {
  _id: ObjectId;
  camp_id: ObjectId | null;
  service_id: ObjectId | null;
  status: Number;
  client_id: ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const Camp_assign_servicesSchema: Schema = new Schema(
  {
    camp_id: { type: Schema.Types.ObjectId, ref: "camp" },
    service_id: { type: Schema.Types.ObjectId, ref: "services" },
    status: { type: Number, enum: [0, 1, 2, 3], default: 1 },
    client_id: { type: Schema.Types.ObjectId, ref: "client" },
  },
  { timestamps: true }
);

Camp_assign_servicesSchema.method("toJSON", function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...object } = this.toObject() as any;
  object.id = _id;
  return object;
});

const Camp_assign_services = mongoose.model<ICamp_assign_services>(
  "camp_assign_services",
  Camp_assign_servicesSchema
);
export default Camp_assign_services;
