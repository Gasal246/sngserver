"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRechargeHistory = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const dayjs_1 = __importDefault(require("dayjs"));
const getRechargeHistory = async (req, res) => {
    var _a;
    try {
        const userData = req.decodedToken.data;
        if (!userData.location_camp.location_verified) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.OUT_OF_SERVICE_AREA, null);
            res.status(400).json(data);
            return;
        }
        const status = (_a = req.query.status) === null || _a === void 0 ? void 0 : _a.toString();
        const rechargeHistory = await services_1.userRechargeService.getRechargeHistoryByUserId(req.decodedToken.data.id, status);
        const result = [];
        for (const obj of rechargeHistory) {
            const element = (0, helpers_1.parseToSimpleObj)(obj);
            element.transactionDate = (0, dayjs_1.default)(element.createdAt).format("DD-MMM-YYYY");
            element.transactionTime = (0, dayjs_1.default)(element.createdAt).format("hh:mm:ss a");
            result.push(element);
        }
        const data = (0, helpers_1.formatResponse)(200, false, "User recharge history detail.", {
            list: result,
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
exports.getRechargeHistory = getRechargeHistory;
//# sourceMappingURL=get-recharge-history.js.map