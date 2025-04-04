import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { formatResponse } from "../../helpers";
import { errorValidatorResponse } from "../../helpers/error-validator-response";
import { investorsService } from "../../services";

const investorsSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email field is required.",
    "string.empty": "Email field is required.",
    "string.email": "Email address is not in format.",
  }),

  password: Joi.string().min(8).required().messages({
    "any.required": "Password field is required.",
    "string.empty": "Password field is required.",
    "string.min": "The password field must be at least 8 characters in length.",
  }),

  full_name: Joi.string().required().messages({
    "any.required": "Full name field is required.",
    "string.empty": "Full name field is required.",
  }),
});

const assignInvestorCampSchema = Joi.object({
  camp_id: Joi.string().required().messages({
    "any.required": "Camp Id field is required.",
    "string.empty": "Camp Id field is required.",
  }),

  investor_id: Joi.string().required().messages({
    "any.required": "Investor Id field is required.",
    "string.empty": "Investor Id field is required.",
  }),
});

export const addInvestorValidator = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await investorsSchema.validateAsync(req.body, { abortEarly: false });

    const isEmailInUse = await checkUniqueEmail(req);
    if (!isEmailInUse) {
      return next();
    }
    const data = formatResponse(
      400,
      true,
      { email: "The email field must contain a unique value." },
      null
    );
    res.status(400).json(data);
    return;
  } catch (error: any) {
    const { details } = error;

    let errorObj = errorValidatorResponse(details);
    if (!errorObj.email) {
      const isEmailInUse = await checkUniqueEmail(req);
      if (isEmailInUse) {
        errorObj = {
          email: "The email field must contain a unique value.",
          ...errorObj,
        };
      }
    }

    const data = formatResponse(400, true, errorObj, null);
    res.status(400).json(data);
    return;
  }
};

export const assignInvestorCampValidator = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await assignInvestorCampSchema
      .validateAsync(req.body, { abortEarly: false })
      .then(() => {
        next();
      });
  } catch (error: any) {
    const { details } = error;
    let errorObj = errorValidatorResponse(details);
    const data = formatResponse(400, true, errorObj, null);
    res.status(400).json(data);
    return;
  }
};

const checkUniqueEmail = async (req: Request | any) => {
  return await investorsService.checkEmail(
    req.body.email,
    req.params && req.params.id ? req.params.id : undefined
  );
};
