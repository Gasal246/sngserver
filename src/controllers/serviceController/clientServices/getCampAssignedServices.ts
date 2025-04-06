import {
  formatResponse,
  hasDuplicate,
  removeDuplicates,
} from "../../../helpers";
import { Request, Response } from "express";
import { getServiceListOfCampIds } from "../../../services/camp_assign_services";

export const getCampAssignedServices = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { camp_ids: ids, status } = req.query;
    if (!ids) {
      const data = formatResponse(400, true, "Ids required", null);
      res.status(400).json(data);
      return;
    }
    const campIds = removeDuplicates(ids.toString().split(","));
    if (campIds.length === 0) {
      const data = formatResponse(
        400,
        true,
        "You have selected invalid ids",
        null
      );
      res.status(400).json(data);
      return;
    }
    const { data: clientData } = req.decodedToken;
    const services = await getServiceListOfCampIds(
      campIds,
      status ? status.toString() : 1
    );
    const data = formatResponse(200, false, "Services fetched successfully.", {
      list: services,
    });
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
