import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { formatResponse } from "../../helpers";
import { errorValidatorResponse } from "../../helpers/error-validator-response";

const getCampWiseSalesDataSchema = Joi.object({
  sd: Joi.date().required().messages({
    "any.required": "Start date is required.",
    "string.empty": "Start date is required.",
  }),
  ed: Joi.date().required().messages({
    "any.required": "End date is required.",
    "string.empty": "End date is required.",
  }),
  status: Joi.number().optional().min(0).max(1).messages({
    "any.required": "Status is required.",
    "string.empty": "Status is required.",
  }),
});

const getCampSalesDataSchema = Joi.object({
  sd: Joi.date().required().messages({
    "any.required": "Start date is required.",
    "string.empty": "Start date is required.",
  }),
  ed: Joi.date().required().messages({
    "any.required": "End date is required.",
    "string.empty": "End date is required.",
  }),
  campId: Joi.string().required().messages({
    "any.required": "Camp id is required.",
    "string.empty": "Camp id is required.",
  }),
});

const getServiceSalesDataSchema = Joi.object({
  sd: Joi.date().required().messages({
    "any.required": "Start date is required.",
    "string.empty": "Start date is required.",
  }),
  ed: Joi.date().required().messages({
    "any.required": "End date is required.",
    "string.empty": "End date is required.",
  }),
  serviceId: Joi.string().required().messages({
    "any.required": "Service id is required.",
    "string.empty": "Service id is required.",
  }),
});

export const getCampWiseSalesDataValidator = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await getCampWiseSalesDataSchema.validateAsync(req.query, {
      abortEarly: false,
    });
    next();
  } catch (error: any) {
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
};

export const getCampSalesDataValidator = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await getCampSalesDataSchema.validateAsync(req.query, {
      abortEarly: false,
    });
    next();
  } catch (error: any) {
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
};

export const getServiceSalesDataValidator = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await getServiceSalesDataSchema.validateAsync(req.query, {
      abortEarly: false,
    });
    next();
  } catch (error: any) {
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
};
