import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ICompanion_devices extends Document {
  _id: ObjectId;
  user_id: ObjectId | null;
  nth_number: Number | null;
  expo_token: String | null;
  device_name: String | null;
  device_model: String | null;
  os: String | null;
  os_version: String | null;
  status: Number;
  createdAt: Date;
  updatedAt: Date;
}

const Companion_devicesSchema: Schema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId },
    nth_number: { type: Number, unique: true },
    expo_token: { type: String },
    device_name: { type: String },
    device_model: { type: String },
    os: { type: String },
    os_version: { type: String },
    status: { type: Number, default: 1 },
  },
  { timestamps: true }
);

Companion_devicesSchema.method("toJSON", function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...object } = this.toObject() as any;
  object.id = _id;
  return object;
});

const Companion_devices = mongoose.model<ICompanion_devices>(
  "companion_devices",
  Companion_devicesSchema
);
export default Companion_devices;
