import { Request, Response } from "express";
import {
  Message,
  formatResponse,
  parseToSimpleObj,
  validPassword,
} from "../../helpers";

export const posCheckin = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};
