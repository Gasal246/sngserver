"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountant_model_1 = __importDefault(require("./accountant.model"));
const admin_model_1 = __importDefault(require("./admin.model"));
const camp_model_1 = __importDefault(require("./camp.model"));
const client_model_1 = __importDefault(require("./client.model"));
const coordinator_model_1 = __importDefault(require("./coordinator.model"));
const role_model_1 = __importDefault(require("./role.model"));
const pos_model_1 = __importDefault(require("./pos.model"));
const pos_device_code_model_1 = __importDefault(require("./pos_device_code.model"));
const pos_device_code_history_model_1 = __importDefault(require("./pos_device_code_history.model"));
const internet_package_model_1 = __importDefault(require("./internet_package.model"));
const internet_package_assign_client_model_1 = __importDefault(require("./internet_package_assign_client.model"));
const camp_assign_pos_device_model_1 = __importDefault(require("./camp_assign_pos_device.model"));
const pos_assign_pos_device_model_1 = __importDefault(require("./pos_assign_pos_device.model"));
const camp_assign_pos_model_1 = __importDefault(require("./camp_assign_pos.model"));
const internet_package_client_model_1 = __importDefault(require("./internet_package_client.model"));
const internet_package_assign_camps_model_1 = __importDefault(require("./internet_package_assign_camps.model"));
const user_register_model_1 = __importDefault(require("./user_register.model"));
const user_camp_model_1 = __importDefault(require("./user_camp.model"));
const countries_model_1 = __importDefault(require("./countries.model"));
const national_type_model_1 = __importDefault(require("./national_type.model"));
const user_recharge_model_1 = __importDefault(require("./user_recharge.model"));
const camp_assign_coordinator_model_1 = __importDefault(require("./camp_assign_coordinator.model"));
const camp_assign_accountant_model_1 = __importDefault(require("./camp_assign_accountant.model"));
const investors_model_1 = __importDefault(require("./investors.model"));
const user_wallet_model_1 = __importDefault(require("./user_wallet.model"));
const order_internet_package_model_1 = __importDefault(require("./order_internet_package.model"));
const plant_manager_model_1 = __importDefault(require("./plant_manager.model"));
const transaction_model_1 = __importDefault(require("./transaction.model"));
const service_model_1 = __importDefault(require("./service.model"));
const investor_assign_camps_model_1 = __importDefault(require("./investor_assign_camps.model"));
const investor_revenue_of_assigned_camp_service_model_1 = __importDefault(require("./investor_revenue_of_assigned_camp_service.model"));
exports.default = {
    accountantModel: accountant_model_1.default,
    adminModel: admin_model_1.default,
    campModel: camp_model_1.default,
    clientModel: client_model_1.default,
    coordinatorModel: coordinator_model_1.default,
    roleModel: role_model_1.default,
    posModel: pos_model_1.default,
    posDeviceCodeModel: pos_device_code_model_1.default,
    posDeviceCodeHistoryModel: pos_device_code_history_model_1.default,
    internetPackageModel: internet_package_model_1.default,
    InternetPackageAssignClientModel: internet_package_assign_client_model_1.default,
    campAssignPosDeviceModel: camp_assign_pos_device_model_1.default,
    posAssignPosDeviceModel: pos_assign_pos_device_model_1.default,
    campAssignPosModel: camp_assign_pos_model_1.default,
    InternetPackageClientModel: internet_package_client_model_1.default,
    InternetPackageAssignCampsModel: internet_package_assign_camps_model_1.default,
    userRegisterModel: user_register_model_1.default,
    userCampModel: user_camp_model_1.default,
    countriesModel: countries_model_1.default,
    nationalTypeModel: national_type_model_1.default,
    userRechargeModel: user_recharge_model_1.default,
    campAssignCoordinatorModel: camp_assign_coordinator_model_1.default,
    campAssignAccountantModel: camp_assign_accountant_model_1.default,
    investorsModel: investors_model_1.default,
    userWalletModel: user_wallet_model_1.default,
    orderInternetPackageModel: order_internet_package_model_1.default,
    plantManagerModel: plant_manager_model_1.default,
    userTransactions: transaction_model_1.default,
    servicesModel: service_model_1.default,
    investorAssignCampModel: investor_assign_camps_model_1.default,
    investorRevenueOfAssignedCampService: investor_revenue_of_assigned_camp_service_model_1.default,
};
//# sourceMappingURL=index.js.map