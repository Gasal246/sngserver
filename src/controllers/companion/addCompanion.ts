import { Request, Response } from 'express';
import { formatResponse } from '../../helpers';

export const addNewCompanion = ( req: Request | any, res: Response ) => {
    try {
        const token_data = req.decodedToken.data;
        const { expoToken, deviceName, deviceModel, os, osVersion } = req.body;

        
        
    } catch (error: any) {
        console.log(error);
        const data = formatResponse(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
}