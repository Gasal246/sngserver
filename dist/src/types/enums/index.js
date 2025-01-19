"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundType = exports.CreatedByUserType = exports.OrderStatus = exports.InternetPackageType = exports.Roles = exports.RechargeTypeEnum = exports.PosCategoryEnum = exports.ErrorTypes = exports.Status = exports.Env = void 0;
var Env;
(function (Env) {
    Env["DEV"] = "development";
    Env["PROD"] = "production";
    Env["STAGE"] = "staging";
})(Env || (exports.Env = Env = {}));
var Status;
(function (Status) {
    Status["UNAUTHORISED"] = "UNAUTHORISED";
})(Status || (exports.Status = Status = {}));
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["UNAUTHORISED_ERROR"] = "UnauthorizedError";
})(ErrorTypes || (exports.ErrorTypes = ErrorTypes = {}));
var PosCategoryEnum;
(function (PosCategoryEnum) {
    PosCategoryEnum[PosCategoryEnum["ONSITE"] = 1] = "ONSITE";
    PosCategoryEnum[PosCategoryEnum["OFFSITE"] = 2] = "OFFSITE";
    PosCategoryEnum[PosCategoryEnum["OFFLINE"] = 3] = "OFFLINE";
})(PosCategoryEnum || (exports.PosCategoryEnum = PosCategoryEnum = {}));
var RechargeTypeEnum;
(function (RechargeTypeEnum) {
    RechargeTypeEnum["POS_TOP_UP"] = "POS Top Up";
    RechargeTypeEnum["POS_TRANSFER"] = "POS Transfer";
    RechargeTypeEnum["ONLINE_PAYMENT"] = "Online payment";
    RechargeTypeEnum["REFUND"] = "Refund";
})(RechargeTypeEnum || (exports.RechargeTypeEnum = RechargeTypeEnum = {}));
var Roles;
(function (Roles) {
    Roles["ROLE_CLIENT_ADMIN"] = "ROLE_CLIENT_ADMIN";
    Roles["ROLE_INVESTOR"] = "ROLE_INVESTOR";
    Roles["ROLE_POS"] = "ROLE_POS";
    Roles["ROLE_COORDINATOR"] = "ROLE_COORDINATOR";
    Roles["ROLE_ACCOUNTANT"] = "ROLE_ACCOUNTANT";
    Roles["ROLE_PLANT_MANAGER"] = "ROLE_PLANT_MANAGER";
    Roles["ROLE_STORE_MANAGER"] = "ROLE_STORE_MANAGER";
    Roles["ROLE_KITCHEN_MANAGER"] = "ROLE_KITCHEN_MANAGER";
})(Roles || (exports.Roles = Roles = {}));
var InternetPackageType;
(function (InternetPackageType) {
    InternetPackageType["FIXED_DURATION"] = "fixed_duration";
})(InternetPackageType || (exports.InternetPackageType = InternetPackageType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["active"] = 1] = "active";
    OrderStatus[OrderStatus["expire"] = 2] = "expire";
    OrderStatus[OrderStatus["pending"] = 3] = "pending";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var CreatedByUserType;
(function (CreatedByUserType) {
    CreatedByUserType["pos"] = "pos";
    CreatedByUserType["user"] = "user";
})(CreatedByUserType || (exports.CreatedByUserType = CreatedByUserType = {}));
var RefundType;
(function (RefundType) {
    RefundType["internet_package"] = "internet_package";
})(RefundType || (exports.RefundType = RefundType = {}));
//# sourceMappingURL=index.js.map