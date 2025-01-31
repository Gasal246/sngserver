"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWalletRecharge = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("../../models"));
const enums_1 = require("../../types/enums");
const user_transactions_1 = require("../../services/user_transactions");
const client_1 = require("../../services/client");
const userWalletRecharge = async (req, res) => {
    var _a;
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.body.profile_camp_id)) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.CAMP_NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const campAssignPos = await services_1.CampAssignPosService.isCampAssignToPos(req.decodedToken.data.id, req.body.profile_camp_id);
        if (!campAssignPos) {
            const data = (0, helpers_1.formatResponse)(400, true, "Camp not assigned to pos.", null);
            res.status(400).json(data);
            return;
        }
        if (campAssignPos.camp_category == enums_1.PosCategoryEnum.OFFLINE) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.OUT_OF_SERVICE_AREA, null);
            res.status(400).json(data);
            return;
        }
        if (!(0, mongoose_1.isValidObjectId)(req.body.user_id)) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.USER_NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const user = await services_1.userRegisterService.findUser((0, helpers_1.createObjectId)(req.body.user_id));
        if (!user) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.USER_NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const assignCampDetails = await services_1.userCampService.getAssignCampDetailsOfUser(req.body.user_id);
        if (!assignCampDetails) {
            const data = (0, helpers_1.formatResponse)(400, true, "User not assigned to any camp.", null);
            res.status(400).json(data);
            return;
        }
        // if (req.decodedToken.data.client_id != assignCampDetails.client_id) {
        //   const data = formatResponse(
        //     400,
        //     true,
        //     "User and pos user not of same client.",
        //     null
        //   );
        //   res.status(400).json(data);
        //   return;
        // }
        let walletData = await services_1.userWalletService.walletAvailableForUserAndClient(req.decodedToken.data.client_id, req.body.user_id);
        const promises = [];
        if (walletData) {
            const wallet_balance = walletData.wallet_amount + parseFloat(req.body.recharge_amount);
            await services_1.userWalletService.updateWalletAmount(walletData._id, wallet_balance);
        }
        else {
            const wallet = new models_1.default.userWalletModel();
            wallet.user_id = (0, helpers_1.createObjectId)(req.body.user_id);
            wallet.client_id = (0, helpers_1.createObjectId)(req.decodedToken.data.client_id);
            wallet.wallet_amount = parseFloat(req.body.recharge_amount);
            wallet.status = 1;
            walletData = await services_1.userWalletService.createWallet(wallet);
        }
        const userRecharge = new models_1.default.userRechargeModel();
        userRecharge.user_id = user._id;
        userRecharge.created_by = (0, helpers_1.createObjectId)(req.decodedToken.data.id);
        userRecharge.created_by_type = enums_1.CreatedByUserType.pos;
        userRecharge.role_id = (0, helpers_1.createObjectId)(req.decodedToken.data.role_id);
        userRecharge.type = enums_1.RechargeTypeEnum.POS_TOP_UP;
        userRecharge.recharge_amount = req.body.recharge_amount;
        userRecharge.camp_id = (0, helpers_1.createObjectId)(req.body.profile_camp_id);
        userRecharge.status = 1;
        userRecharge.transaction_id = (0, helpers_1.generateRandomPackageCode)();
        // userRecharge.service_amount = req.body.service_amount;
        // userRecharge.payable_amount = parseFloat(req.body.recharge_amount);
        promises.push(services_1.userRechargeService.createUserRecharge(userRecharge));
        const currency_code = await (0, client_1.getClientCurrencyCode)(req.decodedToken.data.client_id);
        promises.push((0, user_transactions_1.addNewTransaction)({
            amount: req.body.recharge_amount,
            currency: currency_code,
            title: enums_1.RechargeTypeEnum.POS_TOP_UP,
            type: "credit",
            userid: user._id.toString(),
            walletid: (_a = walletData === null || walletData === void 0 ? void 0 : walletData._id) === null || _a === void 0 ? void 0 : _a.toString(),
        }));
        await Promise.all(promises);
        const data = (0, helpers_1.formatResponse)(200, false, "User recharge done successfully", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.userWalletRecharge = userWalletRecharge;
//# sourceMappingURL=pos-recharge-manual.js.map