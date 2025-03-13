import mongoose from "mongoose";
import { ObjectID } from "../types/interfaces";
import { required } from "joi";

export interface IInternetPackageAssignCamps extends Document {
  _id: ObjectID;
  package_id: ObjectID;
  camp_id: ObjectID;
  camp_attach_uuid: String;
  status: number;
  deleted_at: Date;
  package_cost_price: number;
  package_sales_price: number;
  package_revenue: number;
  upload_bandwidth: number;
  package_speed: string;
  service_id: ObjectID | null;
  download_bandwidth: number;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema(
  {
    package_id: { type: mongoose.Schema.Types.ObjectId, ref: "clients" },
    camp_id: { type: mongoose.Schema.Types.ObjectId, ref: "internet_packages" },

    camp_attach_uuid: {
      type: String, //auto unique code (16)
    },

    // 0=delete,1=active,2=pending,3=block
    status: {
      type: Number,
      enum: [0, 1, 2, 3],
      required: true,
    },

    package_cost_price: {
      type: Number,
      required: true,
    },

    package_sales_price: {
      type: Number,
      required: true,
    },

    package_revenue: {
      type: Number,
      required: true,
    },

    upload_bandwidth: {
      type: Number,
    },

    download_bandwidth: {
      type: Number,
    },

    package_speed: {
      type: String,
    },

    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
    },

    deleted_at: {
      type: Date,
    },
  },
  { timestamps: true }
);

schema.method("toJSON", function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...object } = this.toObject() as any;
  object.id = _id;
  return object;
});

const InternetPackageAssignClient = mongoose.model<IInternetPackageAssignCamps>(
  "internet_package_assign_camps",
  schema
);
export default InternetPackageAssignClient;
