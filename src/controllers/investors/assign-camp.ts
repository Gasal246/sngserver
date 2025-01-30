import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { createInvestorAssignCampDocument } from "../../services/investor_assign_camps";

export const assignCampToInvestor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const campIds = req.body.camp_id ? req.body.camp_id.split(",") : [];

    const documentPromises = campIds.map((campId: string) =>
      createInvestorAssignCampDocument(req.body.investor_id, campId)
    );

    const addedDocuments = await Promise.all(documentPromises);

    const data = formatResponse(
      200,
      false,
      "Camp Successfully Assigned!",
      addedDocuments
    );
    res.status(200).json(data);
  } catch (error: any) {
    const data = formatResponse(
      500,
      true,
      error.message || "An unexpected error occurred",
      null
    );
    res.status(500).json(data);
  }
};
