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
    attached_uuid: {
        type: String, //auto unique code (16)
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
const InternetPackageAssignClient = mongoose_1.default.model("internet_package_assign_client", schema);
exports.default = InternetPackageAssignClient;
//# sourceMappingURL=internet_package_assign_client.model.js.map