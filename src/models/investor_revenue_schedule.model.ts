import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IInvestor_revenue_schedule extends Document {
  _id: ObjectId;
  revenue_percent: Number;
  service_id: ObjectId | null;
  start_date: Date;
  end_date: Date | null;
  camp_id: ObjectId | null;
  investor_id: ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const Investor_revenue_scheduleSchema: Schema = new Schema(
  {
    revenue_percent: { type: Number },
    service_id: { type: Schema.Types.ObjectId, ref: "services" },
    start_date: { type: Date },
    end_date: { type: Date },
    camp_id: { type: Schema.Types.ObjectId, ref: "camp" },
    investor_id: { type: Schema.Types.ObjectId, ref: "investors" },
  },
  { timestamps: true }
);

Investor_revenue_scheduleSchema.method("toJSON", function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...object } = this.toObject() as any;
  object.id = _id;
  return object;
});

const Investor_revenue_schedule = mongoose.model<IInvestor_revenue_schedule>(
  "investor_revenue_schedule",
  Investor_revenue_scheduleSchema
);
export default Investor_revenue_schedule;
