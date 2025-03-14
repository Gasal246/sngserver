"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const date_1 = __importDefault(require("@joi/date"));
const Joi = joi_1.default.extend(date_1.default);
const helpers_1 = require("../../helpers");
const error_validator_response_1 = require("../../helpers/error-validator-response");
const services_1 = require("../../services");
const updateProfileSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name field is required.",
        "string.empty": "Name field is required.",
    }),
    email: Joi.string().email().messages({
        "any.required": "Email field is required.",
        "string.email": "Email address is not in format.",
        "string.empty": "Email field is required.",
    }),
    age: Joi.number().integer().messages({
        "any.required": "The age field is required.",
        "number.base": "The age must contain only numbers.",
        "number.integer": "The age must contain only numbers.",
    }),
    gender: Joi.string().messages({
        "any.required": "Gender field is required.",
        "string.empty": "Gender field is required.",
    }),
    country_id: Joi.string().messages({
        "any.required": "Country id field is required.",
        "string.empty": "Country id field is required.",
    }),
    home_address: Joi.string().messages({
        "any.required": "Home address field is required.",
        "string.empty": "Home address field is required.",
    }),
    blood_group: Joi.string().messages({
        "any.required": "Blood group field is required.",
        "string.empty": "Blood group field is required.",
    }),
    company_name: Joi.string().messages({
        "any.required": "Company name field is required.",
        "string.empty": "Company name field is required.",
    }),
    job_title: Joi.string().messages({
        "any.required": "Job title field is required.",
        "string.empty": "Job title field is required.",
    }),
    passport_no: Joi.string().messages({
        "any.required": "Passport number field is required.",
        "string.empty": "Passport number field is required.",
    }),
    driver_licence_no: Joi.string().messages({
        "any.required": "Driving licence number field is required.",
        "string.empty": "Driving licence number field is required.",
    }),
    visa_number: Joi.string().messages({
        "any.required": "Visa number field is required.",
        "string.empty": "Visa number field is required.",
    }),
    national_id_type: Joi.string().messages({
        "any.required": "National id type field is required.",
        "string.empty": "National id type field is required.",
    }),
    building_no: Joi.string().messages({
        "any.required": "Building number field is required.",
        "string.empty": "Building number field is required.",
    }),
    room_no: Joi.string().messages({
        "any.required": "Room number field is required.",
        "string.empty": "Room number field is required.",
    }),
    block: Joi.string().messages({
        "any.required": "Block field is required.",
        "string.empty": "Block field is required.",
    }),
    block_building: Joi.string().messages({
        "any.required": "Block building is required.",
        "string.empty": "Block building is required.",
    }),
    floor_no: Joi.string().messages({
        "any.required": "Floor number is required.",
        "string.empty": "Floor number is required.",
    }),
});
const updateProfileValidator = async (req, res, next) => {
    try {
        await updateProfileSchema.validateAsync(req.body, { abortEarly: false });
        if (!req.body.email) {
            return next();
        }
        const isEmailInUse = await checkUniqueEmail(req);
        if (!isEmailInUse) {
            return next();
        }
        if (req.files.national_id && req.files.national_id.length) {
            const national_id = req.files.national_id[0];
            await (0, helpers_1.deleteFile)(helpers_1.userDir + national_id.filename);
        }
        if (req.files.user_image && req.files.user_image.length) {
            const user_image = req.files.user_image[0];
            await (0, helpers_1.deleteFile)(helpers_1.userDir + user_image.filename);
        }
        if (req.files.passport_image && req.files.passport_image.length) {
            const passport_image = req.files.passport_image[0];
            await (0, helpers_1.deleteFile)(helpers_1.userDir + passport_image.filename);
        }
        const data = (0, helpers_1.formatResponse)(400, true, { email: "The email field must contain a unique value." }, null);
        res.status(400).json(data);
        return;
    }
    catch (error) {
        const { details } = error;
        let errorObj = (0, error_validator_response_1.errorValidatorResponse)(details);
        if (req.body.email && !errorObj.email) {
            const isEmailInUse = await checkUniqueEmail(req);
            if (isEmailInUse) {
                errorObj = {
                    ...errorObj,
                    email: "The email field must contain a unique value.",
                };
            }
        }
        if (req.files.national_id && req.files.national_id.length) {
            const national_id = req.files.national_id[0];
            await (0, helpers_1.deleteFile)(helpers_1.userDir + national_id.filename);
        }
        if (req.files.user_image && req.files.user_image.length) {
            const user_image = req.files.user_image[0];
            await (0, helpers_1.deleteFile)(helpers_1.userDir + user_image.filename);
        }
        if (req.files.passport_image && req.files.passport_image.length) {
            const passport_image = req.files.passport_image[0];
            await (0, helpers_1.deleteFile)(helpers_1.userDir + passport_image.filename);
        }
        const data = (0, helpers_1.formatResponse)(400, true, errorObj, null);
        res.status(400).json(data);
        return;
    }
};
exports.updateProfileValidator = updateProfileValidator;
const checkUniqueEmail = async (req) => {
    return await services_1.userRegisterService.checkEmail(req.body.email, req.decodedToken.data.id);
};
//# sourceMappingURL=update-user-validator.js.map