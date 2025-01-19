import { Request, Response } from "express";
import { formatResponse, Message } from "../../helpers";
import { userRegisterService } from "../../services";
import { updateProfile } from "../../services/user_register";
import jwt from "jsonwebtoken";
import { authConfig } from "../../config/auth.config";
import path from "path";
import mongoose from "mongoose";

export const initialProfileUpdate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await userRegisterService.findUser(req.decodedToken.data.id);
    if (!user) {
      const data = formatResponse(
        400,
        true,
        Message.SOMETHING_WENT_WRONG,
        null
      );
      res.status(400).json(data);
      return;
    }

    const result = await updateProfile(req.decodedToken.data.id, {
      name: req.query.name,
    });

    const userData = { ...req.decodedToken.data, name: req.query.name };
    const jwtData = { ...req.decodedToken, data: userData };
    const token = jwt.sign(jwtData, authConfig.token);

    const data = formatResponse(201, false, Message.LOGIN_SUCCESS, {
      user_data: userData,
      token: token,
    });

    res.status(201).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    console.log(e.message);
    res.status(500).json(data);
    return;
  }
};

// FUNCTION TO UPDATE EXPO PUSH TOKEN FOR THE NOTIFICATION SERVICES.
export const updateExpoPushToken = async (req: Request, res: Response) => {
  try {
    const token = req.body.expo_push_token;
    if (!token) {
      const data = formatResponse(500, true, "NO EXPO PUSH TOKEN FOUND", null);
      res.status(500).json(data);
      return;
    }
    const result = await updateProfile(req.decodedToken.data.id, {
      expo_push_token: token,
    });
    const data = formatResponse(
      200,
      true,
      result ? result : { error: true },
      null
    );
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);

    console.log(e.message);
    res.status(500).json(data);
    return;
  }
};
