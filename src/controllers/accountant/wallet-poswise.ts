import { Request, Response } from "express";
import { createObjectId, formatResponse, Message } from "../../helpers";
import { isValidObjectId } from "mongoose";
import { getTransactionsByCampIdsWithinDate } from "../../services/user_transactions";
import { campAssignAccountantService } from "../../services";

export const getPosWiseWalletRecharge = async (req: Request | any, res: Response) => {
    try {
        const { sd, ed, posId } = req.query;
        if (!posId || !isValidObjectId(posId)) {
            const data = formatResponse(400, true, Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }

        const assignedCamps = await campAssignAccountantService.getCampByAccountant(createObjectId(req.decodedToken?.data?.id), "1");
        const campIds = assignedCamps.map((camp) => createObjectId(camp.camp_id));

        const camp_wise_transactions = await getTransactionsByCampIdsWithinDate(campIds, new Date(sd), new Date(ed));

        const result: any = [];
        assignedCamps.map((camp: any) => {
            const obj: any = {};
            obj["camp"] = camp;
            obj["total_amount"] = camp_wise_transactions.filter((transaction: any) => transaction.campId.equals(camp._id)).reduce((total: number, transaction: any) => total + transaction.amount, 0);
            obj["total_transactions"] = camp_wise_transactions.filter((transaction: any) => transaction.campId.equals(camp._id)).length;
            result.push(obj);
        });

        const data = formatResponse(200, false, "Wallet recharge data fetched successfully", result);
        res.status(200).json(data);
        return;
    } catch (error: any) {
        const data = formatResponse(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
}