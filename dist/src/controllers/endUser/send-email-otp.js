"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUserEmailOtp = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const models_1 = __importDefault(require("../../models"));
const sendUserEmailOtp = async (req, res) => {
    try {
        console.log(req.body); // Only For Development Purposes;
        const user = await services_1.userRegisterService.findUserByEmail(req.body.email);
        if (!user) {
            const newUser = new models_1.default.userRegisterModel();
            newUser.email = req.body.email;
            newUser.otp = (0, helpers_1.generateOtp)();
            newUser.device_mac_id = req.body.device_mac_id;
            newUser.status = 5;
            newUser.is_new_user = true;
            await (0, helpers_1.sendEmailOtp)(newUser.email, newUser.otp);
            const createdUser = await services_1.userRegisterService.createUser(newUser);
            const obj = {
                user_data: {
                    id: createdUser._id,
                    client_id: 0, // TODO remial client id association
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
    }
    catch (error) {
        console.log(error);
        const data = (0, helpers_1.formatResponse)(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.sendUserEmailOtp = sendUserEmailOtp;
//# sourceMappingURL=send-email-otp.js.map