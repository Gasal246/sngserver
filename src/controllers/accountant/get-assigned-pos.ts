import { Request, Response } from "express";
import { createObjectId, formatResponse, Message } from "../../helpers";
import { isValidObjectId } from "mongoose";
import { campAssignAccountantService } from "../../services";
import { getDistinctPosByCampIds } from "../../services/camp_assign_pos";

export const accountantAssignPos = async (req: Request | any, res: Response) => {
  try {
    const accountantId = req.decodedToken.data.id;
    if (!accountantId || !isValidObjectId(accountantId)) {
      const data = formatResponse(400, true, Message.NOT_FOUND, null);
      res.status(400).json(data);
      return;
    }

    const assignedCamps = await campAssignAccountantService.getCampByAccountant(createObjectId(accountantId), "1");
    const campIds = assignedCamps.map((camp) => createObjectId(camp.camp_id));

    const distinctPos = await getDistinctPosByCampIds(campIds);

    const data = formatResponse(200, false, "Distinct Pos Fetched", { list: distinctPos });
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
