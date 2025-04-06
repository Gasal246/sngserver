import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import {
  createRevenueSchedule,
  isRevenueScheduleAlreadyAssigned,
  maximumAllowedRevenuePercentage,
} from "../../services/investor_revenue_schedule";
import { isInvestorServiceAlreadyAssigned } from "../../services/investor_assign_services";
import { isInvestorAssignedToCamp } from "../../services/investor_assign_camps";

export const addInvestorRevenueSchedule = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      investor_id,
      camp_id,
      service_id,
      revenue_percentage,
      start_date,
      end_date,
    } = req.body;

    const isExisting = await isRevenueScheduleAlreadyAssigned(
      investor_id,
      camp_id,
      service_id,
      revenue_percentage
    );
    if (isExisting) {
      const data = formatResponse(
        400,
        true,
        "Revenue Schedule already assigned",
        null
      );
      res.status(400).json(data);
      return;
    }

    const allowedRevenuePercent = await maximumAllowedRevenuePercentage(
      camp_id,
      service_id
    );
    if (allowedRevenuePercent < revenue_percentage) {
      const data = formatResponse(
        400,
        true,
        `You could only add percentage up to ${allowedRevenuePercent}`,
        null
      );
      res.status(400).json(data);
      return;
    }

    const isCampAssigned = await isInvestorAssignedToCamp(investor_id, camp_id);
    if (!isCampAssigned) {
      const data = formatResponse(
        400,
        true,
        "Camp not assigned to investor",
        null
      );
      res.status(400).json(data);
      return;
    }

    const serviceAssigned = await isInvestorServiceAlreadyAssigned(
      investor_id,
      service_id,
      camp_id
    );
    if (!serviceAssigned) {
      const data = formatResponse(
        400,
        true,
        "Service not assigned to investor in this camp",
        null
      );
      res.status(400).json(data);
      return;
    }

    const result = await createRevenueSchedule({
      investor_id,
      camp_id,
      service_id,
      revenue_percent: revenue_percentage,
      start_date,
      end_date,
    });
    const data = formatResponse(
      200,
      false,
      "Revenue Schedule added successfully",
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
