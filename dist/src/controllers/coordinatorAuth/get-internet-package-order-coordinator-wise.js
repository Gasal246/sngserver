"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternetPackageOrderCoordinatorWise = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const getInternetPackageOrderCoordinatorWise = async (req, res) => {
    var _a;
    try {
        const status = (_a = req.query.order_status) === null || _a === void 0 ? void 0 : _a.toString();
        const list = await services_1.orderInternetPackageService.getInternetPackageForCoordinator((0, helpers_1.createObjectId)(req.decodedToken.data.id), status);
        if (!list || !list.length) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package order list", {
            list: list,
        });
        res.status(200).json(data);
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getInternetPackageOrderCoordinatorWise = getInternetPackageOrderCoordinatorWise;
//# sourceMappingURL=get-internet-package-order-coordinator-wise.js.map