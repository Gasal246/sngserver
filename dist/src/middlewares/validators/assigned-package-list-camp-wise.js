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
exports.assignedPackageListCampWiseValidator = void 0;
const Joi = __importStar(require("joi"));
const helpers_1 = require("../../helpers");
const error_validator_response_1 = require("../../helpers/error-validator-response");
const assignedPackageListCampWiseSchema = Joi.object({
    camp_ids: Joi.string().required().messages({
        "any.required": "Camp id field is required.",
        "string.empty": "Camp id field is required.",
    }),
    status: Joi.number().integer().valid(0, 1, 2, 3).messages({
        "any.only": "The status field must be one of: 0,1,2,3.",
        "number.base": "The status field must be one of: 0,1,2,3.",
        "number.integer": "The status field must be one of: 0,1,2,3.",
    }),
});
const assignedPackageListCampWiseValidator = async (req, res, next) => {
    try {
        await assignedPackageListCampWiseSchema.validateAsync(req.query, {
            abortEarly: false,
        });
        const error = checkCampsIdArr(req);
        if (!error) {
            return next();
        }
        const data = (0, helpers_1.formatResponse)(400, true, { camp_ids: error }, null);
        res.status(400).json(data);
        return;
    }
    catch (error) {
        const { details } = error;
        let errorObj = (0, error_validator_response_1.errorValidatorResponse)(details);
        if (!errorObj.camp_ids) {
            const error = checkCampsIdArr(req);
            if (error) {
                errorObj = { ...errorObj, camp_ids: error };
            }
        }
        const data = (0, helpers_1.formatResponse)(400, true, errorObj, null);
        res.status(400).json(data);
        return;
    }
};
exports.assignedPackageListCampWiseValidator = assignedPackageListCampWiseValidator;
const checkCampsIdArr = (req) => {
    const camp_ids = req.query.camp_ids
        ? req.query.camp_ids.toString()
        : "";
    const regularExpression = new RegExp("^[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*$");
    if (!regularExpression.test(camp_ids)) {
        return "Camp ids required with out space and comma separated values";
    }
};
//# sourceMappingURL=assigned-package-list-camp-wise.js.map