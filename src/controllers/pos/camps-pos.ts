import { Request, Response } from "express";
import { createObjectId, formatResponse, Message } from "../../helpers";
import { CampAssignPosService } from "../../services";
import mongoose from "mongoose";

export const getPosListByCampId = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    // console.log("Hello There")
    const campid = req.params.camp_id;
    const count = req.query.count;
    const pos = req.query.pos as string | undefined;

    if (pos) {
      const result = await CampAssignPosService.isCampAssignToPos(pos, campid);
      if (!result) {
        const data = formatResponse(401, true, Message.POS_CAMP_NOT_AUT, null);
        res.status(401).json(data);
        return;
      } else {
        const data = formatResponse(200, false, "Access Authorized!", null);
        res.status(200).json(data);
        return;
      }
    }

    const posList = await CampAssignPosService.getCampAssignPosDetails(
      new mongoose.Types.ObjectId(campid),
      "1",
      count?.toString()
    );
    const data = formatResponse(200, false, "Success", posList);
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};
