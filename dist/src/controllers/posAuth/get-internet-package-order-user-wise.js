"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternetPackageOrderUserWise = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const mongoose_1 = require("mongoose");
const getInternetPackageOrderUserWise = async (req, res) => {
    var _a, _b, _c;
    try {
        const userId = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.user_id) ? (_b = req.query.user_id) === null || _b === void 0 ? void 0 : _b.toString() : "";
        const status = (_c = req.query.order_status) === null || _c === void 0 ? void 0 : _c.toString();
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.USER_NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const user = await services_1.userRegisterService.findUser((0, helpers_1.createObjectId)(userId));
        if (!user) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.USER_NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const assignCampDetails = await services_1.userCampService.getAssignCampDetailsOfUser(userId);
        if (!assignCampDetails) {
            const data = (0, helpers_1.formatResponse)(400, true, "User not assigned to any camp.", null);
            res.status(400).json(data);
            return;
        }
        if (req.decodedToken.data.client_id !== assignCampDetails.client_id.toString()) {
            const data = (0, helpers_1.formatResponse)(400, true, "User and pos user not of same client.", null);
            res.status(400).json(data);
            return;
        }
        const list = await services_1.orderInternetPackageService.getInternetPackageForUser((0, helpers_1.createObjectId)(userId), status);
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
exports.getInternetPackageOrderUserWise = getInternetPackageOrderUserWise;
//# sourceMappingURL=get-internet-package-order-user-wise.js.map