"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Ensure directory exists
function ensureDirExists(dir) {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
}
// Multer storage configuration
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        var _a;
        const userData = ((_a = req.decodedToken) === null || _a === void 0 ? void 0 : _a.data) || {}; // Ensure user data is present
        const uploadDir = path_1.default.join(__dirname, "../../../public/uploads", userData.id, "profile");
        ensureDirExists(uploadDir);
        console.log("Saving file to:", uploadDir); // Debug log
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        console.log("File received:", file.originalname); // Debug log
        cb(null, `profilepic${ext}`);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
        console.log("Invalid File Type");
        return cb(new Error("Invalid file type"), false);
    }
    cb(null, true);
};
// Export multer instance
exports.profileUpload = (0, multer_1.default)({ storage, fileFilter });
//# sourceMappingURL=profile-upload.js.map