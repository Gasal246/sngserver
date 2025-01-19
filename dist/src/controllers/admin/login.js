"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../../config/auth.config");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const adminLogin = async (req, res) => {
    try {
        const user = await services_1.adminService.getAdminByEmail(req.body.email);
        if (!user) {
            const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.INCORRECT_LOGIN, null);
            res.status(401).json(data);
            return;
        }
        if (!(0, helpers_1.validPassword)(req.body.password, user.password)) {
            const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.INCORRECT_LOGIN, null);
            res.status(401).json(data);
            return;
        }
        const role = await services_1.roleService.getRoleById(user.role_id);
        const jwtData = {
            data: {
                id: user._id,
                email: user.email,
                role_id: user.role_id,
                name: role === null || role === void 0 ? void 0 : role.name,
                slug: role === null || role === void 0 ? void 0 : role.slug,
            },
        };
        //Generated jwt token
        const token = jsonwebtoken_1.default.sign(jwtData, auth_config_1.authConfig.token, {
            expiresIn: auth_config_1.authConfig.expiresIn,
        });
        const data = (0, helpers_1.formatResponse)(201, false, helpers_1.Message.LOGIN_SUCCESS, {
            user_data: {
                id: user._id,
                email: user.email,
                role_id: user.role_id,
                name: role === null || role === void 0 ? void 0 : role.name,
                slug: role === null || role === void 0 ? void 0 : role.slug,
            },
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
exports.adminLogin = adminLogin;
//# sourceMappingURL=login.js.map