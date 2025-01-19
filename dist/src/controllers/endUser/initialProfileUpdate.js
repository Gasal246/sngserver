"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpoPushToken = exports.initialProfileUpdate = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const user_register_1 = require("../../services/user_register");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../../config/auth.config");
const initialProfileUpdate = async (req, res) => {
    try {
        const user = await services_1.userRegisterService.findUser(req.decodedToken.data.id);
        if (!user) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WENT_WRONG, null);
            res.status(400).json(data);
            return;
        }
        const result = await (0, user_register_1.updateProfile)(req.decodedToken.data.id, {
            name: req.query.name,
        });
        const userData = { ...req.decodedToken.data, name: req.query.name };
        const jwtData = { ...req.decodedToken, data: userData };
        const token = jsonwebtoken_1.default.sign(jwtData, auth_config_1.authConfig.token);
        const data = (0, helpers_1.formatResponse)(201, false, helpers_1.Message.LOGIN_SUCCESS, {
            user_data: userData,
            token: token,
        });
        res.status(201).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        console.log(e.message);
        res.status(500).json(data);
        return;
    }
};
exports.initialProfileUpdate = initialProfileUpdate;
// FUNCTION TO UPDATE EXPO PUSH TOKEN FOR THE NOTIFICATION SERVICES.
const updateExpoPushToken = async (req, res) => {
    try {
        const token = req.body.expo_push_token;
        if (!token) {
            const data = (0, helpers_1.formatResponse)(500, true, "NO EXPO PUSH TOKEN FOUND", null);
            res.status(500).json(data);
            return;
        }
        const result = await (0, user_register_1.updateProfile)(req.decodedToken.data.id, {
            expo_push_token: token,
        });
        const data = (0, helpers_1.formatResponse)(200, true, result ? result : { error: true }, null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        console.log(e.message);
        res.status(500).json(data);
        return;
    }
};
exports.updateExpoPushToken = updateExpoPushToken;
//# sourceMappingURL=initialProfileUpdate.js.map