import { Request, Response } from "express";
import { campAssignAccountantService } from "../../services";
import { Message, createObjectId, formatResponse } from "../../helpers";
import { isValidObjectId } from "mongoose";

export const getAssignAccountant = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    const status = req.query.status ? req.query.status.toString() : "";
    const campId = req.query.camp_id?.toString();
    if (!campId || !isValidObjectId(campId)) {
      const data = formatResponse(400, true, Message.NOT_FOUND, null);
      res.status(400).json(data);
      return;
    }

    const assignData = await campAssignAccountantService.getCampAssignAccountantDetails(
        createObjectId(campId),
        status
    );
    if (!assignData || !assignData.length) {
      const data = formatResponse(400, true, Message.NOT_FOUND, null);
      res.status(400).json(data);
      return;
    }

    const data = formatResponse(200, false, "camp assign accountant details", {
      list: assignData,
    });
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};
