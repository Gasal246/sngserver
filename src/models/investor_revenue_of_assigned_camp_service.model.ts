import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IInvestorRevenueOfAssignedCampService extends Document {
  start_date: Date | null;
  end_date: Date | null;
  revenue_percent: Number | null;
  service_id: String | null;
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const InvestorRevenueOfAssignedCampServiceSchema: Schema = new Schema(
  {
    start_date: { type: Date },
    end_date: { type: Date },
    revenue_percent: { type: Number },
    service_id: { type: String },
  },
  { timestamps: true }
);

const InvestorRevenueOfAssignedCampService =
  mongoose.model<IInvestorRevenueOfAssignedCampService>(
    "investor_revenue_of_assigned_camp_service",
    InvestorRevenueOfAssignedCampServiceSchema
  );
export default InvestorRevenueOfAssignedCampService;
