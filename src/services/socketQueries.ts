import { createObjectId } from "../helpers";
import db from "../models";

const userRegister = db.userRegisterModel;

// save socket_id to user_registers
export const updateSocketId = async (user_id: string, socket_id: string) => {
  const result = await userRegister.findByIdAndUpdate(
    user_id,
    { socket_id },
    { new: true }
  );
  return result;
};

// getExpoTokenByUserId
export const getExpoTokenByUserId = async (user_id: string) => {
  const result = await userRegister.findById(createObjectId(user_id), {
    expo_push_token: 1,
  });
  return result?.expo_push_token;
};

// GET socket id for the user_id
export const getSocketId = async (user_id: string) => {
  const result = await userRegister.findById(createObjectId(user_id), {
    socket_id: 1,
  });
  return result?.socket_id;
};

// remove socketid while device disconnection.
export const executeSocketDisconnetion = async (socket_id: string) => {
  const result = await userRegister.findOneAndUpdate(
    { socket_id },
    { socket_id: null, otp: null },
    { new: true }
  );
  return result;
};
