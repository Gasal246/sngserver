"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNationalTypeValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const date_1 = __importDefault(require("@joi/date"));
const Joi = joi_1.default.extend(date_1.default);
const helpers_1 = require("../../helpers");
const error_validator_response_1 = require("../../helpers/error-validator-response");
const services_1 = require("../../services");
const addClientSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name field is required.",
        "string.empty": "Name field is required.",
    }),
});
const addNationalTypeValidator = async (req, res, next) => {
    try {
        await addClientSchema.validateAsync(req.body, { abortEarly: false });
        const isNameInUse = await checkUniqueName(req);
        if (!isNameInUse) {
            return next();
        }
        const data = (0, helpers_1.formatResponse)(400, true, { email: "The name field must contain a unique value." }, null);
        res.status(400).json(data);
        return;
    }
    catch (error) {
        const { details } = error;
        let errorObj = (0, error_validator_response_1.errorValidatorResponse)(details);
        if (!errorObj.email) {
            const isNameInUse = await checkUniqueName(req);
            if (isNameInUse) {
                errorObj = {
                    email: "The name field must contain a unique value.",
                    ...errorObj,
                };
            }
        }
        const data = (0, helpers_1.formatResponse)(400, true, errorObj, null);
        res.status(400).json(data);
        return;
    }
};
exports.addNationalTypeValidator = addNationalTypeValidator;
const checkUniqueName = async (req) => {
    return await services_1.nationalTypeService.checkUniqueName(req.body.name, req.params && req.params.id ? req.params.id : undefined);
};
//# sourceMappingURL=add-national-type.js.map