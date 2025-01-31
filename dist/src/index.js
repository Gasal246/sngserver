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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_status_monitor_1 = __importDefault(require("express-status-monitor"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const source_map_support_1 = __importDefault(require("source-map-support"));
const db_config_1 = require("./config/db.config");
const helpers_1 = require("./helpers");
const routes_1 = __importDefault(require("./routes"));
const cronJob_1 = require("./helpers/cronJob");
const ENV = process.env;
const PORT = ENV.PORT || 3019;
exports.default = async () => {
    try {
        if (!ENV.NODE_ENV) {
            helpers_1.logger.error("NODE_ENV not found");
            helpers_1.logger.error("Please execute following command: mkdir src/env && cp .env.sample src/env/.env");
            process.exit(101);
        }
        mongoose_1.default.set("strictQuery", false);
        await mongoose_1.default.connect((0, db_config_1.getMongoURL)(ENV));
        const app = (0, express_1.default)();
        app.use((0, express_status_monitor_1.default)());
        source_map_support_1.default.install();
        const whitelist = [ENV.CORS_DOMAIN];
        const whitelistQA = [ENV.CORS_DOMAIN];
        const corsOptions = {
            origin: (origin, callback) => {
                if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
                    callback(null, true);
                }
                else {
                    callback(new Error("UNAUTHORIZED!"));
                }
            },
            credentials: true,
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const corsOptionsQA = {
            origin: (origin, callback) => {
                if (whitelistQA.indexOf(origin) !== -1 || origin === undefined) {
                    callback(null, true);
                }
                else {
                    callback(new Error("UNAUTHORIZED!"));
                }
            },
            credentials: true,
        };
        const server = http_1.default.createServer(app);
        server.setTimeout(600000);
        app.use((req, res, next) => {
            res.setTimeout(600000, function () {
                helpers_1.logger.error("Request has timed out.");
                res.status(408).send("Request has timed out.");
            });
            next();
        });
        app.use((0, cors_1.default)((0, helpers_1.isProd)() ? corsOptions : { origin: "*" }));
        app.use(express_1.default.json({ limit: "2gb" }));
        app.use(express_1.default.urlencoded({ limit: "2gb", extended: false }));
        app.use(express_1.default.json());
        app.use("/public", express_1.default.static(path_1.default.join(__dirname, "../public")));
        app.use("/", routes_1.default);
        app.all("*", (req, res) => {
            res.send(`Welcome to searchngo APIs in ${process.env.NODE_ENV} environment.`);
        });
        // app.use((e, req, res: Response, next) => {
        //   const status = e?.type === Status.UNAUTHORISED || e.name === ErrorTypes.UNAUTHORISED_ERROR ? 401 : e?.status ?? 400;
        //   const message = status === 401 ? 'Please Sign In again!' : e?.message ?? 'Uh Oh! Something went wrong. Please try again later!';
        //   return res.status(status).send(formatResponse(500, false, message, {}));
        // });
        const dir = "./public/uploads/user/profile";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        app.listen(3019, "0.0.0.0", () => console.log(`Server is live at localhost:${PORT}`));
    }
    catch (err) {
        helpers_1.logger.debug(`Failed to connect to database. ${err}`);
    }
    //Cron file
    cronJob_1.expireInternetPackageCron.start();
    cronJob_1.expireClientSubscriptionCron.start();
};
//# sourceMappingURL=index.js.map