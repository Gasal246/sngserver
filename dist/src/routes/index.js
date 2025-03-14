"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = __importDefault(require("./admin"));
const client_1 = __importDefault(require("./client"));
const clientAuth_1 = __importDefault(require("./clientAuth"));
const camp_1 = __importDefault(require("./camp"));
const pos_1 = __importDefault(require("./pos"));
const posDeviceCodeByAdmin_1 = __importDefault(require("./posDeviceCodeByAdmin"));
const posDeviceCodeByClient_1 = __importDefault(require("./posDeviceCodeByClient"));
const internetPackage_1 = __importDefault(require("./internetPackage"));
const posAuth_1 = __importDefault(require("./posAuth"));
const adminCoordinator_1 = __importDefault(require("./adminCoordinator"));
const adminAccountant_1 = __importDefault(require("./adminAccountant"));
const internetPackageClient_1 = __importDefault(require("./internetPackageClient"));
const user_1 = __importDefault(require("./user"));
const countries_1 = __importDefault(require("./countries"));
const nationalType_1 = __importDefault(require("./nationalType"));
const camp_location_1 = __importDefault(require("./camp-location"));
const clientCoordinator_1 = __importDefault(require("./clientCoordinator"));
const clientAccountant_1 = __importDefault(require("./clientAccountant"));
const adminInvestors_1 = __importDefault(require("./adminInvestors"));
const clientInvestors_1 = __importDefault(require("./clientInvestors"));
const coordinatorAuth_1 = __importDefault(require("./coordinatorAuth"));
const accountantAuth_1 = __importDefault(require("./accountantAuth"));
const investorsAuth_1 = __importDefault(require("./investorsAuth"));
const plantManager_1 = __importDefault(require("./plantManager"));
const plantManagerAuth_1 = __importDefault(require("./plantManagerAuth"));
const router = (0, express_1.Router)();
router.use("/api/admin", admin_1.default);
router.use("/api/admin", client_1.default);
router.use("/api/client-admin", clientAuth_1.default);
router.use("/api/client-admin", camp_1.default);
router.use("/api/client-admin", pos_1.default);
router.use("/api/pos", posAuth_1.default);
router.use("/api/admin", posDeviceCodeByAdmin_1.default);
router.use("/api/client-admin", posDeviceCodeByClient_1.default);
router.use("/api/admin", internetPackage_1.default);
router.use("/api/pos", posAuth_1.default);
router.use("/api/admin", adminCoordinator_1.default);
router.use("/api/admin", adminAccountant_1.default);
router.use("/api/client-admin", internetPackageClient_1.default);
router.use("/api/users", user_1.default);
router.use("/api/admin", countries_1.default);
router.use("/api/admin", nationalType_1.default);
router.use("/api/camp", camp_location_1.default);
router.use("/api/client-admin", clientCoordinator_1.default);
router.use("/api/client-admin", clientAccountant_1.default);
router.use("/api/admin", adminInvestors_1.default);
router.use("/api/client-admin", clientInvestors_1.default);
router.use("/api/coordinator", coordinatorAuth_1.default);
router.use("/api/accountant", accountantAuth_1.default);
router.use("/api/investor", investorsAuth_1.default);
router.use("/api/admin", plantManager_1.default);
router.use("/api/plant-manager", plantManagerAuth_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map