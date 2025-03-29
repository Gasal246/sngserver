import db from "../models";
const companionDevicesModel = db.companionDevicesModel;

interface companionData {
    user_id: string;
    nth_number: number;
    expo_token: string;
    device_name: string;
    device_model: string;
    os: string;
    os_version: string;
}

export const addCompanionRecord = async (data: companionData) => {
    const companion = new companionDevicesModel(data)
    return await companion.save();
}