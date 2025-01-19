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
exports.assignClientValidator = void 0;
const Joi = __importStar(require("joi"));
const helpers_1 = require("../../helpers");
const error_validator_response_1 = require("../../helpers/error-validator-response");
const assignClientSchema = Joi.object({
    client_ids: Joi.string().required().messages({
        "any.required": "Client id field is required.",
        "string.empty": "Client id field is required.",
    }),
    internet_package_id: Joi.string().required().messages({
        "any.required": "Internet package id field is required.",
        "string.empty": "Internet package id field is required.",
    }),
});
const assignClientValidator = async (req, res, next) => {
    try {
        await assignClientSchema.validateAsync(req.body, { abortEarly: false });
        const error = checkClientIdArr(req);
        if (!error) {
            return next();
        }
        const data = (0, helpers_1.formatResponse)(400, false, { camp_ids: error }, null);
        res.status(400).json(data);
        return;
    }
    catch (error) {
        const { details } = error;
        let errorObj = (0, error_validator_response_1.errorValidatorResponse)(details);
        if (!errorObj.client_ids) {
            const error = checkClientIdArr(req);
            if (error) {
                errorObj = { ...errorObj, client_ids: error };
            }
        }
        const data = (0, helpers_1.formatResponse)(400, false, errorObj, null);
        res.status(400).json(data);
        return;
    }
};
exports.assignClientValidator = assignClientValidator;
const checkClientIdArr = (req) => {
    const regularExpression = new RegExp("^[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*$");
    if (!regularExpression.test(req.body.client_ids)) {
        return "Client ids required with out space and comma separated values";
    }
};
//# sourceMappingURL=assign-clients.js.map