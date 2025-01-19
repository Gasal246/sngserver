"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserToken = void 0;
const jwt = require("jsonwebtoken");
const helpers_1 = require("../../helpers");
const auth_config_1 = require("../../config/auth.config");
const services_1 = require("../../services");
const verifyUserToken = async (req, res, next) => {
    if (!req.headers.authorization ||
        req.headers.authorization.split(" ")[0] !== "Bearer") {
        const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.ACCESS_DENIED, null);
        res.status(401).json(data);
        return;
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, auth_config_1.authConfig.token);
        const userId = (0, helpers_1.createObjectId)(decoded.data.id);
        const user = await services_1.userRegisterService.findUser(userId);
        if (!user) {
            const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.ACCESS_DENIED, null);
            res.status(401).json(data);
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
        if (decoded.data.device_mac_id !== user.device_mac_id) {
            const data = (0, helpers_1.formatResponse)(406, true, "Already logged in new device.", null);
            res.status(406).json(data);
            return;
        }
        req.decodedToken = decoded;
    }
    catch (err) {
        const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.ACCESS_DENIED, null);
        res.status(401).json(data);
        return;
    }
    next();
};
exports.verifyUserToken = verifyUserToken;
exports.default = { verifyUserToken: exports.verifyUserToken };
//# sourceMappingURL=user.js.map