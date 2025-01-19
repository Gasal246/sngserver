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
exports.addCountryValidator = void 0;
const Joi = __importStar(require("joi"));
const helpers_1 = require("../../helpers");
const error_validator_response_1 = require("../../helpers/error-validator-response");
const services_1 = require("../../services");
const countrySchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name field is required.",
        "string.empty": "Name field is required.",
    }),
    short_name: Joi.string().required().messages({
        "any.required": "Short name field is required.",
        "string.empty": "Short name field is required.",
    }),
    country_code: Joi.number().integer().required().messages({
        "any.required": "Country code field is required.",
        "string.empty": "Country code field is required.",
        "number.base": "Country code field must contain only numbers.",
        "number.integer": "Country code field must contain only numbers.",
    }),
    currency_code: Joi.string().required().messages({
        "any.required": "Currency code field is required.",
        "string.empty": "Currency code field is required.",
    }),
});
const addCountryValidator = async (req, res, next) => {
    try {
        await countrySchema.validateAsync(req.body, { abortEarly: false });
        let objUnique = await checkUniqueValidations(req);
        let errorObj = {};
        if (objUnique.name) {
            errorObj = { name: "The name field must contain a unique value." };
        }
        if (objUnique.short_name) {
            errorObj = {
                ...errorObj,
                short_name: "The short name field must contain a unique value.",
            };
        }
        if (objUnique.country_code) {
            errorObj = {
                ...errorObj,
                country_code: "The country code field must contain a unique value.",
            };
        }
        if (objUnique.currency_code) {
            errorObj = {
                ...errorObj,
                currency_code: "The currency code field must contain a unique value.",
            };
        }
        if (Object.keys(errorObj).length === 0 && errorObj.constructor === Object) {
            return next();
        }
        const data = (0, helpers_1.formatResponse)(400, true, errorObj, null);
        res.status(400).json(data);
        return;
    }
    catch (error) {
        const { details } = error;
        let getErrorObj = (0, error_validator_response_1.errorValidatorResponse)(details);
        let errorObj = {};
        errorObj.name = getErrorObj.name ? getErrorObj.name : "";
        errorObj.short_name = getErrorObj.short_name ? getErrorObj.short_name : "";
        errorObj.country_code = getErrorObj.country_code
            ? getErrorObj.country_code
            : "";
        errorObj.currency_code = getErrorObj.currency_code
            ? getErrorObj.currency_code
            : "";
        let objUnique = await checkUniqueValidations(req);
        if (objUnique.name) {
            errorObj.name = "The name field must contain a unique value.";
        }
        if (objUnique.short_name) {
            errorObj.short_name = "The short name field must contain a unique value.";
        }
        if (objUnique.country_code) {
            errorObj.country_code =
                "The country code field must contain a unique value.";
        }
        if (objUnique.currency_code) {
            errorObj.currency_code =
                "The currency code field must contain a unique value.";
        }
        for (const a in errorObj) {
            if (errorObj[a] === "") {
                delete errorObj[a];
            }
        }
        const data = (0, helpers_1.formatResponse)(400, true, errorObj, null);
        res.status(400).json(data);
        return;
    }
};
exports.addCountryValidator = addCountryValidator;
const checkUniqueValidations = async (req) => {
    const countryResponse = await checkUniqueCountriesData(req);
    const objUnique = {
        name: false,
        short_name: false,
        country_code: false,
        currency_code: false,
    };
    if (countryResponse) {
        if ((countryResponse === null || countryResponse === void 0 ? void 0 : countryResponse.name) == req.body.name) {
            objUnique.name = true;
        }
        if ((countryResponse === null || countryResponse === void 0 ? void 0 : countryResponse.short_name) == req.body.short_name) {
            objUnique.short_name = true;
        }
        if ((countryResponse === null || countryResponse === void 0 ? void 0 : countryResponse.country_code) == req.body.country_code) {
            objUnique.country_code = true;
        }
        if ((countryResponse === null || countryResponse === void 0 ? void 0 : countryResponse.currency_code) == req.body.currency_code) {
            objUnique.currency_code = true;
        }
    }
    return objUnique;
};
const checkUniqueCountriesData = async (req) => {
    return await services_1.countriesService.checkCountriesData(req.body, req.params && req.params.id ? req.params.id : undefined);
};
//# sourceMappingURL=add-countries.js.map