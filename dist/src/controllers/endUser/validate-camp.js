"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCamp = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../../config/auth.config");
const mongoose_1 = require("mongoose");
const user_register_1 = require("../../services/user_register");
const validateCamp = async (req, res) => {
    var _a;
    try {
        if (!req.body.camp_id) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.OUT_OF_SERVICE_AREA, null);
            res.status(400).json(data);
            return;
        }
        if (!req.body.client_mac_id) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.OUT_OF_SERVICE_AREA, null);
            res.status(400).json(data);
            return;
        }
        const userData = req.decodedToken.data;
        let campData;
        if (!(0, mongoose_1.isValidObjectId)(req.body.camp_id)) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.LOCATION_CAMP_NO_AVAILABLE, null);
            res.status(400).json(data);
            return;
        }
        campData = await services_1.campService.getCampById(req.body.camp_id);
        if (!campData) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.LOCATION_CAMP_NO_AVAILABLE, null);
            res.status(400).json(data);
            return;
        }
        const baseCampDetails = await services_1.userCampService.getAssignCampDetailsOfUser(userData.id.toString());
        const updateUserWithClientMac = await (0, user_register_1.updateUserById)(userData === null || userData === void 0 ? void 0 : userData.id, {
            client_mac_id: (_a = req.body) === null || _a === void 0 ? void 0 : _a.client_mac_id,
        });
        const location_camp = {
            location_camp_id: req.body.camp_id ? req.body.camp_id : null,
            location_verified: req.body.camp_id ? true : false,
            location_camp_client_id: campData ? campData.client_id : null,
            location_camp_name: campData ? campData === null || campData === void 0 ? void 0 : campData.camp_name : null,
        };
        const jwtData = {
            data: {
                ...userData,
                client_mac_id: updateUserWithClientMac === null || updateUserWithClientMac === void 0 ? void 0 : updateUserWithClientMac.client_mac_id,
                baseCampAvailable: baseCampDetails ? true : false,
                location_camp: location_camp,
            },
        };
        //Generated jwt token
        const token = jsonwebtoken_1.default.sign(jwtData, auth_config_1.authConfig.token, {
            expiresIn: auth_config_1.authConfig.expiresIn,
        });
        const data = (0, helpers_1.formatResponse)(201, false, helpers_1.Message.CAMP_FOUND, {
            user_data: jwtData.data,
            token: token,
        });
        res.status(201).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.validateCamp = validateCamp;
//# sourceMappingURL=validate-camp.js.map