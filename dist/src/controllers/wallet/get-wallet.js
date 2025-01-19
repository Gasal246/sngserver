"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWallet = getWallet;
const helpers_1 = require("../../helpers");
const user_wallet_1 = require("../../services/user_wallet");
const camp_1 = require("../../services/camp");
async function getWallet(req, res) {
    var _a, _b;
    try {
        const { data: decodedToken } = req.decodedToken;
        let client_id = ((_a = decodedToken.location_camp) === null || _a === void 0 ? void 0 : _a.location_camp_client_id) ||
            decodedToken.base_camp_client_id;
        let camp_id = ((_b = decodedToken.location_camp) === null || _b === void 0 ? void 0 : _b.location_camp_id) || decodedToken.base_camp_id;
        if (!client_id) {
            const data = (0, helpers_1.formatResponse)(500, true, "User Not Have A Base Client Id", null);
            res.status(500).json(data);
            return;
        }
        if (!camp_id) {
            const data = (0, helpers_1.formatResponse)(500, true, "User Not Have A Base Camp", null);
            res.status(500).json(data);
            return;
        }
        const wallet = await (0, user_wallet_1.walletAvailableForUserAndClient)(client_id, decodedToken.id);
        const camp_data = await (0, camp_1.getCampById)(camp_id);
        const return_data = {
            ...wallet,
            camp_name: camp_data === null || camp_data === void 0 ? void 0 : camp_data.camp_name,
        };
        const data = (0, helpers_1.formatResponse)(200, false, "Wallet Successfully Fetched", return_data);
        res.status(200).json(data);
        return;
    }
    catch (error) {
        console.log(error);
        const data = (0, helpers_1.formatResponse)(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
}
//# sourceMappingURL=get-wallet.js.map