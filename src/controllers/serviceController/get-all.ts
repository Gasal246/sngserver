import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { getAllSuperadminServices } from "../../services/services";

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    console.log(req.query);
    const services = await getAllSuperadminServices(status);
    if (!services) {
      const data = formatResponse(406, true, "Services Not Found", []);
      res.status(406).json(data);
      return;
    }
    const data = formatResponse(200, false, "Services succesfully fethed.", {
      list: services,
    });
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
