"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.coordinatorValidator = void 0;
const Joi = __importStar(require("joi"));
const helpers_1 = require("../../helpers");
const error_validator_response_1 = require("../../helpers/error-validator-response");
const services_1 = require("../../services");
const coordinatorSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "Email field is required.",
        "string.empty": "Email field is required.",
        "string.email": "Email address is not in format.",
    }),
    password: Joi.string().min(8).required().messages({
        "any.required": "Password field is required.",
        "string.empty": "Password field is required.",
        "string.min": "The password field must be at least 8 characters in length.",
    }),
    full_name: Joi.string().required().messages({
        "any.required": "Full name field is required.",
        "string.empty": "Full name field is required.",
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
});
const coordinatorValidator = async (req, res, next) => {
    try {
        await coordinatorSchema.validateAsync(req.body, { abortEarly: false });
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
exports.coordinatorValidator = coordinatorValidator;
const checkUniqueEmail = async (req) => {
    return await services_1.coordinatorService.checkEmail(req.body.email, req.params && req.params.id ? req.params.id : undefined);
};
//# sourceMappingURL=add-coordinator.js.map