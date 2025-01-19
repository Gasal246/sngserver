"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    client_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "clients" },
    camp_name: {
        type: String,
        required: true,
    },
    camp_address: {
        type: String,
        required: true,
    },
    camp_city: {
        type: String,
        required: true,
    },
    router_primary_ip: {
        type: String,
        required: true,
    },
    no_of_allowed_user: {
        type: Number,
        required: true,
    },
    no_of_allowed_kiosk: {
        type: Number,
        required: true,
    },
    no_of_allowed_account: {
        type: Number,
        required: true,
    },
    no_of_allowed_coordinators: {
        type: Number,
        required: true,
    },
    // 0=disAllow,1=Allowed
    is_allowed_package_meal: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    // 0=disAllow,1=Allowed
    is_allowed_package_water: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    // 0=disAllow,1=Allowed
    is_allowed_package_internet: {
        type: Number,
        enum: [0, 1],
        required: true,
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
    router_mac_address: {
        type: String,
        required: true,
    },
    router_ssid: {
        type: String,
    },
    router_secondary_ip: {
        type: String,
    },
    router_pass: {
        type: String,
    },
    router_secret: {
        type: String,
    },
    router_alias: {
        type: String,
    },
    router_hostname: {
        type: String,
    },
    camp_uuid: {
        type: String,
    },
    site: {
        type: String,
        enum: ["global", "local"],
        required: true,
    },
}, { timestamps: true });
schema.method("toJSON", function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const Camp = mongoose_1.default.model("camp", schema);
exports.default = Camp;
//# sourceMappingURL=camp.model.js.map