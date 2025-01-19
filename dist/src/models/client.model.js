"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    role_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "roles" },
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    business_name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    business_address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "countries",
    },
    // 0=delete,1=active,2=pending,3=block
    status: {
        type: Number,
        enum: [0, 1, 2, 3],
        required: true,
    },
    deleted_at: {
        type: Date,
    },
    no_user: {
        type: Number,
        required: true,
    },
    no_camp: {
        type: Number,
        required: true,
    },
    no_cordinator: {
        type: Number,
        required: true,
    },
    no_pos: {
        type: Number,
        required: true,
    },
    no_kiosk: {
        type: Number,
        required: true,
    },
    no_accountant: {
        type: Number,
        required: true,
    },
    //0=disable,1=enable
    is_mess_management: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    //0=disable,1=enable
    is_water_management: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    //0=disable,1=enable
    is_internet_management: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    subscription_start: {
        type: Date,
        required: true,
    },
    subscription_end: {
        type: Date,
        required: true,
    },
    grace_period_days: {
        type: Number,
        required: true,
    },
    payment_type: {
        type: String,
        enum: ["ONE-TIME", "SUBSCRIPTION"],
        required: true,
    },
    package_rate: {
        type: Number,
        required: true,
    },
    //1 =yes, 0 =no
    is_investor_management: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    currency_code: {
        type: String,
        required: true,
    },
}, { timestamps: true });
schema.method("toJSON", function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const Client = mongoose_1.default.model("client", schema);
exports.default = Client;
//# sourceMappingURL=client.model.js.map