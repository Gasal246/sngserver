import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { changeServiceStatusById, isServiceExist } from "../../services/services";

export const changeStatus = async (req: Request, res: Response) => {
    try {
        const { service_id, status } = req.body;
        
        const isExist = await isServiceExist(service_id);
        if(!isExist) {
            const data = formatResponse(400, true, "Service not found", null);
            res.status(400).json(data);
            return;
        }

        const updated = await changeServiceStatusById(service_id, status)
        const data = formatResponse(200, false, status ? (status == '1' ? "service restored" : "service temporay deleted.") : "service temporary deleted", updated);
        res.status(200).json(data);
        return;
    } catch (error: any) {
        const data = formatResponse(500, false, error.message, null);
        res.status(500).json(data);
        return;
    }
}