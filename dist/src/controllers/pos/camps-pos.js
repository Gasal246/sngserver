"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosListByCampId = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const mongoose_1 = __importDefault(require("mongoose"));
const getPosListByCampId = async (req, res) => {
    try {
        // console.log("Hello There")
        const campid = req.params.camp_id;
        const count = req.query.count;
        const pos = req.query.pos;
        if (pos) {
            const result = await services_1.CampAssignPosService.isCampAssignToPos(pos, campid);
            if (!result) {
                const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.POS_CAMP_NOT_AUT, null);
                res.status(401).json(data);
                return;
            }
            else {
                const data = (0, helpers_1.formatResponse)(200, false, "Access Authorized!", null);
                res.status(200).json(data);
                return;
            }
        }
        const posList = await services_1.CampAssignPosService.getCampAssignPosDetails(new mongoose_1.default.Types.ObjectId(campid), "1", count === null || count === void 0 ? void 0 : count.toString());
        const data = (0, helpers_1.formatResponse)(200, false, "Success", posList);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getPosListByCampId = getPosListByCampId;
//# sourceMappingURL=camps-pos.js.map