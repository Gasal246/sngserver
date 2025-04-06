import { formatResponse } from "../../helpers";
import { Request, Response } from "express";
import {
  getRevenueScheduleById,
  maximumAllowedRevenuePercentage,
  updateRevenueSchedule,
} from "../../services/investor_revenue_schedule";

export const editInvestorRevenueSchedule = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      id,
      investor_id,
      camp_id,
      service_id,
      revenue_percent,
      start_date,
      end_date,
    } = req.body;

    const schedule = await getRevenueScheduleById(id);
    const allowedPercent = await maximumAllowedRevenuePercentage(
      camp_id,
      service_id
    );
    const allowedUpdatePercent =
      allowedPercent + (schedule?.revenue_percent as number);

    if (allowedUpdatePercent < revenue_percent) {
      const data = formatResponse(
        400,
        true,
        `You could only add percentage up to ${allowedUpdatePercent}`,
        null
      );
      res.status(400).json(data);
      return;
    }

    const upadated = await updateRevenueSchedule(id, {
      investor_id,
      camp_id,
      service_id,
      revenue_percent,
      start_date,
      end_date,
    });

    const data = formatResponse(
      200,
      false,
      "Revenue schedule updated successfully",
      upadated
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(
      500,
      true,
      error.message || "An unexpected error occurred",
      null
    );
    res.status(500).json(data);
    return;
  }
};
