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
        categoryId: "confirmation_category",
      },
    ];

    const tickets = await expo.sendPushNotificationsAsync(messages);
    resolve(tickets);
  });
};

export const sendSigninCodesPushNotification = async (
  token: string,
  body: string,
  data: any
) => {
  return new Promise(async (resolve, reject) => {
    if (!Expo.isExpoPushToken(token)) {
      return reject("Not a valid Expo Push Token");
    }

    const messages = [
      {
        to: token,
        sound: "default",
        body,
        data,
      },
    ];

    try {
      const tickets = await expo.sendPushNotificationsAsync(messages);
      resolve(tickets);
    } catch (error) {
      reject(error);
    }
  });
};

export const sendCredentialsToCompanion = async (
  token: string,
  body: string,
  data: {
    type: string;
    user_data: any;
    token: string;
  }
) => {
  return new Promise(async (resolve, reject) => {
    if (!Expo.isExpoPushToken(token)) {
      return reject("Not a valid Expo Push Token");
    }

    const messages = [
      {
        to: token,
        sound: "default",
        body,
        data,
      },
    ];

    try {
      const tickets = await expo.sendPushNotificationsAsync(messages);
      resolve(tickets);
    } catch (error) {
      reject(error);
    }
  });
};
