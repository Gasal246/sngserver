import cors from "cors";
import { EventEmitter } from 'events';

// Increase EventEmitter max listeners limit
EventEmitter.defaultMaxListeners = 15;

import express, { Request, Response } from "express";
import expressStatusMonitor from "express-status-monitor";
import Http, { Server } from "http";
import https from "https";
import mongoose from "mongoose";
import * as fs from "fs";
import path from "path";
import SourceMapSupport from "source-map-support";
import { initWebSocket } from "./websocket"; // Import the WebSocket initialization
import { getMongoURL } from "./config/db.config";
import { isProd, logger } from "./helpers";
import router from "./routes";
import { CorsOptions } from "./types/interfaces";
import {
  expireClientSubscriptionCron,
  expireInternetPackageCron,
} from "./helpers/cronJob";

const ENV = process.env;
const PORT = ENV.PORT || 3019;

export default async (): Promise<Server | void> => {
  try {
    if (!ENV.NODE_ENV) {
      logger.error("NODE_ENV not found");
      logger.error(
        "Please execute following command: mkdir src/env && cp .env.sample src/env/.env"
      );
      process.exit(101);
    }

    mongoose.set("strictQuery", false);
    await mongoose.connect(getMongoURL(ENV));
    
    const app = express();
    app.use(expressStatusMonitor());

    SourceMapSupport.install();

    const whitelist = [ENV.CORS_DOMAIN];

    const corsOptions: CorsOptions = {
      origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
          callback(null, true);
        } else {
          callback(new Error("UNAUTHORIZED!"));
        }
      },
      credentials: true,
    };

    const sslOptions = {
      key: fs.readFileSync(`/etc/letsencrypt/live/searchngo.app/privkey.pem`),
      cert: fs.readFileSync(`/etc/letsencrypt/live/searchngo.app/fullchain.pem`),
    };

    // Create HTTP server
    // const server = Http.createServer(app);

    const server = https.createServer(sslOptions, app);
    
    // Initialize WebSocket server
    initWebSocket(server);

    server.setTimeout(600000);

    app.use((req, res, next) => {
      res.setTimeout(600000, function () {
        logger.error("Request has timed out.");
        res.status(408).send("Request has timed out.");
      });
      next();
    });

    app.use(cors(isProd() ? corsOptions : { origin: "*" }));

    app.use(express.json({ limit: "2gb" }));
    app.use(express.urlencoded({ limit: "2gb", extended: false }));
    app.use(express.json());
    app.use("/public", express.static(path.join(__dirname, "../public")));
    app.use("/", router);
    app.all("*", (req: Request | any, res: Response) => {
      res.send(
        `Welcome to searchngo APIs in ${process.env.NODE_ENV} environment.`
      );
    });

    const dir = "./public/uploads/user/profile";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Important: Use the HTTP server to listen, not the Express app
    server.listen(3019, '0.0.0.0', () => {
      console.log(`Server is live at localhost:${PORT}`);
      console.log(`WebSocket server is ready for connections`);
    });

  } catch (err) {
    logger.debug(`Failed to connect to database. ${err}`);
  }

  //Cron file
  expireInternetPackageCron.start();
  expireClientSubscriptionCron.start();
};