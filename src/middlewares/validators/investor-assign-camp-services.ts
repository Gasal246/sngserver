import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { errorValidatorResponse } from "../../helpers/error-validator-response";
import { formatResponse } from "../../helpers";

const investorAssignCampServiceSchema = Joi.object({
  camp_id: Joi.string().required().messages({
    "any.required": "Camp id is required.",
    "string.empty": "Camp id is required.",
  }),
  service_id: Joi.string().required().messages({
    "any.required": "Service id is required.",
    "string.empty": "Service id is required.",
  }),
  investor_id: Joi.string().required().messages({
    "any.required": "Investor id is required.",
    "string.empty": "Investor id is required.",
  }),
});

const getInvestorAssignedServicesSchema = Joi.object({
  investorId: Joi.string().required().messages({
    "any.required": "Investor id is required.",
    "string.empty": "Investor id is required.",
  }),
  campId: Joi.string().required().messages({
    "any.required": "Camp id is required.",
    "string.empty": "Camp id is required.",
  }),
});

const investorServiceStatusChangeSchema = Joi.object({
  investor_service_id: Joi.string().required().messages({
    "any.required": "Investor service id is required.",
    "string.empty": "Investor service id is required.",
  }),
  status: Joi.number().required().messages({
    "any.required": "Status is required.",
    "number.empty": "Status is required.",
    "number.base": "Status must contain only numbers.",
  }),
});

export const investorAssignCampServiceValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = investorAssignCampServiceSchema.validate(req.body);
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

export const getInvestorAssignedServicesParamsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = getInvestorAssignedServicesSchema.validate(req.params);
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

export const investorServiceStatusChangeValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = investorServiceStatusChangeSchema.validate(req.body);
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
