import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { addRecord, getHistory } from "../../services/mobile_change_history";

export const addMobileChangeRecord = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { user_id } = req.body;

    const history = await addRecord({
      user_id,
      client_id: req.decodedToken?.data?.client_id,
      user_changed: false,
      changed_date: new Date(),
      pos_allowed: true,
      pos_id: req.decodedToken?.data?.id,
    });

    const data = formatResponse(
      200,
      false,
      "Mobile change history added successfully",
      { history }
    );
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};

export const getUserMobileChangeHistory = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { userId: user_id } = req.params;

    const history = await getHistory(user_id);

    const data = formatResponse(
      200,
      false,
      "Mobile change history added successfully",
      { history }
    );
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};
