import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import {
  removeInvestorAssignedCampId,
  restoreDeletedInvestorCampId,
} from "../../services/investor_assign_camps";

export const RemoveInvestorAssignedCamp = async (
  req: Request,
  res: Response
) => {
  try {
    const { investor_id, camp_id } = req.body;
    const result = await removeInvestorAssignedCampId(investor_id, camp_id);
    const data = formatResponse(
      200,
      false,
      "Assigned Camp Soft Deleted!",
      result
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};

export const RecoverInvestorAssignCamp = async (
  req: Request,
  res: Response
) => {
  try {
    const { investor_id, camp_id } = req.body;
    const result = await restoreDeletedInvestorCampId(investor_id, camp_id);
    const data = formatResponse(
      200,
      false,
      "Restored Camp To Investor!",
      result
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
