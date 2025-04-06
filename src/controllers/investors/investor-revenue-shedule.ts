import { formatResponse } from "../../helpers";
import { Request, Response } from "express";
import { getInvestorByInvestorId } from "../../services/investors";
import { getCampById } from "../../services/camp";
import { isInvestorServiceAlreadyAssigned } from "../../services/investor_assign_services";
import { getServiceById } from "../../services/services";
import { getInvestorRevenueScheduleList } from "../../services/investor_revenue_schedule";

export const getClientInvestorRevenueSchedule = async (
  req: Request,
  res: Response
) => {
  try {
    const { investorId, campId, serviceId } = req.params;
    const { status } = req.query;

    const investor_data = await getInvestorByInvestorId(investorId);
    if (!investor_data) {
      const data = formatResponse(404, true, "Investor not found", null);
      res.status(404).json(data);
      return;
    }

    const camp_data = await getCampById(campId);
    if (!camp_data) {
      const data = formatResponse(404, true, "Camp not found", null);
      res.status(404).json(data);
      return;
    }

    const service_assigned = await isInvestorServiceAlreadyAssigned(
      investorId,
      serviceId,
      campId
    );
    if (!service_assigned) {
      const data = formatResponse(
        404,
        true,
        "Service not assigned to investor in this camp",
        null
      );
      res.status(404).json(data);
      return;
    }

    const service_data = await getServiceById(serviceId);
    if (!service_data) {
      const data = formatResponse(404, true, "Service not found", null);
      res.status(404).json(data);
      return;
    }

    const list = await getInvestorRevenueScheduleList(
      investorId,
      campId,
      serviceId
    );

    const data = formatResponse(
      200,
      false,
      "Revenue schedule fetched successfully",
      {
        list,
        investor_data,
        camp_data,
        service_data,
      }
    );
    res.status(200).json(data);
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
