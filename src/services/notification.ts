import mongoose from "mongoose";
import db from "../models";
import Expo from "expo-server-sdk";

const expo = new Expo();

export const sendNotification = async (data: any, token: string[]) => {
  return new Promise(async (resolve, reject) => {
    if (!Expo.isExpoPushToken(token)) {
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
