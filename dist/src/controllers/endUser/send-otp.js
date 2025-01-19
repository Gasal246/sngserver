"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUserOtp = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const models_1 = __importDefault(require("../../models"));
const sendUserOtp = async (req, res) => {
    try {
        console.log(req.body); // Only for Developement Purposes;
        const user = await services_1.userRegisterService.findUserByMobileNumber(req.body.mobile);
        if (!user) {
            const newUser = new models_1.default.userRegisterModel();
            newUser.phone = req.body.mobile;
            newUser.otp = (0, helpers_1.generateOtp)();
            newUser.device_mac_id = req.body.device_mac_id;
            newUser.country_code = req.body.country_code;
            newUser.status = 5;
            newUser.is_new_user = true;
            await (0, helpers_1.sendOtp)(newUser.country_code + newUser.phone, newUser.otp.toString());
            const createdUser = await services_1.userRegisterService.createUser(newUser);
            const obj = {
                user_data: {
                    id: createdUser._id,
                    client_id: 0, //TODO remain client id association
                    name: createdUser.name,
                    //otp: createdUser.otp,
                    has_transfer_request: createdUser.has_transfer_request,
                },
            };
            const msg = process.env.NODE_ENV === "development"
                ? `OTP send your registered number. [FOR DEVELOPMENT OTP: ${createdUser.otp}]`
                : "OTP send your registered number.";
            const data = (0, helpers_1.formatResponse)(200, false, msg, obj);
            res.status(200).json(data);
            return;
        }
        const baseCampDetails = await services_1.userCampService.getAssignCampDetailsOfUser(user._id.toString());
        if (baseCampDetails) {
            const client = await services_1.clientService.getClientById(baseCampDetails.client_id.toString());
            if (!client) {
                const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.ACCESS_DENIED, null);
                res.status(401).json(data);
                return;
            }
        }
        user.otp = (0, helpers_1.generateOtp)();
        user.device_mac_id = req.body.device_mac_id;
        user.country_code = req.body.country_code;
        user.status = 5;
        await (0, helpers_1.sendOtp)(user.country_code + user.phone, user.otp.toString());
        const updatedUser = await services_1.userRegisterService.updateUser(user._id.toString(), user);
        if (!updatedUser) {
            const data = (0, helpers_1.formatResponse)(500, true, helpers_1.Message.SOMETHING_WENT_WRONG, null);
            res.status(500).json(data);
            return;
        }
        const obj = {
            user_data: {
                id: updatedUser._id,
                client_id: 0, //TODO remain client id association
                name: updatedUser.name,
                // otp: updatedUser.otp,
                has_transfer_request: updatedUser.has_transfer_request,
            },
        };
        const msg = process.env.NODE_ENV === "development"
            ? `OTP send your registered number. [FOR DEVELOPMENT OTP: ${updatedUser.otp}]`
            : "OTP send your registered number.";
        const data = (0, helpers_1.formatResponse)(200, false, msg, obj);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        console.log(e);
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.sendUserOtp = sendUserOtp;
//# sourceMappingURL=send-otp.js.map