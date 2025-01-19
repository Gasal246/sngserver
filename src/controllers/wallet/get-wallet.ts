import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { walletAvailableForUserAndClient } from "../../services/user_wallet";
import { getCampById } from "../../services/camp";

export async function getWallet(req: Request, res: Response) {
  try {
    const { data: decodedToken } = req.decodedToken;
    let client_id: null | string =
      decodedToken.location_camp?.location_camp_client_id ||
      decodedToken.base_camp_client_id;
    let camp_id: null | string =
      decodedToken.location_camp?.location_camp_id || decodedToken.base_camp_id;

    if (!client_id) {
      const data = formatResponse(
        500,
        true,
        "User Not Have A Base Client Id",
        null
      );
      res.status(500).json(data);
      return;
    }

    if (!camp_id) {
      const data = formatResponse(500, true, "User Not Have A Base Camp", null);
      res.status(500).json(data);
      return;
    }

    const wallet = await walletAvailableForUserAndClient(
      client_id,
      decodedToken.id
    );
    const camp_data = await getCampById(camp_id);

    const return_data = {
      ...wallet,
      camp_name: camp_data?.camp_name,
    };

    const data = formatResponse(
      200,
      false,
      "Wallet Successfully Fetched",
      return_data
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    console.log(error);
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
}
