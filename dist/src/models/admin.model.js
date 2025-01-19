"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    deleted_at: {
        type: Date,
    },
    role_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "roles" },
}, { timestamps: true });
schema.method("toJSON", function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const Admin = mongoose_1.default.model("admin", schema);
exports.default = Admin;
//# sourceMappingURL=admin.model.js.map