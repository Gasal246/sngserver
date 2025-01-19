"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserOtp = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../../config/auth.config");
const mongoose_1 = require("mongoose");
const verifyUserOtp = async (req, res) => {
    try {
        const user = await services_1.userRegisterService.findUserForVerification(req.body.mobile, req.body.otp, req.body.device_mac_id, req.body.country_code);
        if (!user) {
            const data = (0, helpers_1.formatResponse)(400, true, "Wrong otp details", null);
            res.status(400).json(data);
            return;
        }
        // if (user.is_new_user && !req.body.camp_id) {
        //   const data = formatResponse(400, true, Message.OUT_OF_SERVICE_AREA, null);
        //   res.status(400).json(data);
        //   return;
        // }
        let campData;
        if (req.body.camp_id) {
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
        }
        const is_new_user = user.is_new_user;
        if (user.is_new_user) {
            let foundRecord = null;
            let code = "";
            do {
                code = (0, helpers_1.generateRandomPackageCode)();
                foundRecord = await services_1.userRegisterService.isUuidFound(code);
            } while (foundRecord != null);
            user.uuid = code;
        }
        user.status = 1;
        user.is_new_user = false;
        const updatedUser = await services_1.userRegisterService.updateUser(user._id.toString(), user);
        if (!updatedUser) {
            const data = (0, helpers_1.formatResponse)(500, true, helpers_1.Message.SOMETHING_WENT_WRONG, null);
            res.status(500).json(data);
            return;
        }
        const obj = (0, helpers_1.parseToSimpleObj)(updatedUser);
        obj.is_new_user = is_new_user;
        delete obj.password;
        const baseCampDetails = await services_1.userCampService.getAssignCampDetailsOfUser(user._id.toString());
        const location_camp = {
            location_camp_id: req.body.camp_id ? req.body.camp_id : null,
            location_verified: req.body.camp_id ? true : false,
            location_camp_client_id: campData ? campData.client_id : null,
        };
        const jwtData = {
            data: {
                ...obj,
                baseCampAvailable: baseCampDetails ? true : false,
                base_camp_id: baseCampDetails ? baseCampDetails === null || baseCampDetails === void 0 ? void 0 : baseCampDetails.camp_id : null,
                base_camp_client_id: baseCampDetails
                    ? baseCampDetails === null || baseCampDetails === void 0 ? void 0 : baseCampDetails.client_id
                    : null,
                location_camp: location_camp,
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
exports.verifyUserOtp = verifyUserOtp;
//# sourceMappingURL=verify-otp.js.map