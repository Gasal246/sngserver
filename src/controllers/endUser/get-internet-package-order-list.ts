import { Request, Response } from "express";
import { Message, createObjectId, formatResponse } from "../../helpers";
import { orderInternetPackageService } from "../../services";

export const getInternetPackageOrderListForEndUser = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    const userData = req.decodedToken.data;
    const status = req.query.order_status?.toString();
    const list = await orderInternetPackageService.getInternetPackageForUser(
      createObjectId(userData.id),
      status,
      userData.location_data?.location_camp_client_id ||
        userData?.base_camp_client_id
    );
    if (!list || !list.length) {
      const data = formatResponse(400, true, Message.NOT_FOUND, null);
      res.status(400).json(data);
      return;
    }

    const data = formatResponse(200, false, "Internet package order list", {
      list: list,
    });

    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};
