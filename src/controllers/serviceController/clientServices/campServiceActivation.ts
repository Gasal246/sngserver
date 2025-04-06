import { formatResponse } from "../../../helpers";
import { Request, Response } from "express";
import {
  changeStatusOfService,
  isCampAssignServiceAlreadyExistById,
} from "../../../services/camp_assign_services";

export const activateCampAssignedService = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { id, status } = req.body;

    const alreadyAssigned = await isCampAssignServiceAlreadyExistById(id);
    if (!alreadyAssigned) {
      const data = formatResponse(
        400,
        true,
        "Service not found for camp",
        null
      );
      res.status(400).json(data);
      return;
    }

    const updated = await changeStatusOfService(id, status);
    const data = formatResponse(
      200,
      false,
      "assigned service: status updated!",
      updated
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    console.log(error);
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
