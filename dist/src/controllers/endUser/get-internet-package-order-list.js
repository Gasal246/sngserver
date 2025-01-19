"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternetPackageOrderListForEndUser = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const getInternetPackageOrderListForEndUser = async (req, res) => {
    var _a, _b;
    try {
        const userData = req.decodedToken.data;
        const status = (_a = req.query.order_status) === null || _a === void 0 ? void 0 : _a.toString();
        const list = await services_1.orderInternetPackageService.getInternetPackageForUser((0, helpers_1.createObjectId)(userData.id), status, ((_b = userData.location_data) === null || _b === void 0 ? void 0 : _b.location_camp_client_id) ||
            (userData === null || userData === void 0 ? void 0 : userData.base_camp_client_id));
        if (!list || !list.length) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package order list", {
            list: list,
        });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getInternetPackageOrderListForEndUser = getInternetPackageOrderListForEndUser;
//# sourceMappingURL=get-internet-package-order-list.js.map