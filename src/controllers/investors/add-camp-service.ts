import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { createInvestorAssignService, isInvestorServiceAlreadyAssigned } from "../../services/investor_assign_services";

export const addCampService = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { investor_id, camp_id, service_id } = req.body;

        const isExisting = await isInvestorServiceAlreadyAssigned(investor_id, service_id, camp_id);
        if(isExisting) {
            const data = formatResponse(400, true, "Service already assigned", null);
            res.status(400).json(data);
            return;
        }

        const serviceAdded = await createInvestorAssignService(investor_id, service_id, camp_id);
        if(!serviceAdded) {
            const data = formatResponse(400, true, "Something went wrong", null);
            res.status(400).json(data);
            return;
        }

        const data = formatResponse(200, false, "Camp Service Attached Successfully.", { serviceAdded });
        res.status(200).json(data);
        return;
    } catch (e: any) {
        const data = formatResponse(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};

