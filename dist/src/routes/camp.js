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
router.post("/camps", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.campValidator], controllers_1.addCamp);
router.post("/camps/status-update/:id", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.checkMongooseId, validators_1.statusUpdateValidator], controllers_1.campStatusUpdate);
router.get("/camps", [client_1.verifyClientToken], controllers_1.getAllCamps);
router.post("/camps/assign/pos", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.assignCampToPosValidator], controllers_1.assignCampsToPos);
router.post("/camps/assign-camps-to-coordinator", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.assignCampToCoordinatorValidator], controllers_1.assignCampsToCoordinator);
router.post("/camps/assign-camps-to-accountant", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.assignCampToAccountantValidator], controllers_1.assignCampsToAccountant);
router.post("/camps/assign/accountant", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.assignAccountantToCampValidator], controllers_1.assignAccountantToCamps);
router.get("/camps/assigned-coordinators-by-camp", [client_1.verifyClientToken, validators_1.getAssignByCampValidator], controllers_1.getAssignCoordinator);
router.get("/camps/assigned-accountants-by-camp", [client_1.verifyClientToken, validators_1.getAssignByCampValidator], controllers_1.getAssignAccountant);
router.get("/camps/assigned-pos-by-camp", [client_1.verifyClientToken, validators_1.getAssignByCampValidator], controllers_1.getAssignPos);
router.get("/camps/base-camp-users", [client_1.verifyClientToken, validators_1.baseCampUserValidator], controllers_1.getBaseCampUser);
router.get("/camps/:id", [client_1.verifyClientToken, validators_1.checkMongooseId], controllers_1.getOneCamp);
router.put("/camps/:id", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.isCampIdIsExists, validators_1.campValidator], controllers_1.updateCamp);
router.get("/camps/assigned-pos-device-code/:id", [client_1.verifyClientToken, validators_1.checkMongooseId], controllers_1.getAssignPosDevice);
exports.default = router;
//# sourceMappingURL=camp.js.map