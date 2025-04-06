import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";
import { errorValidatorResponse } from "../../helpers/error-validator-response";
import { formatResponse } from "../../helpers";

// validation schemas
const addCampAssignedServiceSchema = Joi.object({
  service_id: Joi.string().required().messages({
    "any.required": "Service id is required.",
    "string.empty": "Service id is required.",
  }),
  camp_id: Joi.string().required().messages({
    "any.required": "Camp id is required.",
    "string.empty": "Camp id is required.",
  }),
});

const activateCampAssignedServiceSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "id is required.",
    "string.empty": "id is required.",
  }),
  status: Joi.number().required().messages({
    "any.required": "Status is required.",
    "number.empty": "Status is required.",
  }),
});

// validator functions
export const addCampAssignedServiceValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = addCampAssignedServiceSchema.validate(req.body);
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

export const activateCampAssignedServiceValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = activateCampAssignedServiceSchema.validate(req.body);
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
