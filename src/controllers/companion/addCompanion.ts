import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import {
  addCompanionRecord,
  getNextCompanionNumber,
  updateCompanionByNthNumber,
} from "../../services/companion_devices";
import jwt from "jsonwebtoken";
import { authConfig } from "../../config/auth.config";
import { sendCredentialsToCompanion } from "../../services/notification";

export const addNewCompanion = async (req: Request | any, res: Response) => {
  try {
    const token_data = req.decodedToken.data;
    const { expoToken, deviceName, deviceModel, os, osVersion } = req.body;

    const nth_data = await getNextCompanionNumber(token_data?.id);
    const device_data = {
      user_id: token_data?.id,
      nth_number: 1, // add the dynamic one after calculating
      expo_token: expoToken,
      device_name: deviceName,
      device_model: deviceModel,
      os,
      os_version: osVersion,
    };

    let obj = null;
    if (nth_data?.status == 0) {
      // if there is inactive companion device update that record to new one
      obj = await updateCompanionByNthNumber(
        token_data?.id,
        nth_data?.nth_number,
        device_data
      );
    }
    obj = await addCompanionRecord(device_data);

    // Generating the data and token for the companion devices.
    const companion_user_data = {
      ...token_data,
      nth_number: nth_data?.nth_number,
    };
    const companion_token = await jwt.sign(
      companion_user_data,
      authConfig.token
    );
    await sendCredentialsToCompanion(expoToken, "Connecting to main device.", {
      user_data: companion_user_data,
      token: companion_token,
    });

    // TODO: In the companion device listen to this token and save the user_data & device_code & token (with nth_number)

    const data = formatResponse(
      200,
      false,
      "companion added successfully",
      obj
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    console.log(error);
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
