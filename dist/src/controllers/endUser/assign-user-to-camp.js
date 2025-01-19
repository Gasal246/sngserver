"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignUserToCamp = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const models_1 = __importDefault(require("../../models"));
const mongoose_1 = require("mongoose");
const assignUserToCamp = async (req, res) => {
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
        if (campAssignedToUser) {
            const data = (0, helpers_1.formatResponse)(400, true, "User already assigned to camp", null);
            res.status(400).json(data);
            return;
        }
        const client = await services_1.clientService.getClientById(camp.client_id.toString());
        if (!client) {
            const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.ACCESS_DENIED, null);
            res.status(401).json(data);
            return;
        }
        const userCamp = new models_1.default.userCampModel();
        userCamp.user_id = (0, helpers_1.createObjectId)(req.decodedToken.data.id);
        userCamp.camp_id = camp._id;
        userCamp.client_id = camp.client_id;
        userCamp.status = 1;
        await services_1.userCampService.assignUserToCamp(userCamp);
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
exports.assignUserToCamp = assignUserToCamp;
//# sourceMappingURL=assign-user-to-camp.js.map