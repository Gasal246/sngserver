import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IServices extends Document {
  _id: ObjectId;
  service_name: String | null;
  transaction_title: String | null;
  status: String | null;
  createdAt: Date;
  updatedAt: Date;
}

const ServicesSchema: Schema = new Schema(
  {
    service_name: { type: String },
    transaction_title: { type: String },
    status: { type: String, enum: ["active", "disabled"] },
  },
  { timestamps: true }
);

ServicesSchema.method("toJSON", function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...object } = this.toObject() as any;
  object.id = _id;
  return object;
});

const Services = mongoose.model<IServices>("Services", ServicesSchema);
export default Services;
