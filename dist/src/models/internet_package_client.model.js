"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    client_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "clients" },
    internet_package_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "internet_packages",
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
    package_price: {
        type: Number,
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
const InternetPackageClient = mongoose_1.default.model("internet_package_client", schema);
exports.default = InternetPackageClient;
//# sourceMappingURL=internet_package_client.model.js.map