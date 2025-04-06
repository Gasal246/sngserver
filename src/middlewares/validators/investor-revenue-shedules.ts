import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { formatResponse } from "../../helpers";
import { errorValidatorResponse } from "../../helpers/error-validator-response";

const addInvestorRevenueSchedule = Joi.object({
  investor_id: Joi.string().required().messages({
    "any.required": "Investor id is required.",
    "string.empty": "Investor id is required.",
  }),
  camp_id: Joi.string().required().messages({
    "any.required": "Camp id is required.",
    "string.empty": "Camp id is required.",
  }),
  service_id: Joi.string().required().messages({
    "any.required": "Service id is required.",
    "string.empty": "Service id is required.",
  }),
  start_date: Joi.date().required().messages({
    "any.required": "Start date is required.",
  }),
  end_date: Joi.optional().messages({
    "any.required": "End date is optional.",
  }),
  revenue_percentage: Joi.number().required().messages({
    "any.required": "Revenue percentage is required.",
    "number.empty": "Revenue percentage is required.",
    "number.base": "Revenue percentage must contain only numbers.",
  }),
});

const getInvestorRevenueSchedule = Joi.object({
  investorId: Joi.string().required().messages({
    "any.required": "Investor id is required.",
    "string.empty": "Investor id is required.",
  }),
  campId: Joi.string().required().messages({
    "any.required": "Camp id is required.",
    "string.empty": "Camp id is required.",
  }),
  serviceId: Joi.string().required().messages({
    "any.required": "Service id is required.",
    "string.empty": "Service id is required.",
  }),
});

const editInvestorRevenueSchedule = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "id is required.",
    "string.empty": "id is required.",
  }),
  investor_id: Joi.string().required().messages({
    "any.required": "Investor id is required.",
    "string.empty": "Investor id is required.",
  }),
  camp_id: Joi.string().required().messages({
    "any.required": "Camp id is required.",
    "string.empty": "Camp id is required.",
  }),
  start_date: Joi.date().required().messages({
    "any.required": "Start date is required.",
  }),
  end_date: Joi.optional().messages({
    "any.required": "End date is optional.",
  }),
  revenue_percentage: Joi.number().required().messages({
    "any.required": "Revenue percentage is required.",
    "number.empty": "Revenue percentage is required.",
    "number.base": "Revenue percentage must contain only numbers.",
  }),
});

export const validateGetInvestorRevenueSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = getInvestorRevenueSchedule.validate(req.params);
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

export const addInvestorRevenueSheduleValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = addInvestorRevenueSchedule.validate(req.body);
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

export const validateEditInvestorRevenueSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = editInvestorRevenueSchedule.validate(req.body);
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
