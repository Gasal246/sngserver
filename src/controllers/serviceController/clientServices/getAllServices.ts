import { Request, Response } from "express";
import { formatResponse } from "../../../helpers";
import { getClientServicesList } from "../../../services/services";

export const getAssignedServices = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { data: clientData } = req.decodedToken;
    const { status } = req.query;
    const services = await getClientServicesList(
      clientData.id,
      status ? parseInt(status.toString()) : 1
    );
    const list = services.map((service: any) => service?.service);
    const data = formatResponse(200, false, "Services fetched successfully.", {
      list,
    });
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
