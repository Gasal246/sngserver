import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IClient_assign_services extends Document {
  _id: ObjectId;
  service_id: ObjectId | null;
  client_id: ObjectId | null;
  status: Number | null;
  createdAt: Date;
  updatedAt: Date;
}

const Client_assign_servicesSchema: Schema = new Schema(
  {
    service_id: { type: Schema.Types.ObjectId, ref: "services" },
    client_id: { type: Schema.Types.ObjectId, ref: "clients" },
    status: { type: Number, enum: [0, 1] },
  },
  { timestamps: true }
);

Client_assign_servicesSchema.method("toJSON", function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...object } = this.toObject() as any;
  object.id = _id;
  return object;
});

const Client_assign_services = mongoose.model<IClient_assign_services>(
  "client_assign_services",
  Client_assign_servicesSchema
);
export default Client_assign_services;
