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
const get_assigned_camps_1 = require("../controllers/investors/get-assigned-camps");
const assign_camp_1 = require("../controllers/investors/assign-camp");
const remove_assigned_camp_1 = require("../controllers/investors/remove-assigned-camp");
const router = express.Router();
router.post("/investors", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.addInvestorValidator], controllers_1.addInvestor);
router.put("/investors/:id", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.isInvestorIdIsExists, validators_1.addInvestorValidator], controllers_1.updateInvestor);
router.post("/investors/status-update/:id", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.checkMongooseId, validators_1.statusUpdateValidator], controllers_1.investorStatusUpdate);
router.get("/investors", [client_1.verifyClientToken, validators_1.statusValidator], controllers_1.getAllInvestors);
router.get("/investors/:id", [client_1.verifyClientToken, validators_1.checkMongooseId], controllers_1.getOneInvestor);
router.post("/investor/add-camp", [client_1.verifyClientToken, validators_1.assignInvestorCampValidator], assign_camp_1.assignCampToInvestor);
router.get("/investor/get-assigned-camps/:investorId", client_1.verifyClientToken, get_assigned_camps_1.getInvestorAssignedCamps);
router.post("/remove-investor-camp", [client_1.verifyClientToken, validators_1.assignInvestorCampValidator], remove_assigned_camp_1.RemoveInvestorAssignedCamp);
router.post("/recover-investor-camp", [client_1.verifyClientToken, validators_1.assignInvestorCampValidator], remove_assigned_camp_1.RecoverInvestorAssignCamp);
exports.default = router;
//# sourceMappingURL=clientInvestors.js.map