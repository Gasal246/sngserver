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
const admin_1 = require("../middlewares/auth/admin");
const multer_1 = __importDefault(require("multer"));
const router = express.Router();
/**
 * Use middleware like auth, that should verify the token and if token is valid decode it and save all values into req.decodedToken
 * Then you can access token payload like, const decodedToke = req.decodedToken;
 * decodedToke.role, decodedToke.userId, etc...
 */
router.post("/login", (0, multer_1.default)().array(""), validators_1.loginValidator, controllers_1.adminLogin);
router.post("/update-password", (0, multer_1.default)().array(""), [admin_1.verifyToken, validators_1.updatePasswordValidator], controllers_1.updatePassword);
router.get("/profile", admin_1.verifyToken, controllers_1.getProfile);
router.get("/details", admin_1.verifyToken, controllers_1.getAdminDetails);
router.get("/camps/:id", [admin_1.verifyToken, validators_1.checkMongooseId], controllers_1.getCampsClientWise);
router.get("/clientWiseAllCamps", admin_1.verifyToken, controllers_1.getAllCampsClientWise);
exports.default = router;
//# sourceMappingURL=admin.js.map