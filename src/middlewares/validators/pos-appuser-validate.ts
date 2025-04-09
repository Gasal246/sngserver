import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { formatResponse } from "../../helpers";
import { errorValidatorResponse } from "../../helpers/error-validator-response";

const posAppUserUpdateSchema = Joi.object({
    user_id: Joi.string().required().messages({
        "any.required": "User id is required.",
        "string.empty": "User id is required.",
    }),
    email: Joi.string().email().optional().messages({
        "any.required": "Email is required.",
        "string.empty": "Email is required.",
    }),
    gender: Joi.string().optional().messages({
        "any.required": "Gender is required.",
        "string.empty": "Gender is required.",
    }),
    dob: Joi.date().optional().messages({
        "any.required": "Date of birth is required.",
        "string.empty": "Date of birth is required.",
    }),
    blood_group: Joi.string().optional().messages({
        "any.required": "Blood group is required.",
        "string.empty": "Blood group is required.",
    }),
    national_id: Joi.string().optional().messages({
        "any.required": "National id is required.",
        "string.empty": "National id is required.",
    }),
    passport_no: Joi.string().optional().messages({
        "any.required": "Passport number is required.",
        "string.empty": "Passport number is required.",
    }),
    job_title: Joi.string().optional().messages({
        "any.required": "Job title is required.",
        "string.empty": "Job title is required.",
    }),
    company_name: Joi.string().optional().messages({
        "any.required": "Company name is required.",
        "string.empty": "Company name is required.",
    }),
    home_address: Joi.string().optional().messages({
        "any.required": "Home address is required.",
        "string.empty": "Home address is required.",
    }),
    block: Joi.string().optional().messages({
        "any.required": "Block is required.",
        "string.empty": "Block is required.",
    }),
    block_building: Joi.string().optional().messages({
        "any.required": "Block building is required.",
        "string.empty": "Block building is required.",
    }),
    floor_no: Joi.string().optional().messages({
        "any.required": "Floor number is required.",
        "string.empty": "Floor number is required.",
    }),
    building_no: Joi.string().optional().messages({
        "any.required": "Building number is required.",
        "string.empty": "Building number is required.",
    }),
    room_no: Joi.string().optional().messages({
        "any.required": "Room number is required.",
        "string.empty": "Room number is required.",
    }),
});

export const posAppUserUpdateValidator = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        await posAppUserUpdateSchema.validateAsync(req.body, {
            abortEarly: false,
        });
        next();
    } catch (error: any) {
        const { details } = error;
        const data = formatResponse( 400, true, errorValidatorResponse(details), null );
        res.status(400).json(data);
        return;
    }
};
