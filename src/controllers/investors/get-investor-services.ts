import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { getInvestorServiceOfCamp } from "../../services/investor_assign_services";
import { getInvestorById, getInvestorByInvestorId } from "../../services/investors";
import { getCampById } from "../../services/camp";

export const getInvestorAssignedServices = async (req: Request, res: Response): Promise<void> => {
    try {
        const { investorId, campId } = req.params;
        const { status } = req.query;

        const investor_data = await getInvestorByInvestorId(investorId);
        if(!investor_data) {
            const data = formatResponse(400, true, "Investor not found", null);
            res.status(400).json(data);
            return;
        }

        const camp_data = await getCampById(campId);
        if(!camp_data) {
            const data = formatResponse(400, true, "Camp not found", null);
            res.status(400).json(data);
            return;
        }

        const service_list = await getInvestorServiceOfCamp(investorId, campId, status as string);

        const data = formatResponse(200, false, "Services fetched successfully", {
            investor_data,
            camp_data,
            service_list
        });
        res.status(200).json(data);
        return;
    } catch (error: any) {
        const data = formatResponse(400, true, error.message, null);
        res.status(400).json(data);
        return;
    }
}