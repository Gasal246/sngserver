"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const getUserProfile = async (req, res) => {
    try {
        const user = await services_1.userRegisterService.findUserWithWallet((0, helpers_1.createObjectId)(req.decodedToken.data.id));
        if (!user) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        if (user.national_id) {
            user.national_id = (0, helpers_1.getUrlOfProfileImage)(user.national_id);
        }
        if (user.user_image) {
            user.user_image = (0, helpers_1.getUrlOfProfileImage)(user.user_image);
        }
        if (user.passport_image) {
            user.passport_image = (0, helpers_1.getUrlOfProfileImage)(user.passport_image);
        }
        const data = (0, helpers_1.formatResponse)(200, false, "User detail.", { list: user });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=get-user-profile.js.map