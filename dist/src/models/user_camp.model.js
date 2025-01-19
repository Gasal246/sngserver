"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    user_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" },
    camp_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "camp" },
    client_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "client" },
    created_by: { type: mongoose_1.default.Schema.Types.ObjectId },
    // 0=delete,1=assign,2=unAssign ,3=Pending
    status: {
        type: Number,
        enum: [0, 1, 2, 3],
        required: true,
    },
}, { timestamps: true });
schema.method("toJSON", function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const userCamp = mongoose_1.default.model("user_camp", schema);
exports.default = userCamp;
//# sourceMappingURL=user_camp.model.js.map