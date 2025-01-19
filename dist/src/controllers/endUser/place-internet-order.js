"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPlaceInternetOrder = void 0;
const helpers_1 = require("../../helpers");
const mongoose_1 = require("mongoose");
const services_1 = require("../../services");
const models_1 = __importDefault(require("../../models"));
const enums_1 = require("../../types/enums");
const userPlaceInternetOrder = async (req, res) => {
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
        if (!(0, mongoose_1.isValidObjectId)(req.body.package_id)) {
            const data = (0, helpers_1.formatResponse)(400, true, "Package not found.", null);
            res.status(400).json(data);
            return;
        }
        const packageData = await services_1.internetPackageClientService.getInternetPackageFromCampAndPackageId((0, helpers_1.createObjectId)(userData.location_camp.location_camp_id), (0, helpers_1.createObjectId)(req.body.package_id));
        if (!packageData) {
            const data = (0, helpers_1.formatResponse)(400, true, "Package not available.", null);
            res.status(400).json(data);
            return;
        }
        const wallet = await services_1.userWalletService.walletAvailableForUserAndClient(userData.location_camp.location_camp_client_id, userData.id);
        if (!wallet) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.INSUFFICIENT_BALANCE, null);
            res.status(400).json(data);
            return;
        }
        const orderPrice = packageData.internet_package_client.package_price;
        if (orderPrice > wallet.wallet_amount) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.INSUFFICIENT_BALANCE, null);
            res.status(400).json(data);
            return;
        }
        const activeInternetPackage = await services_1.orderInternetPackageService.activeInternetPackageForUser(userData.id);
        const order = new models_1.default.orderInternetPackageModel();
        order.order_number = (0, helpers_1.generateRandomPackageCode)();
        order.user_id = (0, helpers_1.createObjectId)(userData.id);
        order.package_id = (0, helpers_1.createObjectId)(req.body.package_id);
        order.package_name = packageData.internet_package_client.package_name;
        order.package_code = packageData.internet_package_client.package_code;
        order.package_speed = packageData.internet_package_client.package_speed;
        order.package_amount = orderPrice;
        const originalInternetPackage = packageData.internet_package_client.internet_package;
        order.duration = originalInternetPackage.duration;
        order.volume = originalInternetPackage.volume;
        order.download_bandwidth = originalInternetPackage.download_bandwidth;
        order.upload_bandwidth = originalInternetPackage.upload_bandwidth;
        order.package_type = originalInternetPackage.type;
        order.sub_total = orderPrice;
        order.payable_amount = orderPrice;
        order.created_by = (0, helpers_1.createObjectId)(userData.id);
        order.created_by_type = enums_1.CreatedByUserType.user;
        order.camp_id = (0, helpers_1.createObjectId)(userData.location_camp.location_camp_id);
        const promises = [];
        if (!activeInternetPackage) {
            const starDate = new Date();
            const expireDate = new Date(starDate.getTime());
            expireDate.setTime(expireDate.getTime() + (0, helpers_1.minuteInMilleSeconds)(order.duration));
            order.package_start_date = starDate;
            order.purchase_date = starDate;
            order.package_expiry_date = expireDate;
            order.order_status = enums_1.OrderStatus.active;
        }
        else {
            order.package_start_date = null;
            order.purchase_date = new Date();
            order.package_expiry_date = null;
            order.order_status = enums_1.OrderStatus.pending;
        }
        const wallet_amount = wallet.wallet_amount - orderPrice;
        promises.push(services_1.orderInternetPackageService.createOrderInternetPackage(order));
        promises.push(services_1.userWalletService.updateWalletAmount(wallet._id, wallet_amount));
        await Promise.all(promises);
        const data = (0, helpers_1.formatResponse)(200, false, `#${order.order_number} order has been created successfully`, null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.userPlaceInternetOrder = userPlaceInternetOrder;
//# sourceMappingURL=place-internet-order.js.map