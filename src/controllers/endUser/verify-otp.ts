import { Request, Response } from "express";
import {
  Message,
  formatResponse,
  generateRandomPackageCode,
  parseToSimpleObj,
} from "../../helpers";
import {
  campService,
  userCampService,
  userRegisterService,
} from "../../services";
import jwt from "jsonwebtoken";
import { authConfig } from "../../config/auth.config";
import { isValidObjectId } from "mongoose";
import {
  addRecord,
  getAllowedChange,
} from "../../services/mobile_change_history";

export const verifyUserOtp = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    const user = await userRegisterService.findUserForVerification(
      req.body.mobile,
      req.body.otp,
      req.body.device_mac_id,
      req.body.country_code
    );
    if (!user) {
      const data = formatResponse(400, true, "Wrong otp details", null);
      res.status(400).json(data);
      return;
    }

    // if (user.is_new_user && !req.body.camp_id) {
    //   const data = formatResponse(400, true, Message.OUT_OF_SERVICE_AREA, null);
    //   res.status(400).json(data);
    //   return;
    // }

    let campData;
    if (req.body.camp_id) {
      if (!isValidObjectId(req.body.camp_id)) {
        const data = formatResponse(
          400,
          true,
          Message.LOCATION_CAMP_NO_AVAILABLE,
          null
        );
        res.status(400).json(data);
        return;
      }

      campData = await campService.getCampById(req.body.camp_id);
      if (!campData) {
        const data = formatResponse(
          400,
          true,
          Message.LOCATION_CAMP_NO_AVAILABLE,
          null
        );
        res.status(400).json(data);
        return;
      }
    }

    const is_new_user = user.is_new_user;
    if (user.is_new_user) {
      let foundRecord = null;
      let code = "";
      do {
        code = generateRandomPackageCode();
        foundRecord = await userRegisterService.isUuidFound(code);
      } while (foundRecord != null);
      user.uuid = code;
    }

    user.status = 1;
    user.is_new_user = false;
    const updatedUser = await userRegisterService.updateUser(
      user._id.toString(),
      user
    );
    if (!updatedUser) {
      const data = formatResponse(
        500,
        true,
        Message.SOMETHING_WENT_WRONG,
        null
      );
      res.status(500).json(data);
      return;
    }

    const obj = parseToSimpleObj(updatedUser);
    obj.is_new_user = is_new_user;
    delete obj.password;

    const baseCampDetails = await userCampService.getAssignCampDetailsOfUser(
      user._id.toString()
    );

    const location_camp = {
      location_camp_id: req.body.camp_id ? req.body.camp_id : null,
      location_verified: req.body.camp_id ? true : false,
      location_camp_client_id: campData ? campData.client_id : null,
    };
    const jwtData = {
      data: {
        ...obj,
        baseCampAvailable: baseCampDetails ? true : false,
        base_camp_id: baseCampDetails ? baseCampDetails?.camp_id : null,
        base_camp_client_id: baseCampDetails
          ? baseCampDetails?.client_id
          : null,
        location_camp: location_camp,
      },
    };
    //Generated jwt token
    const token = jwt.sign(jwtData, authConfig.token, {
      expiresIn: authConfig.expiresIn,
      algorithm: authConfig.algorithm,
    } as jwt.SignOptions);
    const data = formatResponse(201, false, Message.LOGIN_SUCCESS, {
      user_data: jwtData.data,
      token: token,
    });
    res.status(201).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};

export const mobileNumberChangedVerification = async (
  req: Request | any,
  res: Response
) => {
  try {
    const user = await userRegisterService.findUser(req.decodedToken.data.id);
    if (!user) {
      const data = formatResponse(400, true, "User not found", null);
      res.status(400).json(data);
      return;
    }

    if (user?.otp != req.body.otp) {
      const data = formatResponse(400, true, "Invalid OTP", null);
      res.status(400).json(data);
      return;
    }

    const availableRecords = await getAllowedChange(
      req.decodedToken.data.id,
      req.body.mobile_number
    );
    if (availableRecords) {
      availableRecords.old_number = user.phone;
      availableRecords.country_code = req.body.country_code;
      availableRecords.mobile = req.body.mobile_number;
      availableRecords.user_changed = true;
      availableRecords.changed_date = new Date();
      await availableRecords.save();
    } else {
      await addRecord({
        user_id: req.decodedToken.data.id,
        client_id: user.client_id?.toString(),
        mobile: req.body.mobile_number,
        old_number: user.phone,
        country_code: req.body.country_code,
        user_changed: true,
        changed_date: new Date(),
        pos_allowed: false,
      });
    }

    user.country_code = req.body.country_code;
    user.phone = req.body.mobile_number;

    // UPDATION USER WITH NEW MOBILE CHANGE DATE ( 30 days )
    user.next_mobile_change_at = new Date(
      new Date().getTime() + 30 * 24 * 60 * 60 * 1000
    );

    const updatedUser = await userRegisterService.updateUser(
      req.decodedToken.data.id,
      user
    );

    if (!updatedUser) {
      const data = formatResponse(
        500,
        true,
        Message.SOMETHING_WENT_WRONG,
        null
      );
      res.status(500).json(data);
      return;
    }

    const data = formatResponse(
      200,
      false,
      "Mobile number changed successfully",
      { userData: updatedUser }
    );
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};
