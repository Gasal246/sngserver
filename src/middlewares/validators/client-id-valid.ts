import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { Message, formatResponse } from "../../helpers";
import { clientService } from "../../services";

export const isClientIdIsExists = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.params.id || !isValidObjectId(req.params.id)) {
    const data = formatResponse(400, true, Message.NOT_FOUND, null);
    res.status(400).json(data);
    return;
  }

  const isIdAvailable = await clientService.getClientById(req.params.id);
  if (!isIdAvailable) {
    const data = formatResponse(400, true, Message.NOT_FOUND, null);
    res.status(400).json(data);
    return;
  }

  next();
};
