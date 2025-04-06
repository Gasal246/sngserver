import { Request, Response } from "express";
import { createObjectId, formatResponse } from "../../helpers";
import { getInvestorByIdOnly } from "../../services/investors";
import { isInvestorServiceAlreadyAssigned } from "../../services/investor_assign_services";
import { getCampUsers } from "../../services/user_camp";
import { getOrdersByUserIdsandCamp } from "../../services/order_internet_package";
import { getServiceByName } from "../../services/services";

export const getInvestorMembershipUsers = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { campId } = req.params;
    const investorId = req.decodedToken?.data?.id;

    const investor = await getInvestorByIdOnly(investorId);
    if (!investor) {
      const data = formatResponse(404, true, "Investor not found", null);
      res.status(404).json(data);
      return;
    }

    // GET SERVICE BY NAME:
    // 'The service id may varry by some reasons so if the name of service is changing you should update it in src/services/services.ts line:156'
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

    const isServiceAssignedToInvestor = await isInvestorServiceAlreadyAssigned(
      investorId,
      service._id.toString(),
      campId
    );
    if (!isServiceAssignedToInvestor) {
      const data = formatResponse(
        404,
        true,
        "Service not assigned to investor in this camp",
        null
      );
      res.status(404).json(data);
      return;
    }

    const campUsers = await getCampUsers(campId);

    const activeOrdersByCampUsers = await getOrdersByUserIdsandCamp(
      campUsers.map((data: any) => createObjectId(data?.user_data?.id)),
      createObjectId(campId)
    );
    const activePlanUsers = new Set<string>();
    activeOrdersByCampUsers.map((data: any) =>
      activePlanUsers.add(data?.user_id?.toString())
    );

    const activeUsers = campUsers.filter((data: any) =>
      activePlanUsers.has(data?.user_id?.toString())
    );
    const inactiveUsers = campUsers.filter(
      (data: any) => !activePlanUsers.has(data?.user_id?.toString())
    );

    const data = formatResponse(200, false, "Camp users fetched", {
      activeUsers,
      inactiveUsers,
    });
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
