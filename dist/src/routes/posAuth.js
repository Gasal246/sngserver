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
const controllers_1 = require("../controllers");
const validators_1 = require("../middlewares/validators");
const pos_1 = require("../middlewares/auth/pos");
const multer_1 = __importDefault(require("multer"));
const get_internet_package_list_1 = require("../controllers/posAuth/get-internet-package-list");
const router = express.Router();
router.post("/login", (0, multer_1.default)().array(""), validators_1.posLoginValidator, controllers_1.posLogin);
router.get("/profile", pos_1.verifyPosToken, controllers_1.getPosProfile);
router.post("/update-password", (0, multer_1.default)().array(""), [pos_1.verifyPosToken, validators_1.updatePasswordValidator], controllers_1.updatePosPassword);
router.get("/getCamps", [pos_1.verifyPosToken], controllers_1.getPosCamps);
router.post("/recharge/recharge-manual", (0, multer_1.default)().array(""), [pos_1.verifyPosToken, validators_1.posRechargeManualValidator], controllers_1.userWalletRecharge);
router.get("/user/search", [pos_1.verifyPosToken, validators_1.userSearchValidator], controllers_1.getUsers);
router.get("/camps/packages/internet", [pos_1.verifyPosToken, validators_1.getCampWiseInternetPackageValidator], get_internet_package_list_1.getInternetPackageList);
router.post("/internet-package/place-order", (0, multer_1.default)().array(""), [pos_1.verifyPosToken, validators_1.posInternetOrderValidator], controllers_1.placeInternetOrder);
router.get("/internet-package/order", [pos_1.verifyPosToken, validators_1.getCampWiseInternetOrderValidator], controllers_1.getInternetPackageOrderCampWise);
router.get("/internet-package/order-by-user", [pos_1.verifyPosToken, validators_1.posCampInternetPackageListValidator], controllers_1.getInternetPackageOrderUserWise);
router.get("/getCamps-client-wise", [pos_1.verifyPosToken], controllers_1.getPosCampsClientWise);
exports.default = router;
//# sourceMappingURL=posAuth.js.map