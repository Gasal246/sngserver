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
exports.posValidator = void 0;
const Joi = __importStar(require("joi"));
const helpers_1 = require("../../helpers");
const error_validator_response_1 = require("../../helpers/error-validator-response");
const services_1 = require("../../services");
const addCampSchema = Joi.object({
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
    ip_mac: Joi.string().required().messages({
        "any.required": "Ip mac is required.",
    }),
});
const posValidator = async (req, res, next) => {
    try {
        await addCampSchema.validateAsync(req.body, { abortEarly: false });
        const emailInUse = await checkEmail(req);
        const ipInUse = await checkIp(req);
        if (!emailInUse && !ipInUse) {
            return next();
        }
        const err = {};
        if (emailInUse) {
            err.email = helpers_1.Message.EMAIL_UNIQUE;
        }
        if (ipInUse) {
            err.ip_mac = "The ip mac field must contain a unique value.";
        }
        const data = (0, helpers_1.formatResponse)(400, true, err, null);
        res.status(400).json(data);
        return;
    }
    catch (error) {
        const { details } = error;
        let errorObj = (0, error_validator_response_1.errorValidatorResponse)(details);
        if (!errorObj.email) {
            const emailInUse = await checkEmail(req);
            if (emailInUse) {
                errorObj = { email: helpers_1.Message.EMAIL_UNIQUE, ...errorObj };
            }
        }
        if (!errorObj.ip_mac) {
            const ipInUse = await checkIp(req);
            if (ipInUse) {
                errorObj = {
                    ...errorObj,
                    ip_mac: "The ip mac field must contain a unique value.",
                };
            }
        }
        const data = (0, helpers_1.formatResponse)(400, true, errorObj, null);
        res.status(400).json(data);
        return;
    }
};
exports.posValidator = posValidator;
const checkEmail = async (req) => {
    return await services_1.posService.checkEmail(req.body.email, req.params && req.params.id ? req.params.id : undefined);
};
const checkIp = async (req) => {
    return await services_1.posService.checkIp(req.body.ip_mac, req.params && req.params.id ? req.params.id : undefined);
};
//# sourceMappingURL=pos.js.map