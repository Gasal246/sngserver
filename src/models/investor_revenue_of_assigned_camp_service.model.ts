import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IInvestorRevenueOfAssignedCampService extends Document {
  Start_date: Date | null;
  End_date: Date | null;
  Revenue_percent: Number | null;
  Service_id: String | null;
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const InvestorRevenueOfAssignedCampServiceSchema: Schema = new Schema(
  {
    Start_date: { type: Date },
    End_date: { type: Date },
    Revenue_percent: { type: Number },
    Service_id: { type: String },
  },
  { timestamps: true }
);

const InvestorRevenueOfAssignedCampService =
  mongoose.model<IInvestorRevenueOfAssignedCampService>(
    "investor_revenue_of_assigned_camp_service",
    InvestorRevenueOfAssignedCampServiceSchema
  );
export default InvestorRevenueOfAssignedCampService;
