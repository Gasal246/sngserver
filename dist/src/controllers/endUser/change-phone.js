"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserPhone = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const changeUserPhone = async (req, res) => {
    try {
        const userData = req.decodedToken.data;
        if (!userData.location_camp.location_verified) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.OUT_OF_SERVICE_AREA, null);
            res.status(400).json(data);
            return;
        }
        const user = await services_1.userRegisterService.findUser(req.decodedToken.data.id);
        if (!user) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.SOMETHING_WENT_WRONG, null);
            res.status(400).json(data);
            return;
        }
        if (user.phone == req.body.phone) {
            const data = (0, helpers_1.formatResponse)(400, true, "You have entered your existing mobile number. Please add another number.", null);
            res.status(400).json(data);
            return;
        }
        const obj = {
            otp: (0, helpers_1.generateOtp)(),
            new_phone: req.body.phone,
        };
        await (0, helpers_1.sendOtp)(user.country_code + obj.new_phone, obj.otp.toString());
        await services_1.userRegisterService.updateProfile(user._id.toString(), obj);
        const msg = process.env.NODE_ENV === "development"
            ? `OTP send your new entered number. [FOR DEVELOPMENT OTP: ${obj.otp.toString()}]`
            : "OTP send your new entered number.";
        const data = (0, helpers_1.formatResponse)(200, false, msg, null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.changeUserPhone = changeUserPhone;
//# sourceMappingURL=change-phone.js.map