import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { getInvestorAssignedCampsList } from "../../services/investor_assign_camps";
import { isInvestorServiceAlreadyAssigned } from "../../services/investor_assign_services";
import { getCampsAssignedToService } from "../../services/camp_assign_services";
import { getInvestorByIdOnly } from "../../services/investors";
import { getServiceByName } from "../../services/services";

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

export const getInvestorMembershipAssignedCamps = async (
  req: Request | any,
  res: Response
) => {
  try {
    const investorId = req.decodedToken?.data?.id;
    const investor = await getInvestorByIdOnly(investorId);

    if (!investor) {
      const data = formatResponse(400, true, "investor not found", null);
      res.status(400).json(data);
      return;
    }

    const service = await getServiceByName("Membership");
    if (!service) {
      const data = formatResponse(
        500,
        true,
        "Server Side Error, Service Not Found",
        null
      );
      res.status(500).json(data);
      return;
    }

    const assignedCamps = await getInvestorAssignedCampsList(investorId);
    const investor_camps = assignedCamps?.map((camp: any) => camp?.camp_data);

    const client_camps_with_service_id = await getCampsAssignedToService(
      service._id.toString(),
      investor?.client_id!?.toString()
    );
    const service_id_camps = client_camps_with_service_id.map(
      (camp: any) => camp.camp_id
    );

    const filtered_camps = service_id_camps?.filter((camp: any) =>
      investor_camps?.some(
        (incamp: any) => incamp._id?.toString() === camp._id?.toString()
      )
    );

    const data = formatResponse(
      200,
      false,
      "investor camps fetched",
      filtered_camps
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
