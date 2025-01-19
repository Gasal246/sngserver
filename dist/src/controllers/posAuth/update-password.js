"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePosPassword = void 0;
const helpers_1 = require("../../helpers");
const helpers_2 = require("../../helpers");
const helpers_3 = require("../../helpers");
const services_1 = require("../../services");
const updatePosPassword = async (req, res) => {
    try {
        const user = await services_1.posService.getPosById(req.decodedToken.data.id);
        if (!user) {
            const data = (0, helpers_2.formatResponse)(401, true, helpers_1.Message.NOT_FOUND, null);
            res.status(401).json(data);
            return;
        }
        if (!(0, helpers_1.validPassword)(req.body.current_password, user.password)) {
            const data = (0, helpers_2.formatResponse)(401, true, helpers_1.Message.CURRENT_PASSWORD_INCORRECT, null);
            res.status(200).json(data);
            return;
        }
        user.password = (0, helpers_3.generateHash)(req.body.new_password);
        await services_1.posService.updateOne(user._id, { password: user.password });
        const data = (0, helpers_2.formatResponse)(200, false, helpers_1.Message.PASSWORD_UPDATE_SUCCESS, null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_2.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.updatePosPassword = updatePosPassword;
//# sourceMappingURL=update-password.js.map