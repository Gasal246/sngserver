import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { findRegisteredUserById, updateUserById } from "../../services/user_register";

export const updateAppUser = async (req: Request | any, res: Response) => {
    try {
        const pos = req.decodedToken?.data;
        
        const user = await findRegisteredUserById(req.body.user_id);
        if(!user) {
            const data = formatResponse(400, true, "User not found", null);
            res.status(400).json(data);
            return;
        }

        if (pos?.client_id !== user.client_id) {
            const data = formatResponse(400, true, "Unauthorized", null);
            res.status(400).json(data);
            return;
        }

        const updatedUser = await updateUserById(req.body.user_id, req.body);
        if (!updatedUser) {
            const data = formatResponse(400, true, "User not found", null);
            res.status(400).json(data);
            return;
        }

        const data = formatResponse(200, true, "User updated successfully", updatedUser);
        res.status(200).json(data);
        return;
    } catch (error: any) {
        const data = formatResponse(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }  
};