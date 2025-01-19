"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manualActivePackage = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("../../models"));
const enums_1 = require("../../types/enums");
const dayjs_1 = __importDefault(require("dayjs"));
const manualActivePackage = async (req, res) => {
    try {
        const userData = req.decodedToken.data;
        if (!userData.location_camp.location_verified) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.OUT_OF_SERVICE_AREA, null);
            res.status(400).json(data);
            return;
        }
        const assignCampDetails = await services_1.userCampService.getAssignCampDetailsOfUser(userData.id);
        if (!assignCampDetails) {
            const data = (0, helpers_1.formatResponse)(400, true, "User not assigned to any camp.", null);
            res.status(400).json(data);
            return;
        }
        if (userData.location_camp.location_camp_client_id.toString() !==
            assignCampDetails.client_id.toString()) {
            const data = (0, helpers_1.formatResponse)(400, true, "Camp id and base camp id not of same client.", null);
            res.status(400).json(data);
            return;
        }
        if (!(0, mongoose_1.isValidObjectId)(req.body.order_id)) {
            const data = (0, helpers_1.formatResponse)(400, true, "Internet package not available for user.", null);
            res.status(400).json(data);
            return;
        }
        const orderDetails = await services_1.orderInternetPackageService.getManualPendingPackage(userData.id, req.body.order_id);
        if (!orderDetails) {
            const data = (0, helpers_1.formatResponse)(400, true, "Internet package not available for user.", null);
            res.status(400).json(data);
            return;
        }
        const activePackageForUser = await services_1.orderInternetPackageService.activeInternetPackageForUser(userData.id);
        const promises = [];
        //Refund amount
        if (activePackageForUser) {
            const perDayCost = activePackageForUser.package_amount /
                (0, helpers_1.minutesToDay)(activePackageForUser.duration);
            const currentDate = (0, dayjs_1.default)(new Date());
            const expireDate = (0, dayjs_1.default)(activePackageForUser.package_expiry_date);
            const remainDays = expireDate.diff(currentDate, "days");
            const refundAmount = parseFloat((remainDays * perDayCost).toFixed(2));
            //Save refund history
            const userRecharge = new models_1.default.userRechargeModel();
            userRecharge.user_id = (0, helpers_1.createObjectId)(userData.id);
            userRecharge.created_by = (0, helpers_1.createObjectId)(userData.id);
            userRecharge.created_by_type = enums_1.CreatedByUserType.user;
            userRecharge.type = enums_1.RechargeTypeEnum.REFUND;
            userRecharge.recharge_amount = refundAmount;
            userRecharge.service_amount = 0;
            userRecharge.camp_id = (0, helpers_1.createObjectId)(userData.location_camp.location_camp_id);
            userRecharge.payable_amount = refundAmount;
            userRecharge.status = 1;
            userRecharge.transaction_id = (0, helpers_1.generateRandomPackageCode)();
            const refundDetails = {};
            refundDetails.refund_type = enums_1.RefundType.internet_package;
            refundDetails.reference_order_id = orderDetails._id;
            refundDetails.package_id = orderDetails.package_id;
            refundDetails.package_name = orderDetails.package_name;
            refundDetails.package_code = orderDetails.package_code;
            refundDetails.package_speed = orderDetails.package_speed;
            userRecharge.refund_details = refundDetails;
            promises.push(services_1.userRechargeService.createUserRecharge(userRecharge));
            //increase wallet
            promises.push(services_1.userWalletService.increaseAmount(userData.id, userData.location_camp.location_camp_client_id, refundAmount));
            //DeActive current package
            promises.push(services_1.orderInternetPackageService.expireInternetPackage(activePackageForUser._id));
        }
        const starDate = new Date();
        const expireDate = new Date(starDate.getTime());
        expireDate.setTime(expireDate.getTime() + (0, helpers_1.minuteInMilleSeconds)(orderDetails.duration));
        const updateData = {
            package_start_date: starDate,
            package_expiry_date: expireDate,
            order_status: enums_1.OrderStatus.active,
        };
        promises.push(services_1.orderInternetPackageService.updateInternetPackage(orderDetails._id, updateData));
        await Promise.all(promises);
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package activated successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.manualActivePackage = manualActivePackage;
//# sourceMappingURL=manual-active-package.js.map