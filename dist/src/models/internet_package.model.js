"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    package_name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
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
    package_speed: {
        type: String,
        required: true,
    },
    package_code: {
        type: String,
        required: true,
    },
    // 0=delete,1=active,2=pending,3=block
    package_status: {
        type: Number,
        enum: [0, 1, 2, 3],
        required: true,
    },
    deleted_at: {
        type: Date,
    },
}, { timestamps: true });
schema.method("toJSON", function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const InternetPackage = mongoose_1.default.model("internet_package", schema);
exports.default = InternetPackage;
//# sourceMappingURL=internet_package.model.js.map