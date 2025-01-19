"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyInvestorToken = void 0;
const jwt = require("jsonwebtoken");
const helpers_1 = require("../../helpers");
const auth_config_1 = require("../../config/auth.config");
const services_1 = require("../../services");
const verifyInvestorToken = async (req, res, next) => {
    if (!req.headers.authorization ||
        req.headers.authorization.split(" ")[0] !== "Bearer") {
        const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.ACCESS_DENIED, null);
        res.status(401).json(data);
        return;
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, auth_config_1.authConfig.token);
        const coordinatorId = decoded.data.id;
        const clientId = decoded.data.client_id;
        if (clientId) {
            const client = await services_1.clientService.getClientById(clientId);
            if (!client) {
                const data = (0, helpers_1.formatResponse)(401, true, helpers_1.Message.ACCESS_DENIED, null);
                res.status(401).json(data);
                return;
            }
        }
        const user = await services_1.investorsService.getInvestorById(coordinatorId, clientId);
        if (!user) {
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
exports.verifyInvestorToken = verifyInvestorToken;
exports.default = { verifyInvestorToken: exports.verifyInvestorToken };
//# sourceMappingURL=investors.js.map