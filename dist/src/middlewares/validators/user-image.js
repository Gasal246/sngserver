"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageValidator = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("../../helpers");
const fileFilter = (_req, file, callback) => {
    if (!helpers_1.IMAGE_SUPPORTED_FORMATS.includes(file.mimetype)) {
        return callback(new Error("Only images allowed"));
    }
    callback(null, true);
};
const storageEngine = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, helpers_1.userDir);
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
const uploadHandler = (0, multer_1.default)({
    storage: storageEngine,
    fileFilter: fileFilter,
}).fields([
    { name: "national_id", maxCount: 1 },
    { name: "user_image", maxCount: 1 },
    { name: "passport_image", maxCount: 1 },
    { name: "photo", maxCount: 1 },
]);
const imageValidator = async (req, res, next) => {
    uploadHandler(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            const data = (0, helpers_1.formatResponse)(400, true, err.message, null);
            res.status(400).json(data);
            return;
        }
        else if (err instanceof Error) {
            const data = (0, helpers_1.formatResponse)(400, true, err.message, null);
            res.status(400).json(data);
            return;
        }
        next();
    });
};
exports.imageValidator = imageValidator;
//# sourceMappingURL=user-image.js.map