"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternetPackageOrderCampWise = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const mongoose_1 = require("mongoose");
const getInternetPackageOrderCampWise = async (req, res) => {
    var _a;
    try {
        const camp_id = req.query.profile_camp_id
            ? req.query.profile_camp_id.toString()
            : "";
        const status = (_a = req.query.order_status) === null || _a === void 0 ? void 0 : _a.toString();
        if (!(0, mongoose_1.isValidObjectId)(camp_id)) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.CAMP_NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const campAssignPos = await services_1.CampAssignPosService.isCampAssignToPos(req.decodedToken.data.id, camp_id);
        if (!campAssignPos) {
            const data = (0, helpers_1.formatResponse)(400, true, "Camp not assigned to pos.", null);
            res.status(400).json(data);
            return;
        }
        const list = await services_1.orderInternetPackageService.getInternetPackageForCamp((0, helpers_1.createObjectId)(camp_id), status);
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
exports.getInternetPackageOrderCampWise = getInternetPackageOrderCampWise;
//# sourceMappingURL=get-internet-package-order-camp-wise.js.map