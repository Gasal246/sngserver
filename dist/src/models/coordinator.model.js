"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    client_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "clients" },
    role_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "roles" },
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // 0=delete,1=active,2=pending,3=block
    status: {
        type: Number,
        enum: [0, 1, 2, 3],
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
const Coordinator = mongoose_1.default.model("coordinator", schema);
exports.default = Coordinator;
//# sourceMappingURL=coordinator.model.js.map