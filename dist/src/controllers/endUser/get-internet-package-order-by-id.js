"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternetPackageOrderById = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const getInternetPackageOrderById = async (req, res) => {
    try {
        const order = await services_1.orderInternetPackageService.getInternetPackageFromOrderId((0, helpers_1.createObjectId)(req.params.id), (0, helpers_1.createObjectId)(req.decodedToken.data.id));
        if (!order) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package order", {
            list: order,
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
exports.getInternetPackageOrderById = getInternetPackageOrderById;
//# sourceMappingURL=get-internet-package-order-by-id.js.map