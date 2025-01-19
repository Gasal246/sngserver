import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Ensure directory exists
function ensureDirExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userData = req.decodedToken?.data || {}; // Ensure user data is present
    const uploadDir = path.join(
      __dirname,
      "../../../public/uploads",
      userData.id,
      "profile"
    );
    ensureDirExists(uploadDir);
    console.log("Saving file to:", uploadDir); // Debug log
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    console.log("File received:", file.originalname); // Debug log
    cb(null, `profilepic${ext}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    console.log("Invalid File Type");
    return cb(new Error("Invalid file type"), false);
  }
  cb(null, true);
};

// Export multer instance
export const profileUpload = multer({ storage, fileFilter });
