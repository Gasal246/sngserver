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
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantManagerService = exports.orderInternetPackageService = exports.userWalletService = exports.investorsService = exports.campAssignAccountantService = exports.campAssignCoordinatorService = exports.userRechargeService = exports.nationalTypeService = exports.countriesService = exports.userCampService = exports.userRegisterService = exports.internetPackageClientService = exports.accountantService = exports.coordinatorService = exports.CampAssignPosService = exports.posAssignPosDeviceService = exports.campAssignPosDeviceService = exports.internetPackageService = exports.posDeviceCodeHistoryService = exports.posDeviceCodeService = exports.posService = exports.campService = exports.clientService = exports.roleService = exports.adminService = void 0;
exports.adminService = __importStar(require("./admin"));
exports.roleService = __importStar(require("./roles"));
exports.clientService = __importStar(require("./client"));
exports.campService = __importStar(require("./camp"));
exports.posService = __importStar(require("./pos"));
exports.posDeviceCodeService = __importStar(require("./pos_device_code"));
exports.posDeviceCodeHistoryService = __importStar(require("./pos_device_code_history"));
exports.internetPackageService = __importStar(require("./internet_package"));
exports.campAssignPosDeviceService = __importStar(require("./camp_assign_pos_device"));
exports.posAssignPosDeviceService = __importStar(require("./pos_assign_pos_device"));
exports.CampAssignPosService = __importStar(require("./camp_assign_pos"));
exports.coordinatorService = __importStar(require("./coordinator"));
exports.accountantService = __importStar(require("./accountant"));
exports.internetPackageClientService = __importStar(require("./internet_package_client"));
exports.userRegisterService = __importStar(require("./user_register"));
exports.userCampService = __importStar(require("./user_camp"));
exports.countriesService = __importStar(require("./countries"));
exports.nationalTypeService = __importStar(require("./national_type"));
exports.userRechargeService = __importStar(require("./user_recharge"));
exports.campAssignCoordinatorService = __importStar(require("./camp_assign_coordinator"));
exports.campAssignAccountantService = __importStar(require("./camp_assign_accountant"));
exports.investorsService = __importStar(require("./investors"));
exports.userWalletService = __importStar(require("./user_wallet"));
exports.orderInternetPackageService = __importStar(require("./order_internet_package"));
exports.plantManagerService = __importStar(require("./plant_manager"));
//# sourceMappingURL=index.js.map