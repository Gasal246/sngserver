import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { getUserCompanions } from "../../services/companion_devices";

export const getUserCompanionDevices = async (req: Request | any, res: Response) => {
    try {
        const user = req.decodedToken.data;
        
        if(!user) {
            const data = formatResponse(400, true, "User not found", null);
            res.status(400).json(data);
            return;
        }

        const companions = await getUserCompanions(user?.id);
        const data = formatResponse(200, false, "Companion Devices Fetched", companions);
        res.status(200).json(data);
        return;
    } catch (error: any) {
        const data = formatResponse(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
}