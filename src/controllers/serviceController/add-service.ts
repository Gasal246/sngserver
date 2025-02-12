import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { addNewService, isServiceNameExist } from "../../services/services";

export const addService = async (req: Request, res: Response) => {
  try {
    const { service_name, transaction_title } = req.body;
    const already_exist = await isServiceNameExist(service_name);

    if(already_exist) {
        const data = formatResponse(403, true, `Service Name ${service_name} already Exists.`, null);
        res.status(403).json(data);
        return;
    }

    const result = await addNewService(service_name, transaction_title);
    const data = formatResponse(200, false, "Service added successfully", result);
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};

