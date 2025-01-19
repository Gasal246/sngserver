"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    user_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" },
    client_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "client" },
    wallet_amount: {
        type: Number,
        required: true,
    },
    // 0=delete,1=active,2=pending,3=block
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
const userWallet = mongoose_1.default.model("user_wallet", schema);
exports.default = userWallet;
//# sourceMappingURL=user_wallet.model.js.map