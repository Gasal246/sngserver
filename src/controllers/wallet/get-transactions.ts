import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { getWalletById } from "../../services/user_wallet";
import { getTransactionsByWalletId } from "../../services/user_transactions";

export async function getWalletTransactions(req: Request | any, res: Response) {
  try {
    const decodedToken = req.decodedToken;
    const wallet = await getWalletById(req.params.id);
    // console.log(wallet);
    if (wallet?.user_id.toString() !== decodedToken.data.id) {
      const data = formatResponse(
        500,
        true,
        "This Action Will Be Reported, ( user_id & wallet_id mismatch )",
        null
      );
      res.status(500).json(data);
      return;
    }

    const show_more_count = req.query.show_count
      ? parseInt(req.query.show_count.toString())
      : 1;

    const result = await getTransactionsByWalletId(
      req.params.id,
      show_more_count
    );
    // console.log(result)
    const data = formatResponse(
      200,
      false,
      `Transaction ${show_more_count}`,
      result
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    console.log("From here", error);
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
}
