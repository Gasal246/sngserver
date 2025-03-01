import { Request, Response } from "express";
import { CampAssignPosService } from "../../services";
import { Message, createObjectId, formatResponse } from "../../helpers";
import { isValidObjectId } from "mongoose";

export const getAssignPos = async (
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

    const assignData = await CampAssignPosService.getCampAssignPosDetails(
      createObjectId(campId),
      status
    );
    if (!assignData || !assignData.length) {
      const data = formatResponse(400, true, Message.NOT_FOUND, null);
      res.status(400).json(data);
      return;
    }

    const data = formatResponse(200, false, "camp assign pos details", {
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
