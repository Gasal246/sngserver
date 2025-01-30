import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { getInvestorAssignedCampsList } from "../../services/investor_assign_camps";

export const getInvestorAssignedCamps = async (req: Request, res: Response) => {
  try {
    const status = (req.query?.status as string) || "active";
    const investorId = req.params.investorId;

    if (!investorId) {
      const data = formatResponse(
        500,
        true,
        "Investor Id is not found in params",
        null
      );
      res.status(500).json(data);
      return;
    }

    const list = await getInvestorAssignedCampsList(investorId, status);
    const investor_data = list?.length > 0 ? list[0].investor : null;
    const camp_list = list.map((data: any) => data.camp_data);
    const result = {
      investor_data,
      camp_list: camp_list || [],
    };
    const data = formatResponse(
      200,
      false,
      "Invester Camps Successfully fetched!",
      result
    );
    res.status(200).json(data);
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
