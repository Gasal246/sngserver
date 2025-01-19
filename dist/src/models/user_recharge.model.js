"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    user_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" },
    created_by: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "pos" },
    created_by_type: {
        type: String,
        required: true,
    },
    role_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "role" },
    camp_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "camp" },
    client_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "client" },
    type: {
        type: String,
        required: true,
        default: 0,
    },
    recharge_amount: {
        type: Number,
        required: true,
    },
    service_amount: {
        type: Number,
        required: true,
    },
    payable_amount: {
        type: Number,
        required: true,
    },
    // 0=delete,1=active,2=pending,3=block
    status: {
        type: Number,
        enum: [0, 1, 2, 3],
        required: true,
    },
    transaction_id: {
        type: String,
        required: true,
    },
    refund_details: {
        type: mongoose_1.default.Schema.Types.Mixed,
    },
}, { timestamps: true });
schema.method("toJSON", function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const UserRecharge = mongoose_1.default.model("user_recharge", schema);
exports.default = UserRecharge;
//# sourceMappingURL=user_recharge.model.js.map