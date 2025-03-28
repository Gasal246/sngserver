import * as express from "express";

import multer from "multer";
import {
  assignUserToCamp,
  assignedPackageListCampWise,
  changeUserPhone,
  changeUserToCamp,
  getAllCountries,
  getAllNationalTypes,
  getBaseCamp,
  getClientWiseCamp,
  getInternetPackageListForEndUser,
  getInternetPackageOrderById,
  getInternetPackageOrderListForEndUser,
  getOneCamp,
  getRechargeHistory,
  getUserProfile,
  manualActivePackage,
  mobileNumberChangedVerification,
  newUserPhoneVerify,
  sendUserMobileChangeOtp,
  sendUserOtp,
  updateProfile,
  userPlaceInternetOrder,
  verifyUserOtp,
} from "../controllers";
import {
  assignUserToCampValidator,
  checkMongooseId,
  assignedPackageListCampWiseValidator,
  imageValidator,
  updateProfileValidator,
  userChangePhoneValidator,
  userSendOtpValidator,
  userVerificationNewPhoneValidator,
  userVerifyOtpValidator,
  manualActivePackageValidator,
  userPlaceOrderValidator,
  orderStatusValidator,
  userSendMobileChangeOtpValidator,
  userMobileNumberChangeVerificationValidator,
} from "../middlewares/validators";
import { verifyUserToken } from "../middlewares/auth/user";
import { validateCamp } from "../controllers/endUser/validate-camp";
import { validateCampValidator } from "../middlewares/validators/validate-camp";
import { profileUpload } from "../middlewares/validators/profile-upload";
import {
  initialProfileUpdate,
  updateExpoPushToken,
} from "../controllers/endUser/initialProfileUpdate";
import { getWallet } from "../controllers/wallet/get-wallet";
import { getWalletTransactions } from "../controllers/wallet/get-transactions";
import { sendNotification } from "../services/notification";

const router = express.Router();
router.post("/send-otp", multer().array(""), userSendOtpValidator, sendUserOtp);
router.post(
  "/otp-verification",
  multer().array(""),
  userVerifyOtpValidator,
  verifyUserOtp
);
router.post(
  "/profile-update",
  [verifyUserToken, imageValidator, updateProfileValidator],
  updateProfile
);

// Entry Time Profile Updation End Point
router.post(
  "/update-profile",
  verifyUserToken,
  profileUpload.single("photo"),
  initialProfileUpdate
);

router.post("/update-expo-push-token", verifyUserToken, updateExpoPushToken);

router.get("/national-type", verifyUserToken, getAllNationalTypes);
router.get("/country", verifyUserToken, getAllCountries);
router.get("/profile", verifyUserToken, getUserProfile);
router.get("/camps/get-base-camp", verifyUserToken, getBaseCamp);
router.post(
  "/validate-camp",
  multer().array(""),
  verifyUserToken,
  validateCampValidator,
  validateCamp
);
router.post(
  "/update-mobile-number",
  multer().array(""),
  [verifyUserToken, userChangePhoneValidator],
  changeUserPhone
);
router.post(
  "/otp-verification-new-number",
  multer().array(""),
  [verifyUserToken, userVerificationNewPhoneValidator],
  newUserPhoneVerify
);
router.post(
  "/camps/assign-user-camp",
  multer().array(""),
  [verifyUserToken, assignUserToCampValidator],
  assignUserToCamp
);
router.post(
  "/camps/change-user-camp",
  multer().array(""),
  [verifyUserToken, assignUserToCampValidator],
  changeUserToCamp
);
router.post(
  "/internet-package/manual-active",
  multer().array(""),
  [verifyUserToken, manualActivePackageValidator],
  manualActivePackage
);
router.post(
  "/internet-package/place-order",
  multer().array(""),
  [verifyUserToken, userPlaceOrderValidator],
  userPlaceInternetOrder
);
router.get(
  "/internet-package/order",
  [verifyUserToken, orderStatusValidator],
  getInternetPackageOrderListForEndUser
);
router.get("/recharge-history", verifyUserToken, getRechargeHistory);
router.get(
  "/internet-package/assigned-package-camp-wise",
  [verifyUserToken, assignedPackageListCampWiseValidator],
  assignedPackageListCampWise
);
router.get(
  "/camps/packages/internet",
  [verifyUserToken],
  getInternetPackageListForEndUser
);
router.get("/camps/get-client-wise-camp", verifyUserToken, getClientWiseCamp);
router.get("/camps/:id", [verifyUserToken, checkMongooseId], getOneCamp);
router.get(
  "/internet-package/order/:id",
  [verifyUserToken, checkMongooseId],
  getInternetPackageOrderById
);

router.get("/wallet", verifyUserToken, getWallet);
router.get("/wallet-transactions/:id", verifyUserToken, getWalletTransactions);

router.post(
  "/send-mobile-otp",
  [verifyUserToken, userSendMobileChangeOtpValidator],
  sendUserMobileChangeOtp
);
router.post("/verify-change-number", [
  verifyUserToken,
  userMobileNumberChangeVerificationValidator,
  mobileNumberChangedVerification,
]);

// ########## COMPANION DEVICES ###########
// router.post("/add-companion", verifyUserToken, addCompanion)

// ######## Testing Notification Setup ############
router.post(
  "/notification-test",
  async (req: express.Request, res: express.Response) => {
    const token = req.body.token;
    const data = req.body.data;
    sendNotification(data, token)
      .then(() => {
        res.status(200).json("Notification Send");
        return;
      })
      .catch((e: any) => {
        res.status(500).json(e);
      });
  }
);

// ############# MOC FETCH LOCATION API ############
router.get(
  "/moc-fetch-location",
  (req: express.Request, res: express.Response) => {
    console.log("Called Moc Location Information...");
    res.json({
      SG: {
        client_ip: "",
        IntenetAccess: "no",
        LoggedIn: "no",
        location_id: "66fa8aac30541af749baf67d",
        client_mac: "7a:40:f6:be:83:cc",
      },
    });
    return;
  }
);

export default router;
