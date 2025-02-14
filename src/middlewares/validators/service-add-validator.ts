import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";
import { errorValidatorResponse } from "../../helpers/error-validator-response";
import { formatResponse } from "../../helpers";

const addServiceSchema = Joi.object({
  service_name: Joi.string().required().messages({
    "any.required": "service_name is required.",
    "string.empty": "service_name is required."
  }),
  transaction_title: Joi.string().required().messages({
    "any.required": "transaction_title is required.",
    "string.empty": "transaction_title is required."
  })
});

const updateServiceSchema = Joi.object({
  service_id: Joi.string().required().messages({
    "any.required": "service_id is required."
  }),
  new_service_name: Joi.string().optional().messages({
    "string.empty": "new_service_name provide a complete string or null."
  }),
  new_transaction_name: Joi.string().optional().messages({
    "string.empty": "new_transaction_name provide a complete string or null."
  })
})

const deleteSchema = Joi.object({
  service_id: Joi.string().min(6).required().messages({
    "any.required": "service_id is required.",
    "string.empty": "your service id field must contain something.",
    "string.min": "we don't think this is an service id"
  }),
  status: Joi.number().max(1).required().messages({
    "any.required": "status is mandatory.",
    "number.min": "you should provide 0 / 1 as a number"
  })
})

export const serviceAddValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { error } = addServiceSchema.validate(req.body, { abortEarly: false });
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

export const serviceEditValidator = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
  const { error } = updateServiceSchema.validate(req.body, { abortEarly: false });
  if( error ) {
    const { details } = error;
    const data = formatResponse(400, true, errorValidatorResponse(details), null);
    res.status(400).json(data);
    return;
  }
  next();
};

export const serviceSoftDeleteValidator = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
  const { error } = deleteSchema.validate(req.body, { abortEarly: false });
  if( error ) {
    const { details } = error;
    const data = formatResponse(400, true, errorValidatorResponse(details), null);
    res.status(400).json(data);
    return;
  }
  next();
};