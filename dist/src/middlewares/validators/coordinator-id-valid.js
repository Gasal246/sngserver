"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCoordinatorIdIsExists = void 0;
const mongoose_1 = require("mongoose");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const enums_1 = require("../../types/enums");
const isCoordinatorIdIsExists = async (req, res, next) => {
    if (!req.params.id || !(0, mongoose_1.isValidObjectId)(req.params.id)) {
        const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
        res.status(400).json(data);
        return;
    }
    let client_id = null;
    if (req.decodedToken.data.role_slug == enums_1.Roles.ROLE_CLIENT_ADMIN) {
        client_id = req.decodedToken.data.id;
    }
    const isIdAvailable = await services_1.coordinatorService.getCoordinatorById(req.params.id, client_id);
    if (!isIdAvailable) {
        const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
        res.status(400).json(data);
        return;
    }
    next();
};
exports.isCoordinatorIdIsExists = isCoordinatorIdIsExists;
//# sourceMappingURL=coordinator-id-valid.js.map