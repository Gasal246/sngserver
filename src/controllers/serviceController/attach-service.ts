import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import {
  attachServiceToClientFuncion,
  changeStatusOfService,
  isServiceAlreadyAttached,
} from "../../services/services";

export const attachServiceToClient = async (req: Request, res: Response) => {
  try {
    const { client_id, service_id } = req.body;

    const existing = await isServiceAlreadyAttached(client_id, service_id);
    if (existing) {
      const data = formatResponse(401, true, "Service Already Attached!", null);
      res.status(401).json(data);
      return;
    }

    const attached = await attachServiceToClientFuncion(client_id, service_id);

    const data = formatResponse(
      200,
      false,
      "service successfully attached!",
      attached
    );
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};

export const changeStatusOfAttachedService = async (
  req: Request,
  res: Response
) => {
  try {
    const { id, status } = req.body;

    const updated = await changeStatusOfService(id, status);

    const data = formatResponse(
      200,
      false,
      "assigned service: status updated!",
      updated
    );
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};
