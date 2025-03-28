import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IMobile_change_history extends Document {
  user_id: ObjectId | null;
  client_id: ObjectId | null;
  pos_allowed: Boolean | null;
  pos_id: ObjectId | null;
  user_changed: Boolean | null;
  mobile: Number | null;
  old_number: String | null;
  country_code: Number | null;
  changed_date: Date | null;
  _id: ObjectId;
}

const Mobile_change_historySchema: Schema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "user_register" },
    client_id: { type: Schema.Types.ObjectId, ref: "client" },
    pos_allowed: { type: Boolean },
    pos_id: { type: Schema.Types.ObjectId, ref: "pos" },
    user_changed: { type: Boolean },
    mobile: { type: Number },
    old_number: { type: String },
    country_code: { type: Number },
    changed_date: { type: Date },
  },
  { timestamps: true }
);

Mobile_change_historySchema.method("toJSON", function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...object } = this.toObject() as any;
  object.id = _id;
  return object;
});

const Mobile_change_history = mongoose.model<IMobile_change_history>(
  "mobile_change_history",
  Mobile_change_historySchema
);
export default Mobile_change_history;
