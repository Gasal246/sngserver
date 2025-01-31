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
exports.internetPackageClientValidator = void 0;
const Joi = __importStar(require("joi"));
const helpers_1 = require("../../helpers");
const error_validator_response_1 = require("../../helpers/error-validator-response");
const internetPackageClientSchema = Joi.object({
    internet_package_id: Joi.string().required().messages({
        "any.required": "Internet package id field is required.",
        "string.empty": "Internet package id field is required.",
    }),
    package_name: Joi.string().required().messages({
        "any.required": "Package name field is required.",
        "string.empty": "Package name field is required.",
    }),
    package_speed: Joi.string().required().messages({
        "any.required": "Package speed field is required.",
        "string.empty": "Package speed field is required.",
    }),
    package_price: Joi.number().required().messages({
        "any.required": "Package price field is required.",
        "string.empty": "Package price field is required.",
        "number.base": "Package price field must contain only numbers.",
    }),
    package_cost_price: Joi.number().required().messages({
        "any.required": "Package cost price field is required.",
        "string.empty": "Package cost price field is required.",
        "number.base": "Package cost price field must contain only numbers.",
    }),
});
const internetPackageClientValidator = async (req, res, next) => {
    const { error } = internetPackageClientSchema.validate(req.body, {
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
exports.internetPackageClientValidator = internetPackageClientValidator;
//# sourceMappingURL=add-internet-package-client.js.map