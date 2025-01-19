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
exports.userVerifyOtpValidator = void 0;
const Joi = __importStar(require("joi"));
const helpers_1 = require("../../helpers");
const error_validator_response_1 = require("../../helpers/error-validator-response");
const userVerifyOtpSchema = Joi.object({
    mobile: Joi.number().required().integer().messages({
        "any.required": "Mobile field is required.",
        "number.base": "Mobile field must contain only numbers.",
        "number.integer": "Mobile field must contain only numbers.",
    }),
    otp: Joi.number().required().integer().messages({
        "any.required": "Otp field is required.",
        "number.base": "Otp field must contain only numbers.",
        "number.integer": "Otp field must contain only numbers.",
    }),
    device_mac_id: Joi.string().required().messages({
        "any.required": "Device mac id field is required.",
        "string.empty": "Device mac id field is required.",
    }),
    country_code: Joi.number().integer().required().messages({
        "any.required": "Country code field is required.",
        "number.base": "Country code field must contain only numbers.",
        "number.integer": "Country code field must contain only numbers.",
    }),
    // camp_id: Joi.string().messages({
    //   "string.empty": "Camp id field is required.",
    // }),
});
const userVerifyOtpValidator = async (req, res, next) => {
    const { error } = userVerifyOtpSchema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        const { details } = error;
        const data = (0, helpers_1.formatResponse)(400, true, (0, error_validator_response_1.errorValidatorResponse)(details), null);
        res.status(400).json(data);
        return;
    }
    next();
};
exports.userVerifyOtpValidator = userVerifyOtpValidator;
//# sourceMappingURL=user-verify-otp.js.map