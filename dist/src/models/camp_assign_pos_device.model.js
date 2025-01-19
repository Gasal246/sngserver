"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    camp_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "camp" },
    pos_dc_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Pos_device_code" },
    // 0=delete,1=active,2=pending,3=block
    status: {
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
const CampAssignPosDevice = mongoose_1.default.model("cam_assign_pos_device", schema);
exports.default = CampAssignPosDevice;
//# sourceMappingURL=camp_assign_pos_device.model.js.map