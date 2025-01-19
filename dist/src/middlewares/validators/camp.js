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
exports.campValidator = void 0;
const Joi = __importStar(require("joi"));
const helpers_1 = require("../../helpers");
const error_validator_response_1 = require("../../helpers/error-validator-response");
const services_1 = require("../../services");
const addCampSchema = Joi.object({
    camp_name: Joi.string().required().messages({
        "any.required": "Camp name is required.",
    }),
    camp_address: Joi.string().required().messages({
        "any.required": "Camp address is required.",
    }),
    camp_city: Joi.string().required().messages({
        "any.required": "Camp city is required.",
    }),
    router_primary_ip: Joi.string().required().messages({
        "any.required": "Router primary ip is required.",
    }),
    no_of_allowed_user: Joi.number().integer().required().messages({
        "any.required": "The number of allowed user field is required.",
        "number.base": "The  number of allowed field must contain only numbers.",
        "number.integer": "The  number of allowed user field must contain only numbers.",
    }),
    no_of_allowed_kiosk: Joi.number().integer().required().messages({
        "any.required": "The number of allowed kiosk field is required.",
        "number.base": "The  number of allowed kiosk field must contain only numbers.",
        "number.integer": "The number of allowed kiosk field must contain only numbers.",
    }),
    no_of_allowed_account: Joi.number().integer().required().messages({
        "any.required": "The number of allowed account field is required.",
        "number.base": "The number of allowed account field must contain only numbers.",
        "number.integer": "The number of allowed account field must contain only numbers.",
    }),
    no_of_allowed_coordinators: Joi.number().integer().required().messages({
        "any.required": "The number of allowed coordinator field is required.",
        "number.base": "The number of allowed coordinator field must contain only numbers.",
        "number.integer": "The number of allowed coordinator field must contain only numbers.",
    }),
    is_allowed_package_meal: Joi.number()
        .integer()
        .valid(0, 1)
        .required()
        .messages({
        "any.required": "The allowed package meal field is required.",
        "any.only": "The allowed package meal field must be one of:0 = NO,1 = Yes",
        "number.base": "The allowed package meal field must be one of:0 = NO,1 = Yes",
        "number.integer": "The allowed package meal field must be one of:0 = NO,1 = Yes.",
    }),
    is_allowed_package_water: Joi.number()
        .integer()
        .valid(0, 1)
        .required()
        .messages({
        "any.required": "The  allowed package water field is required.",
        "any.only": "The  allowed package water field must be one of:0 = NO,1 = Yes",
        "number.base": "The  allowed package water field must be one of:0 = NO,1 = Yes",
        "number.integer": "The is allowed package water field must be one of:0 = NO,1 = Yes.",
    }),
    is_allowed_package_internet: Joi.number()
        .integer()
        .valid(0, 1)
        .required()
        .messages({
        "any.required": "The  allowed package internet field is required.",
        "any.only": "The allowed package internet field must be one of:0 = NO,1 = Yes",
        "number.base": "The allowed package internet field must be one of:0 = NO,1 = Yes",
        "number.integer": "The allowed package internet field must be one of:0 = NO,1 = Yes.",
    }),
    site: Joi.string().valid("global", "local").required().messages({
        "any.required": "The site field is required.",
        "any.only": "The site field must be one of: global,local.",
    }),
    router_mac_address: Joi.string().required().messages({
        "any.required": "router mack address is required.",
    }),
    router_ssid: Joi.string().messages({
        "string.base": "router ssid must be string.",
    }),
    router_secondary_ip: Joi.string().messages({
        "string.base": "router secondary ip must be string.",
    }),
    router_pass: Joi.string().messages({
        "string.base": "router password must be string.",
    }),
    router_secret: Joi.string().messages({
        "string.base": "router secret must be string.",
    }),
    router_alias: Joi.string().messages({
        "string.base": "router alias must be string.",
    }),
    router_hostname: Joi.string().messages({
        "string.base": "router hostname must be string.",
    }),
    camp_uuid: Joi.string().messages({
        "string.base": "camp uuid must be string.",
    }),
});
const campValidator = async (req, res, next) => {
    try {
        await addCampSchema.validateAsync(req.body, { abortEarly: false });
        const isCampNameInUse = await checkUniqueCampName(req);
        if (!isCampNameInUse) {
            return next();
        }
        const data = (0, helpers_1.formatResponse)(400, true, { camp_name: "The camp_name field must contain a unique value." }, null);
        res.status(400).json(data);
        return;
    }
    catch (error) {
        const { details } = error;
        let errorObj = (0, error_validator_response_1.errorValidatorResponse)(details);
        if (!errorObj.camp_name) {
            const isCampNameInUse = await checkUniqueCampName(req);
            if (isCampNameInUse) {
                errorObj = {
                    camp_name: "The camp_name field must contain a unique value.",
                    ...errorObj,
                };
            }
        }
        const data = (0, helpers_1.formatResponse)(400, true, errorObj, null);
        res.status(400).json(data);
        return;
    }
};
exports.campValidator = campValidator;
const checkUniqueCampName = async (req) => {
    return await services_1.campService.checkCampName(req.body.camp_name, req.params && req.params.id ? req.params.id : undefined);
};
//# sourceMappingURL=camp.js.map