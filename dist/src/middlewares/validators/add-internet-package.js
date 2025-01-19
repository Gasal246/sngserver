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
exports.internetPackageValidator = void 0;
const Joi = __importStar(require("joi"));
const helpers_1 = require("../../helpers");
const error_validator_response_1 = require("../../helpers/error-validator-response");
const internetPackageSchema = Joi.object({
    package_name: Joi.string().required().messages({
        "any.required": "Package name field is required.",
        "string.empty": "Package name field is required.",
    }),
    duration: Joi.number()
        .integer()
        .min(1)
        .max(helpers_1.MAX_DAY)
        .required()
        .messages({
        "any.required": "Duration field is required.",
        "number.base": "Duration field must contain only numbers.",
        "number.integer": "Duration field must contain only numbers.",
        "number.min": "Duration field must be at least 1 characters in length.",
        "number.max": `Duration field must be at least ${helpers_1.MAX_DAY} characters in length.`,
    }),
    volume: Joi.number()
        .integer()
        .min(1)
        .max(helpers_1.MAX_KB)
        .required()
        .messages({
        "any.required": "Volume field is required.",
        "number.base": "Volume field must contain only numbers.",
        "number.integer": "Volume field must contain only numbers.",
        "number.min": "Volume field must be at least 1 characters in length.",
        "number.max": `Volume field must be at least ${helpers_1.MAX_KB} characters in length.`,
    }),
    download_bandwidth: Joi.number()
        .integer()
        .min(0)
        .max(helpers_1.MAX_KB)
        .required()
        .messages({
        "any.required": "Download bandwidth field is required.",
        "number.base": "Download bandwidth field must contain only numbers.",
        "number.integer": "Download bandwidth field must contain only numbers.",
        "number.min": "Download bandwidth field must be at least 0 characters in length.",
        "number.max": `Download bandwidth field must be at least  ${helpers_1.MAX_KB} characters in length.`,
    }),
    upload_bandwidth: Joi.number()
        .integer()
        .min(0)
        .max(helpers_1.MAX_KB)
        .required()
        .messages({
        "any.required": "Upload bandwidth field is required.",
        "number.base": "Upload bandwidth field must contain only numbers.",
        "number.integer": "Upload bandwidth field must contain only numbers.",
        "number.min": "Upload bandwidth field must be at least 0 characters in length.",
        "number.max": `Upload bandwidth field must be at least  ${helpers_1.MAX_KB} characters in length.`,
    }),
    package_speed: Joi.string().required().messages({
        "any.required": "Package speed field is required.",
        "string.empty": "Package speed field is required.",
    }),
});
const internetPackageValidator = async (req, res, next) => {
    const { error } = internetPackageSchema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        const { details } = error;
        const data = (0, helpers_1.formatResponse)(400, false, (0, error_validator_response_1.errorValidatorResponse)(details), null);
        res.status(400).json(data);
        return;
    }
    next();
};
exports.internetPackageValidator = internetPackageValidator;
//# sourceMappingURL=add-internet-package.js.map