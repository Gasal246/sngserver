"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const date_1 = __importDefault(require("@joi/date"));
const Joi = joi_1.default.extend(date_1.default);
const helpers_1 = require("../../helpers");
const error_validator_response_1 = require("../../helpers/error-validator-response");
const services_1 = require("../../services");
const addClientSchema = Joi.object({
    email: Joi.string().required().email().messages({
        "any.required": "Email is required.",
        "string.email": "Email address is not in format.",
    }),
    password: Joi.string().min(8).required().messages({
        "any.required": "Password is required.",
        "string.min": "The password field must be at least 8 characters in length.",
    }),
    full_name: Joi.string().required().messages({
        "any.required": "Full Name is required.",
    }),
    business_name: Joi.string().required().messages({
        "any.required": "Business name is required.",
    }),
    phone: Joi.string().required().messages({
        "any.required": "Phone is required.",
    }),
    business_address: Joi.string().required().messages({
        "any.required": "Business address is required.",
    }),
    city: Joi.string().required().messages({
        "any.required": "City is required.",
    }),
    country: Joi.string().required().messages({
        "any.required": "Country is required.",
    }),
    no_user: Joi.number().integer().required().messages({
        "any.required": "The number of user field is required.",
        "number.base": "The number of user field must contain only numbers.",
        "number.integer": "The number of user field must contain only numbers.",
    }),
    no_camp: Joi.number().integer().required().messages({
        "any.required": "The number of camp field is required.",
        "number.base": "The number of camp field must contain only numbers.",
        "number.integer": "The number of camp field must contain only numbers.",
    }),
    no_cordinator: Joi.number().integer().required().messages({
        "any.required": "The number of coordinator field is required.",
        "number.base": "The  number of coordinator field must contain only numbers.",
        "number.integer": "The  number of coordinator field must contain only numbers.",
    }),
    no_pos: Joi.number().integer().required().messages({
        "any.required": "The number of position field is required.",
        "number.base": "The number of position field must contain only numbers.",
        "number.integer": "The number of position field must contain only numbers.",
    }),
    no_kiosk: Joi.number().integer().required().messages({
        "any.required": "The number of kiosk field is required.",
        "number.base": "The  number of kiosk field must contain only numbers.",
        "number.integer": "The  number of kiosk field must contain only numbers.",
    }),
    no_accountant: Joi.number().integer().required().messages({
        "any.required": "The number of account field is required.",
        "number.base": "The number of account field must contain only numbers.",
        "number.integer": "The number of account field must contain only numbers.",
    }),
    is_mess_management: Joi.number().integer().valid(0, 1).required().messages({
        "any.required": "The mess management field is required.",
        "any.only": "The mess management field must be one of:0 = NO,1 = Yes",
        "number.base": "The mess management field must be one of:0 = NO,1 = Yes",
        "number.integer": "The mess management field must be one of:0 = NO,1 = Yes.",
    }),
    is_water_management: Joi.number().integer().valid(0, 1).required().messages({
        "any.required": "The water management field is required.",
        "any.only": "The water management field must be one of:0 = NO,1 = Yes",
        "number.base": "The water management field must be one of:0 = NO,1 = Yes",
        "number.integer": "The water management field must be one of:0 = NO,1 = Yes.",
    }),
    is_internet_management: Joi.number()
        .integer()
        .valid(0, 1)
        .required()
        .messages({
        "any.required": "The internet management field is required.",
        "any.only": "The internet management field must be one of:0 = NO,1 = Yes",
        "number.base": "The internet management field must be one of:0 = NO,1 = Yes",
        "number.integer": "The internet management field must be one of:0 = NO,1 = Yes.",
    }),
    subscription_start: Joi.date().format("YYYY-MM-DD").required().messages({
        "any.required": "subscription start is required.",
        "date.format": "The Subscription start field required date format YYYY-MM-DD.",
    }),
    subscription_end: Joi.date()
        .format("YYYY-MM-DD")
        .greater(Joi.ref("subscription_start"))
        .required()
        .messages({
        "any.required": "Subscription end is required.",
        "date.format": "The subscription end field required date format YYYY-MM-DD.",
        "date.greater": "Subscription end date must be greater than subscription start date.",
    }),
    grace_period_days: Joi.number().integer().required().messages({
        "any.required": "The grace period days field is required.",
        "number.base": "The grace period days field must contain only numbers.",
        "number.integer": "The grace period days field must contain only numbers.",
    }),
    payment_type: Joi.string()
        .valid("ONE-TIME", "SUBSCRIPTION")
        .required()
        .messages({
        "any.required": "The payment type field is required.",
        "any.only": "The payment type field must be one of: ONE-TIME,SUBSCRIPTION.",
    }),
    package_rate: Joi.number().required().messages({
        "any.required": "The package rate field is required.",
        "number.base": "The package rate field must contain only numeric value.",
    }),
    is_investor_management: Joi.number()
        .integer()
        .valid(0, 1)
        .required()
        .messages({
        "any.required": "The is investor management field is required.",
        "any.only": "The is investor management field must be one of:0 = NO,1 = Yes",
    }),
    currency_code: Joi.string().required().messages({
        "any.required": "currency code is required.",
    }),
});
const ClientValidator = async (req, res, next) => {
    try {
        await addClientSchema.validateAsync(req.body, { abortEarly: false });
        const isEmailInUse = await checkUniqueEmail(req);
        if (!isEmailInUse) {
            return next();
        }
        const data = (0, helpers_1.formatResponse)(400, true, { email: "The email field must contain a unique value." }, null);
        res.status(400).json(data);
        return;
    }
    catch (error) {
        const { details } = error;
        let errorObj = (0, error_validator_response_1.errorValidatorResponse)(details);
        if (!errorObj.email) {
            const isEmailInUse = await checkUniqueEmail(req);
            if (isEmailInUse) {
                errorObj = {
                    email: "The email field must contain a unique value.",
                    ...errorObj,
                };
            }
        }
        const data = (0, helpers_1.formatResponse)(400, true, errorObj, null);
        res.status(400).json(data);
        return;
    }
};
exports.ClientValidator = ClientValidator;
const checkUniqueEmail = async (req) => {
    return await services_1.clientService.checkEmail(req.body.email, req.params && req.params.id ? req.params.id : undefined);
};
//# sourceMappingURL=client.js.map