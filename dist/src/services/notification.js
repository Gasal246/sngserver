"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const expo_server_sdk_1 = __importDefault(require("expo-server-sdk"));
const expo = new expo_server_sdk_1.default();
const sendNotification = async (data, token) => {
    return new Promise(async (resolve, reject) => {
        if (!expo_server_sdk_1.default.isExpoPushToken(token)) {
            reject("Not a valid Expo Token");
        }
        const messages = [
            {
                to: token,
                sound: "default",
                body: JSON.stringify(data),
                data: {
                    data_key: "value",
                    userid: "",
                    signout: true,
                },
            },
        ];
        const tickets = await expo.sendPushNotificationsAsync(messages);
        resolve(tickets);
    });
};
exports.sendNotification = sendNotification;
//# sourceMappingURL=notification.js.map