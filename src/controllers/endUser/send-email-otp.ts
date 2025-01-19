import { Request, Response } from "express";
import {
  Message,
  formatResponse,
  generateOtp,
  sendEmailOtp,
  sendOtp,
} from "../../helpers";
import {
  clientService,
  userCampService,
  userRegisterService,
} from "../../services";
import db from "../../models";

export const sendUserEmailOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.body); // Only For Development Purposes;
    const user = await userRegisterService.findUserByEmail(req.body.email);
    if (!user) {
      const newUser = new db.userRegisterModel();
      newUser.email = req.body.email;
      newUser.otp = generateOtp();
      newUser.device_mac_id = req.body.device_mac_id;
      newUser.status = 5;
      newUser.is_new_user = true;

      await sendEmailOtp(newUser.email, newUser.otp);

      const createdUser = await userRegisterService.createUser(newUser);
      const obj = {
        user_data: {
          id: createdUser._id,
          client_id: 0, // TODO remial client id association
          name: createdUser.name,
          //otp: createdUser.otp,
          has_transfer_request: createdUser.has_transfer_request,
        },
      };
      const msg =
        process.env.NODE_ENV === "development"
          ? `OTP send your registered number. [FOR DEVELOPMENT OTP: ${createdUser.otp}]`
          : "OTP send your registered number.";
      const data = formatResponse(200, false, msg, obj);
      res.status(200).json(data);
      return;
    }
  } catch (error: any) {
    console.log(error);
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
