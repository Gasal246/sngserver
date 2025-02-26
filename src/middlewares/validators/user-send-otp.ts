import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { formatResponse } from "../../helpers";
import { errorValidatorResponse } from "../../helpers/error-validator-response";

const userSendOtpSchema = Joi.object({
  mobile: Joi.number().required().integer().messages({
    "any.required": "Mobile field is required.",
    "number.base": "Mobile field must contain only numbers.",
    "number.integer": "Mobile field must contain only numbers.",
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
});

const userSendMobileChangeOtpSchema = Joi.object({
  mobile: Joi.number().required().integer().messages({
    "any.required": "Mobile field is required.",
    "number.base": "Mobile field must contain only numbers.",
    "number.integer": "Mobile field must contain only numbers.",
  }),
  country_code: Joi.number().integer().required().messages({
    "any.required": "Country code field is required.",
    "number.base": "Country code field must contain only numbers.",
    "number.integer": "Country code field must contain only numbers.",
  }),
});

const userMobileChangeVerificationSchema = Joi.object({
  otp: Joi.number().required().integer().messages({
    "any.required": "Otp field is required.",
    "number.base": "Otp field must contain only numbers.",
    "number.integer": "Otp field must contain only numbers.",
  }),
  mobile: Joi.number().integer().required().messages({
    "any.required": "Mobile field is required.",
    "number.base": "Mobile field must contain only numbers.",
    "number.integer": "Mobile field must contain only numbers.",
  }),
  country_code: Joi.number().integer().required().messages({
    "any.required": "Country code field is required.",
    "number.base": "Country code field must contain only numbers.",
    "number.integer": "Country code field must contain only numbers.",
  }),
});

export const userSendOtpValidator = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { error } = userSendOtpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const { details } = error;
    const data = formatResponse(
      400,
      true,
      errorValidatorResponse(details),
      null
    );
    res.status(400).json(data);
    return;
  }

  next();
};


export const userSendMobileChangeOtpValidator = async (
  req: Request | any, 
  res: Response,
  next: NextFunction
) => {
  const { error } = userSendMobileChangeOtpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const { details } = error;
    const data = formatResponse(
      400,
      true,
      errorValidatorResponse(details),
      null
    );
    res.status(400).json(data);
    return;
  }

  next();
}

export const userMobileNumberChangeVerificationValidator = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { error } = userMobileChangeVerificationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const { details } = error;
    const data = formatResponse(
      400,
      true,
      errorValidatorResponse(details),
      null
    );
    res.status(400).json(data);
    return;
  }

  next();
}
