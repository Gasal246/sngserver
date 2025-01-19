"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoURL = void 0;
const helpers_1 = require("../helpers");
const getMongoURL = (env) => {
    const MONGO_URL = env.MONGO_URL || (0, helpers_1.isProd)() ? env.MONGO_URL : "mongodb://:27017/searchngo";
    if (!MONGO_URL) {
        helpers_1.logger.error("Please provide mongo-url");
        process.exit(1);
    }
    if ((0, helpers_1.isDev)()) {
        helpers_1.logger.info(`Mongodb URL: ${MONGO_URL}`);
    }
    return MONGO_URL;
};
exports.getMongoURL = getMongoURL;
//# sourceMappingURL=db.config.js.map