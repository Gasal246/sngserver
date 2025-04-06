import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { investorAssignServiceChangeStatus } from "../../services/investor_assign_services";

export const investorServiceStatusChange = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { investor_service_id, status } = req.body;

    const result = await investorAssignServiceChangeStatus(
      investor_service_id,
      status
    );

    const data = formatResponse(
      200,
      false,
      "Status changed successfully",
      result
    );
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};
