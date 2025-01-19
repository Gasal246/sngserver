"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyClientToken = void 0;
const jwt = require("jsonwebtoken");
const helpers_1 = require("../../helpers");
const auth_config_1 = require("../../config/auth.config");
const services_1 = require("../../services");
const verifyClientToken = async (req, res, next) => {
    if (!req.headers.authorization ||
        req.headers.authorization.split(" ")[0] !== "Bearer") {
        const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.ACCESS_DENIED, null);
        res.status(401).json(data);
        return;
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, auth_config_1.authConfig.token);
        const clientId = (0, helpers_1.createObjectId)(decoded.data.id);
        const client = await services_1.clientService.getClientWithRole(clientId);
        if (!client || !client.length) {
            const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.ACCESS_DENIED, null);
            res.status(401).json(data);
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
exports.verifyClientToken = verifyClientToken;
exports.default = { verifyClientToken: exports.verifyClientToken };
//# sourceMappingURL=client.js.map