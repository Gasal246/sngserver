import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { getClientServicesList } from "../../services/services";

export const getClientServices = async (req: Request, res: Response ) => {
    try {
        const { client_id, status } = req.query as  { client_id: string, status: string };
        if(!client_id || !status) {
            const data = formatResponse(
                401,
                true,
                !client_id ? "No client_id is passed!." : ( !status ? "No status is passed!." : "You Have to pass client_id and staus as query." ),
                null
            );
            res.status(401).json(data);
            return;
        }
        const list = await getClientServicesList(client_id, parseInt(status));
        const data = formatResponse(200, false, "fetched client assigned services", { list });
        res.status(200).json(data);
        return;
    } catch (e: any) {
        const data = formatResponse(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
}