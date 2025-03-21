"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../controllers");
const validators_1 = require("../middlewares/validators");
const user_1 = require("../middlewares/auth/user");
const validate_camp_1 = require("../controllers/endUser/validate-camp");
const validate_camp_2 = require("../middlewares/validators/validate-camp");
const profile_upload_1 = require("../middlewares/validators/profile-upload");
const initialProfileUpdate_1 = require("../controllers/endUser/initialProfileUpdate");
const get_wallet_1 = require("../controllers/wallet/get-wallet");
const get_transactions_1 = require("../controllers/wallet/get-transactions");
const notification_1 = require("../services/notification");
const router = express.Router();
router.post("/send-otp", (0, multer_1.default)().array(""), validators_1.userSendOtpValidator, controllers_1.sendUserOtp);
router.post("/otp-verification", (0, multer_1.default)().array(""), validators_1.userVerifyOtpValidator, controllers_1.verifyUserOtp);
router.post("/profile-update", [user_1.verifyUserToken, validators_1.imageValidator, validators_1.updateProfileValidator], controllers_1.updateProfile);
// Entry Time Profile Updation End Point
router.post("/update-profile", user_1.verifyUserToken, profile_upload_1.profileUpload.single("photo"), initialProfileUpdate_1.initialProfileUpdate);
router.post("/update-expo-push-token", user_1.verifyUserToken, initialProfileUpdate_1.updateExpoPushToken);
router.get("/national-type", user_1.verifyUserToken, controllers_1.getAllNationalTypes);
router.get("/country", user_1.verifyUserToken, controllers_1.getAllCountries);
router.get("/profile", user_1.verifyUserToken, controllers_1.getUserProfile);
router.get("/camps/get-base-camp", user_1.verifyUserToken, controllers_1.getBaseCamp);
router.post("/validate-camp", (0, multer_1.default)().array(""), user_1.verifyUserToken, validate_camp_2.validateCampValidator, validate_camp_1.validateCamp);
router.post("/update-mobile-number", (0, multer_1.default)().array(""), [user_1.verifyUserToken, validators_1.userChangePhoneValidator], controllers_1.changeUserPhone);
router.post("/otp-verification-new-number", (0, multer_1.default)().array(""), [user_1.verifyUserToken, validators_1.userVerificationNewPhoneValidator], controllers_1.newUserPhoneVerify);
router.post("/camps/assign-user-camp", (0, multer_1.default)().array(""), [user_1.verifyUserToken, validators_1.assignUserToCampValidator], controllers_1.assignUserToCamp);
router.post("/camps/change-user-camp", (0, multer_1.default)().array(""), [user_1.verifyUserToken, validators_1.assignUserToCampValidator], controllers_1.changeUserToCamp);
router.post("/internet-package/manual-active", (0, multer_1.default)().array(""), [user_1.verifyUserToken, validators_1.manualActivePackageValidator], controllers_1.manualActivePackage);
router.post("/internet-package/place-order", (0, multer_1.default)().array(""), [user_1.verifyUserToken, validators_1.userPlaceOrderValidator], controllers_1.userPlaceInternetOrder);
router.get("/internet-package/order", [user_1.verifyUserToken, validators_1.orderStatusValidator], controllers_1.getInternetPackageOrderListForEndUser);
router.get("/recharge-history", user_1.verifyUserToken, controllers_1.getRechargeHistory);
router.get("/internet-package/assigned-package-camp-wise", [user_1.verifyUserToken, validators_1.assignedPackageListCampWiseValidator], controllers_1.assignedPackageListCampWise);
router.get("/camps/packages/internet", [user_1.verifyUserToken], controllers_1.getInternetPackageListForEndUser);
router.get("/camps/get-client-wise-camp", user_1.verifyUserToken, controllers_1.getClientWiseCamp);
router.get("/camps/:id", [user_1.verifyUserToken, validators_1.checkMongooseId], controllers_1.getOneCamp);
router.get("/internet-package/order/:id", [user_1.verifyUserToken, validators_1.checkMongooseId], controllers_1.getInternetPackageOrderById);
router.get("/wallet", user_1.verifyUserToken, get_wallet_1.getWallet);
router.get("/wallet-transactions/:id", user_1.verifyUserToken, get_transactions_1.getWalletTransactions);
// ######## Testing Notification Setup ############
router.post("/notification-test", async (req, res) => {
    const token = req.body.token;
    const data = req.body.data;
    (0, notification_1.sendNotification)(data, token)
        .then(() => {
        res.status(200).json("Notification Send");
        return;
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
// ############# MOC FETCH LOCATION API ############
router.get("/moc-fetch-location", (req, res) => {
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
});
exports.default = router;
//# sourceMappingURL=user.js.map