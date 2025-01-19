"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    client_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "client" },
    user_name: {
        default: "",
        type: String,
    },
    client_mac_id: {
        type: String,
    },
    name: {
        default: "",
        type: String,
    },
    email: {
        default: "",
        type: String,
    },
    password: {
        default: "",
        type: String,
    },
    country_code: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        // required: true,
    },
    age: {
        default: 0,
        type: Number,
    },
    gender: {
        default: "",
        type: String,
    },
    country_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "countries" },
    home_address: {
        default: "",
        type: String,
    },
    blood_group: {
        default: "",
        type: String,
    },
    company_name: {
        default: "",
        type: String,
    },
    job_title: {
        default: "",
        type: String,
    },
    passport_no: {
        default: "",
        type: String,
    },
    uuid: {
        default: "",
        type: String,
    },
    driver_licence_no: {
        default: "",
        type: String,
    },
    visa_number: {
        default: "",
        type: String,
    },
    national_id_type: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "national_type",
    },
    national_id: {
        default: "",
        type: String,
    },
    user_image: {
        default: "",
        type: String,
    },
    passport_image: {
        default: "",
        type: String,
    },
    building_no: {
        default: "",
        type: String,
    },
    room_no: {
        default: "",
        type: String,
    },
    api_token: {
        default: "",
        type: String,
    },
    created_by: { type: mongoose_1.default.Schema.Types.ObjectId },
    // 0=delete,1=active,2=pending,3=block,4=deActive,5=Unverified
    status: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        required: true,
    },
    otp: {
        type: Number,
    },
    has_transfer_request: {
        type: Number,
        default: 0,
        required: true,
    },
    wallet_balance: {
        default: 0.0,
        type: Number,
    },
    block: {
        default: "",
        type: String,
    },
    block_building: {
        default: "",
        type: String,
    },
    floor_no: {
        default: "",
        type: String,
    },
    device_mac_id: {
        default: "",
        type: String,
    },
    new_phone: {
        default: "0",
        type: String,
    },
    is_new_user: {
        default: "",
        type: Boolean,
    },
}, { timestamps: true });
schema.method("toJSON", function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const UserRegister = mongoose_1.default.model("user_register", schema);
exports.default = UserRegister;
//# sourceMappingURL=user_register.model.js.map