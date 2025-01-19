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
const client_1 = require("../middlewares/auth/client");
const multer_1 = __importDefault(require("multer"));
const router = express.Router();
router.post("/pos-device-code/activation", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.deviceCodeHistoryValidator], controllers_1.addDeviceCodeHistory);
router.post("/pos-device-code/deactivation", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.deActiveDeviceCodeValidator], controllers_1.deActiveDeviceCode);
router.get("/pos-device-code", [client_1.verifyClientToken], controllers_1.getAllDeviceCodesByClient);
router.post("/pos-device-code/assign-camps", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.assignDeviceCodeToCampsValidator], controllers_1.assignDeviceCodeToCamps);
router.post("/pos-device-code/assign-pos", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.assignDeviceCodeToPosValidator], controllers_1.assignDeviceCodeToPos);
exports.default = router;
//# sourceMappingURL=posDeviceCodeByClient.js.map