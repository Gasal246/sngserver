import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";
import { errorValidatorResponse } from "../../helpers/error-validator-response";
import { formatResponse } from "../../helpers";

const addServiceSchema = Joi.object({
  service_name: Joi.string().required().messages({
    "any.required": "service_name is required.",
  }),
  transaction_title: Joi.string().required().messages({
    "any.required": "transaction_title is required."
  })
});

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
