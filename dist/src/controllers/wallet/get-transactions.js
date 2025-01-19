"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletTransactions = getWalletTransactions;
const helpers_1 = require("../../helpers");
const user_wallet_1 = require("../../services/user_wallet");
const user_transactions_1 = require("../../services/user_transactions");
async function getWalletTransactions(req, res) {
    try {
        const decodedToken = req.decodedToken;
        const wallet = await (0, user_wallet_1.getWalletById)(req.params.id);
        // console.log(wallet);
        if ((wallet === null || wallet === void 0 ? void 0 : wallet.user_id.toString()) !== decodedToken.data.id) {
            const data = (0, helpers_1.formatResponse)(500, true, "This Action Will Be Reported, ( user_id & wallet_id mismatch )", null);
            res.status(500).json(data);
            return;
        }
        const show_more_count = req.query.show_count
            ? parseInt(req.query.show_count.toString())
            : 1;
        const result = await (0, user_transactions_1.getTransactionsByWalletId)(req.params.id, show_more_count);
        // console.log(result)
        const data = (0, helpers_1.formatResponse)(200, false, `Transaction ${show_more_count}`, result);
        res.status(200).json(data);
        return;
    }
    catch (error) {
        console.log("From here", error);
        const data = (0, helpers_1.formatResponse)(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
}
//# sourceMappingURL=get-transactions.js.map