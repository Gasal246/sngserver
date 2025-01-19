"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserPhoneVerify = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const newUserPhoneVerify = async (req, res) => {
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
        if (user.new_phone && user.new_phone != req.body.phone) {
            const data = (0, helpers_1.formatResponse)(400, true, "You have entered wrong mobile number for otp verification", null);
            res.status(400).json(data);
            return;
        }
        if (user.otp != req.body.otp) {
            const data = (0, helpers_1.formatResponse)(400, true, "Wrong otp details", null);
            res.status(400).json(data);
            return;
        }
        const obj = {
            phone: user.new_phone,
            new_phone: "0",
        };
        await services_1.userRegisterService.updateProfile(user._id.toString(), obj);
        const data = (0, helpers_1.formatResponse)(201, false, "User new phone verified successfully.", null);
        res.status(201).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.newUserPhoneVerify = newUserPhoneVerify;
//# sourceMappingURL=new-phone-verify.js.map