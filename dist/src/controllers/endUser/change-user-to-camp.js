"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserToCamp = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const models_1 = __importDefault(require("../../models"));
const mongoose_1 = require("mongoose");
const changeUserToCamp = async (req, res) => {
    try {
        const userData = req.decodedToken.data;
        if (!userData.location_camp.location_verified) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.OUT_OF_SERVICE_AREA, null);
            res.status(400).json(data);
            return;
        }
        if (!(0, mongoose_1.isValidObjectId)(req.body.camp_id)) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.CAMP_NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const camp = await services_1.campService.getCampById(req.body.camp_id);
        if (!camp) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.CAMP_NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const campAssignedToUser = await services_1.userCampService.getAssignCampDetailsOfUser(req.decodedToken.data.id);
        if (!campAssignedToUser) {
            const data = (0, helpers_1.formatResponse)(400, true, "User not assigned to any camp.", null);
            res.status(400).json(data);
            return;
        }
        if (campAssignedToUser.camp_id.toString() === req.body.camp_id) {
            const data = (0, helpers_1.formatResponse)(400, true, "User already assigned to this camp.", null);
            res.status(400).json(data);
            return;
        }
        if (campAssignedToUser.client_id.toString() !== camp.client_id.toString()) {
            const data = (0, helpers_1.formatResponse)(400, true, "Camp id and base camp id not of same client.", null);
            res.status(400).json(data);
            return;
        }
        const promises = [];
        promises.push(services_1.userCampService.deactivateBaseCamp(campAssignedToUser._id));
        const userCamp = new models_1.default.userCampModel();
        userCamp.user_id = (0, helpers_1.createObjectId)(req.decodedToken.data.id);
        userCamp.camp_id = camp._id;
        userCamp.client_id = camp.client_id;
        userCamp.status = 1;
        promises.push(services_1.userCampService.assignUserToCamp(userCamp));
        await Promise.all(promises);
        const data = (0, helpers_1.formatResponse)(200, false, "User camp assigned successfully", {
            list: camp,
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
exports.changeUserToCamp = changeUserToCamp;
//# sourceMappingURL=change-user-to-camp.js.map