import { Request } from "express";

type DecodedToken = { [key: string]: any };
type Body = { [key: string]: any };
declare global {
  namespace Express {
    interface Request {
      decodedToken: DecodedToken;
      files: DecodedToken;
      body?: Body;
    }
  }
}
