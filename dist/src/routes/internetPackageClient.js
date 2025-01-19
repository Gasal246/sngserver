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
const client_1 = require("../middlewares/auth/client");
const validators_1 = require("../middlewares/validators");
const controllers_1 = require("../controllers");
const multer_1 = __importDefault(require("multer"));
const router = express.Router();
router.get("/internet-package/assigned", [client_1.verifyClientToken, validators_1.statusValidator], controllers_1.assignedPackageList);
router.post("/internet-package", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.internetPackageClientValidator], controllers_1.addInternetPackageClient);
router.put("/internet-package/:id", (0, multer_1.default)().array(""), [
    client_1.verifyClientToken,
    validators_1.isInternetPackageClientIdIsExists,
    validators_1.internetPackageClientValidator,
], controllers_1.updateInternetPackageClient);
router.post("/internet-package/status-update/:id", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.checkMongooseId, validators_1.statusUpdateValidator], controllers_1.internetPackageStatusClientUpdate);
router.get("/internet-package", [client_1.verifyClientToken, validators_1.statusValidator], controllers_1.getAllInternetPackagesClient);
router.get("/internet-package/assigned-package-camp-wise", [client_1.verifyClientToken, validators_1.assignedPackageListCampWiseValidator], controllers_1.assignedPackageListCampWise);
router.get("/internet-package/assigned-camps-by-client-package", [client_1.verifyClientToken, validators_1.assignedCampsListClientPackageValidator], controllers_1.assignedCampsListClientPackage);
router.get("/internet-package/:id", [client_1.verifyClientToken, validators_1.checkMongooseId], controllers_1.getOneInternetPackageClient);
router.post("/internet-package/assign-camps", (0, multer_1.default)().array(""), [client_1.verifyClientToken, validators_1.assignCampsValidator], controllers_1.assignCamps);
exports.default = router;
//# sourceMappingURL=internetPackageClient.js.map