import { Request, Response } from "express";
import { createObjectId, formatResponse } from "../../helpers";
import { campAssignAccountantService } from "../../services";
import { getDistinctPosByCampIds } from "../../services/camp_assign_pos";
import { getTransactionsByCampIdsWithinDate } from "../../services/user_transactions";

export const getCampWiseWalletRecharge = async (req: Request | any, res: Response) => {
    try {
        const { sd, ed, campId } = req.query;

        const accountantId = req.decodedToken.data.id;
        
        const isAssigned = await campAssignAccountantService.isCampAssignWithAccountant(campId, accountantId);
        if (!isAssigned) {
            const data = formatResponse(400, true, "Accountant is not assigned to the given camp.", null);
            res.status(400).json(data);
            return;
        }

        const distinctPos = await getDistinctPosByCampIds([ createObjectId(campId) ]);

        let posResult: any[] = [];
        const transactions = await getTransactionsByCampIdsWithinDate([createObjectId(campId)], new Date(sd), new Date(ed));
        distinctPos.map( async (pos: any) => {
            const posTransactions = transactions.filter((transaction: any) => ( transaction?.pos_user_id?.toString() === pos?.pos_id?.id && transaction?.created_by_type === "pos" ));
            posResult.push({...pos?._doc, collection_amount: posTransactions.reduce((acc: number, transaction: any) => acc + transaction.amount, 0), total_transactions: posTransactions.length});
        });

        const summary = {
            kiosk_total: transactions.filter((transaction: any) => ( transaction?.created_by_type != "pos" )).reduce((acc: number, transaction: any) => acc + transaction.amount, 0),
            total_transactions: transactions.length,
            sub_total: transactions.reduce((acc: number, transaction: any) => acc + transaction.amount, 0),
            total_pos_collection_amount: posResult.reduce((acc: number, pos: any) => acc + pos.collection_amount, 0),
            total_pos_transactions: posResult.reduce((acc: number, pos: any) => acc + pos.total_transactions, 0),
            pos_result: posResult
        };

        const data = formatResponse(200, false, "Wallet recharge data fetched successfully", summary);
        res.status(200).json(data);
        return;
    } catch (error: any) {
        const data = formatResponse(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
}