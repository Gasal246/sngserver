"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../../config/auth.config");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const clientLogin = async (req, res) => {
    try {
        const user = await services_1.clientService.getClientByEmail(req.body.email);
        if (!user) {
            const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.INCORRECT_LOGIN, null);
            console.log("User fetching error cannot find by email.");
            res.status(401).json(data);
            return;
        }
        console.log("Client Login Action: ", user === null || user === void 0 ? void 0 : user.email);
        if (!(0, helpers_1.validPassword)(req.body.password, user.password)) {
            const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.INCORRECT_LOGIN, null);
            console.log("Invalid Password!!");
            res.status(401).json(data);
            return;
        }
        const role = await services_1.roleService.getRoleById(user.role_id);
        const client = (0, helpers_1.parseToSimpleObj)(user);
        delete client.password;
        const jwtData = {
            data: {
                ...client,
                name: role === null || role === void 0 ? void 0 : role.name,
                slug: role === null || role === void 0 ? void 0 : role.slug,
                role_slug: role === null || role === void 0 ? void 0 : role.slug,
                client_id: user._id,
                total_coordinator: 0, //TODO remain total coordinator count
                total_accountant: 0, //TODO remain total account count
                total_pos: 0, //TODO remain total pos count
                total_camp: 0, //TODO remain total camp count
                total_user: 0, //TODO remain total user count
            },
        };
        //Generated jwt token
        const token = jsonwebtoken_1.default.sign(jwtData, auth_config_1.authConfig.token, {
            expiresIn: auth_config_1.authConfig.expiresIn,
        });
        console.log("JWT Token Created");
        const data = (0, helpers_1.formatResponse)(201, false, helpers_1.Message.LOGIN_SUCCESS, {
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
exports.clientLogin = clientLogin;
//# sourceMappingURL=login.js.map