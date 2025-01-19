"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    order_number: {
        type: String,
        required: true,
    },
    user_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" },
    package_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "internet_package_client",
    },
    package_name: {
        type: String,
        required: true,
    },
    package_code: {
        type: String,
        required: true,
    },
    package_speed: {
        type: String,
        required: true,
    },
    package_amount: {
        type: Number,
        required: true,
    },
    //Duration in minutes
    duration: {
        type: Number,
        required: true,
    },
    volume: {
        type: Number,
        required: true,
    },
    download_bandwidth: {
        type: Number,
        required: true,
        default: 0,
    },
    upload_bandwidth: {
        type: Number,
        required: true,
        default: 0,
    },
    package_type: {
        type: String,
        required: true,
    },
    package_expiry_date: {
        type: Date,
    },
    purchase_date: {
        type: Date,
        required: true,
    },
    package_start_date: {
        type: Date,
    },
    expired_on: {
        type: Date,
    },
    tax_amount: {
        default: 0,
        type: Number,
        required: true,
    },
    sub_total: {
        type: Number,
        required: true,
    },
    payable_amount: {
        type: Number,
        required: true,
    },
    //1=active,2=pending,3=expired
    order_status: {
        type: Number,
        enum: [0, 1, 2, 3],
        required: true,
    },
    created_by: { type: mongoose_1.default.Schema.Types.ObjectId },
    created_by_type: {
        type: String,
        required: true,
    },
    camp_id: { type: mongoose_1.default.Schema.Types.ObjectId },
}, { timestamps: true });
schema.method("toJSON", function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const orderInternetPackage = mongoose_1.default.model("order_internet_package", schema);
exports.default = orderInternetPackage;
//# sourceMappingURL=order_internet_package.model.js.map