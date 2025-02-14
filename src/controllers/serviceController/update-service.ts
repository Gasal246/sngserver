import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { isServiceExist, isServiceNameExist, updateServiceById, updateServiceByName } from "../../services/services";
import { IServices } from "../../models/service.model";

export const updateService = async (req: Request, res: Response) => {
    try {
        const { service_id, new_service_name, new_transaction_name } = req.body;

        if(!new_service_name && !new_transaction_name) {
            const data = formatResponse(500, true, "New Service name or Transaction name is provided.", null);
            res.status(500).json(data);
            return;
        }

        const isExist = await isServiceExist(service_id);
        if(!isExist) {
            const data = formatResponse(500, true, "Provided Service id is not found.", null);
            res.status(500).json(data);
            return;
        }

        const obj: Partial<IServices> = {
            service_name: new_service_name,
            transaction_title: new_transaction_name
        }

        const updatedService = await updateServiceById(service_id, obj);
        if(!updatedService) {
            const data = formatResponse(500, true, "Service not Updated! Internal Server Error.", null);
            res.status(500).json(data);
            return;
        }

        const data = formatResponse(200, false, "service successfully updated!", updatedService);
        res.status(200).json(data);
        return;
    } catch (e: any) {
        const data = formatResponse(500, true, e.message, null);
        res.status(500).json(data);
        return; 
    }
}
