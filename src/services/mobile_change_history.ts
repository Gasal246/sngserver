import db from "../models";

const mobile_change_history = db.mobileChangeHistoryModel;

interface MobileHistory {
  user_id: string;
  client_id: string;
  pos_id?: string;
  user_changed: boolean;
  mobile?: number;
  old_number?: string;
  country_code?: number;
  changed_date: Date;
  pos_allowed?: boolean;
}

export const addRecord = async (data: MobileHistory) => {
  const newHistory = new mobile_change_history(data);
  const savedHistory = await newHistory.save();
  return savedHistory;
};

export const getAllowedChange = async (user_id: string, phone: string) => {
  const history = await mobile_change_history.findOne({
    user_id,
    user_changed: false,
    mobile: phone,
    pos_allowed: true,
  });
  return history;
};

export const getHistory = async (user_id: string) => {
  const history = await mobile_change_history.find({ user_id });
  return history;
};
