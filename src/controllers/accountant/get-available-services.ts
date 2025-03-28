import { Request, Response } from "express";
import { createObjectId, formatResponse, Message } from "../../helpers";
import { campAssignAccountantService } from "../../services";
import { getDistinctServiceByCampIds } from "../../services/camp_assign_services";

export const getAccountantAvailableServices = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    const accountantId = req?.decodedToken?.data?.id;
    if (!accountantId) {
      const data = formatResponse(400, true, Message.NOT_FOUND, null);
      res.status(400).json(data);
      return;
    }

    const assignData = await campAssignAccountantService.getCampByAccountant(
        createObjectId(accountantId),
        "1"
    );
    if (!assignData || !assignData.length) {
      const data = formatResponse(400, true, "Accountant is not assigned to any camp.", null);
      res.status(400).json(data);
      return;
    }

    const campIds = assignData.map((item) => createObjectId(item.camp_id));
    const services = await getDistinctServiceByCampIds(campIds);
    const list = services.map((s) => s.serviceDetails);

    const data = formatResponse(200, false, "Available services", { list });
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};