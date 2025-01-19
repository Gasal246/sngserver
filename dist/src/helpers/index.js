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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_KB = exports.MAX_DAY = exports.getUrlForMongodb = exports.getUrlOfProfileImage = exports.IMAGE_SUPPORTED_FORMATS = exports.userDir = exports.dayToMinutes = exports.minutesToDay = exports.minuteInMilleSeconds = exports.sendEmailOtp = exports.sendOtp = exports.generateOtp = exports.deleteFile = exports.generateRandomPackageCode = exports.generateRandomDeviceCode = exports.convertsObjectIds = exports.checkAllIdValid = exports.hasDuplicate = exports.parseToSimpleObj = exports.validPassword = exports.generateHash = exports.createObjectId = exports.normalizePort = exports.isStage = exports.isProd = exports.isDev = exports.getEnv = void 0;
const bcryptjs_1 = require("bcryptjs");
const mongoose_1 = __importStar(require("mongoose"));
const enums_1 = require("../types/enums");
const fs = __importStar(require("fs/promises"));
const axios_1 = __importDefault(require("axios"));
const dayjs_1 = __importDefault(require("dayjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const getEnv = () => process.env.NODE_ENV || enums_1.Env.DEV;
exports.getEnv = getEnv;
const isDev = () => process.env.NODE_ENV !== enums_1.Env.PROD;
exports.isDev = isDev;
const isProd = () => process.env.NODE_ENV === enums_1.Env.PROD;
exports.isProd = isProd;
const isStage = () => process.env.NODE_ENV === enums_1.Env.STAGE;
exports.isStage = isStage;
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    return isNaN(port) ? val : port >= 0 ? port : false;
};
exports.normalizePort = normalizePort;
const createObjectId = (id) => new mongoose_1.default.Types.ObjectId(id);
exports.createObjectId = createObjectId;
const generateHash = (password) => {
    return (0, bcryptjs_1.hashSync)(password, (0, bcryptjs_1.genSaltSync)(8));
};
exports.generateHash = generateHash;
const validPassword = (inputPassword, password) => {
    return (0, bcryptjs_1.compareSync)(inputPassword, password);
};
exports.validPassword = validPassword;
const parseToSimpleObj = (object) => {
    return JSON.parse(JSON.stringify(object));
};
exports.parseToSimpleObj = parseToSimpleObj;
const hasDuplicate = (array) => {
    return new Set(array).size !== array.length;
};
exports.hasDuplicate = hasDuplicate;
const checkAllIdValid = (ids) => {
    for (let index = 0; index < ids.length; index++) {
        const element = ids[index];
        if (!(0, mongoose_1.isValidObjectId)(element)) {
            return false;
            break;
        }
    }
    return true;
};
exports.checkAllIdValid = checkAllIdValid;
const convertsObjectIds = (ids) => {
    const newIds = [];
    for (let index = 0; index < ids.length; index++) {
        const element = ids[index];
        newIds.push((0, exports.createObjectId)(element));
    }
    return newIds;
};
exports.convertsObjectIds = convertsObjectIds;
const generateRandomDeviceCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = process.env.POS_DEVICE_CODE_LENGTH
        ? parseInt(process.env.POS_DEVICE_CODE_LENGTH)
        : 16;
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateRandomDeviceCode = generateRandomDeviceCode;
const generateRandomPackageCode = () => {
    const characters = "0123456789";
    const length = process.env.INTERNET_PACKAGE_CODE_LENGTH
        ? parseInt(process.env.INTERNET_PACKAGE_CODE_LENGTH)
        : 16;
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateRandomPackageCode = generateRandomPackageCode;
const deleteFile = async (path) => {
    try {
        await fs.unlink(path);
    }
    catch (e) { }
};
exports.deleteFile = deleteFile;
const generateOtp = () => {
    const otp = Math.floor(Math.random() * 90000) + 10000;
    return otp;
};
exports.generateOtp = generateOtp;
const sendOtp = async (phoneNumber, otp) => {
    try {
        // if (process.env.NODE_ENV === "development") {
        //   return true;
        // } else {
        const requestBody = {
            uip_head: {
                METHOD: "SMS_SEND_REQUEST",
                SERIAL: 1,
                TIME: (0, dayjs_1.default)(new Date()).format("YYYY-MM-DD hh:mm:ss"),
                CHANNEL: process.env.OTP_CHANNEL,
                AUTH_KEY: process.env.OTP_AUTH_KEY,
            },
            uip_body: {
                SMS_CONTENT: `Hello! Your verification code is ${otp}. Please enter this code to proceed. Note: This code will expire in 10 minutes.`,
                DESTINATION_ADDR: [phoneNumber],
                ORIGINAL_ADDR: "WL-SMS",
            },
            uip_version: 2,
        };
        const config = {
            method: "post",
            url: process.env.OTP_URL,
            headers: {
                "Content-Type": "application/json",
            },
            data: requestBody,
        };
        console.log(requestBody);
        const { data } = await (0, axios_1.default)(config);
        console.log(data);
        if (data.uip_head.RESULT_CODE === 1) {
            return data;
        }
        else {
            console.log(data.uip_head.RESULT_DESC);
            throw new Error("OTP not sended.");
        }
        // }
    }
    catch (e) {
        throw e;
    }
};
exports.sendOtp = sendOtp;
const sendEmailOtp = async (email, otp) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });
        const mailOptions = {
            from: "devlogifex@gmail.com",
            to: email,
            subject: "Seachngo Verification OTP",
            html: `<h3>searchngo.app</h3>
      <h1>Your OTP Code..</h1>
      <p>Your verification code is: <b>${otp}</b></p>`,
        };
        try {
            await transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.log("Error on sending Email", error);
            throw new Error("Error on sending Email: " + error);
        }
    }
    catch (error) {
        throw error;
    }
};
exports.sendEmailOtp = sendEmailOtp;
const minuteInMilleSeconds = (minute) => {
    return minute * 60 * 1000;
};
exports.minuteInMilleSeconds = minuteInMilleSeconds;
const minutesToDay = (minutes) => {
    return minutes / 1440;
};
exports.minutesToDay = minutesToDay;
const dayToMinutes = (day) => {
    return day * 1440;
};
exports.dayToMinutes = dayToMinutes;
exports.userDir = "./public/uploads/user/profile/";
exports.IMAGE_SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];
const getUrlOfProfileImage = (name) => {
    return process.env.BASE_URL + `/public/uploads/user/profile/` + name;
};
exports.getUrlOfProfileImage = getUrlOfProfileImage;
exports.getUrlForMongodb = process.env.BASE_URL + `/public/uploads/user/profile/`;
exports.MAX_DAY = 3650;
exports.MAX_KB = 2147483647;
__exportStar(require("./format-response"), exports);
__exportStar(require("./logger"), exports);
__exportStar(require("./message"), exports);
//# sourceMappingURL=index.js.map