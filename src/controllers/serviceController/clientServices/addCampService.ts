import { formatResponse } from "../../../helpers";
import { Request, Response } from "express";
import { assignNewCampService, isAlreadyAssigned } from "../../../services/camp_assign_services";

export const addCampAssignedService = async (req: Request | any, res: Response) => {
    try {
        const { camp_id, service_id } = req.body;
        const { data: clientData } = req.decodedToken;

        const alreadyAssigned = await isAlreadyAssigned(camp_id, service_id);
        if(alreadyAssigned) {
            const data = formatResponse(400, true, "Service already assigned", null);
            res.status(400).json(data);
            return;
        };

        const data = await assignNewCampService(clientData?.id, camp_id, service_id);
        const response = formatResponse(200, false, "Service added successfully", data);
        res.status(200).json(response);
        return;
    } catch (error: any) {
        const data = formatResponse(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
}