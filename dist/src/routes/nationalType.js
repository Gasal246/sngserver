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
router.post("/national-type", (0, multer_1.default)().array(""), [admin_1.verifyToken, validators_1.addNationalTypeValidator], controllers_1.addNationalType);
router.put("/national-type/:id", (0, multer_1.default)().array(""), [admin_1.verifyToken, validators_1.isNationalTypeIdIsExists, validators_1.addNationalTypeValidator], controllers_1.updateNationalType);
router.post("/national-type/status-update/:id", (0, multer_1.default)().array(""), [admin_1.verifyToken, validators_1.checkMongooseId, validators_1.statusUpdateValidator], controllers_1.nationalTypeStatusUpdate);
router.get("/national-type", [admin_1.verifyToken, validators_1.statusValidator], controllers_1.getAllNationalTypes);
router.get("/national-type/:id", [admin_1.verifyToken, validators_1.checkMongooseId], controllers_1.getOneNationalType);
exports.default = router;
//# sourceMappingURL=nationalType.js.map