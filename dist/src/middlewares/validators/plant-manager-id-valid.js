"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlantMangerIdIsExists = void 0;
const mongoose_1 = require("mongoose");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const isPlantMangerIdIsExists = async (req, res, next) => {
    if (!req.params.id || !(0, mongoose_1.isValidObjectId)(req.params.id)) {
        const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
        res.status(400).json(data);
        return;
    }
    const isIdAvailable = await services_1.plantManagerService.getPlantManagerById(req.params.id);
    if (!isIdAvailable) {
        const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
        res.status(400).json(data);
        return;
    }
    next();
};
exports.isPlantMangerIdIsExists = isPlantMangerIdIsExists;
//# sourceMappingURL=plant-manager-id-valid.js.map