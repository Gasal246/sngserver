"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.posLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../../config/auth.config");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const mongoose_1 = require("mongoose");
const posLogin = async (req, res) => {
    try {
        const user = await services_1.posService.getPosByEmail(req.body.email);
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
        if (user.client_id) {
            const client = await services_1.clientService.getClientById(user.client_id.toString());
            if (!client) {
                const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.ACCESS_DENIED, null);
                res.status(401).json(data);
                return;
            }
        }
        // TD: start
        const deviceHistory = await services_1.posDeviceCodeHistoryService.getDeviceByMacAddress(req.body.device_mac_address);
        if (!deviceHistory) {
            const data = (0, helpers_1.formatResponse)(401, true, "Device is not active.", null);
            res.status(401).json(data);
            return;
        }
        if (!(0, mongoose_1.isValidObjectId)(req.body.camp_id)) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.CAMP_NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const camp = await services_1.campService.getCampById(req.body.camp_id);
        if (!camp) {
            const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.CAMP_NOT_FOUND, null);
            res.status(401).json(data);
            return;
        }
        const deviceCodeId = deviceHistory.pos_dc_id;
        const campId = camp._id;
        const deviceAssignedToCamp = await services_1.campAssignPosDeviceService.isCampAssignToDeviceModel(deviceCodeId.toString(), campId.toString());
        if (!deviceAssignedToCamp) {
            const data = (0, helpers_1.formatResponse)(401, true, "Device code not assigned to camp.", null);
            res.status(401).json(data);
            return;
        }
        const deviceAssignedToPos = await services_1.posAssignPosDeviceService.isPosAssignToDeviceModel(deviceCodeId.toString(), user._id.toString());
        if (!deviceAssignedToPos) {
            const data = (0, helpers_1.formatResponse)(401, true, "Device code not assigned to pos user.", null);
            res.status(401).json(data);
            return;
        }
        const campAssignedToUser = await services_1.CampAssignPosService.isCampAssignToPos(user._id.toString(), campId.toString());
        if (!campAssignedToUser) {
            const data = (0, helpers_1.formatResponse)(401, true, "Camp not assigned to pos user.", null);
            res.status(401).json(data);
            return;
        }
        //Moving onsite camp to offline
        await services_1.CampAssignPosService.campMoveOnsiteToOffsite(user._id.toString());
        //Transferring login camp to Onsite
        await services_1.CampAssignPosService.campMoveToOnsite(campAssignedToUser._id.toString());
        // TD: end
        const role = await services_1.roleService.getRoleById(user.role_id);
        const pos = (0, helpers_1.parseToSimpleObj)(user);
        delete pos.password;
        const camp_details = {
            camp_id: campId,
            camp_name: camp.camp_name,
            router_primary_ip: camp.router_primary_ip,
            router_mac_address: camp.router_mac_address,
        };
        const dcDetails = {
            pos_dc_id: deviceCodeId,
            device_name: deviceHistory.device_name,
            device_model: deviceHistory.device_model,
            device_mac_address: deviceHistory.device_mac_address,
            device_history_id: deviceHistory._id,
        };
        const jwtData = {
            data: {
                ...pos,
                name: role === null || role === void 0 ? void 0 : role.name,
                slug: role === null || role === void 0 ? void 0 : role.slug,
                role_slug: role === null || role === void 0 ? void 0 : role.slug,
                camp: camp_details,
                device: dcDetails,
            },
        };
        //Generated jwt token
        const token = jsonwebtoken_1.default.sign(jwtData, auth_config_1.authConfig.token, {
            expiresIn: auth_config_1.authConfig.expiresIn,
        });
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
exports.posLogin = posLogin;
//# sourceMappingURL=login.js.map