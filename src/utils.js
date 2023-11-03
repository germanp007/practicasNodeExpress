import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/public/images"));
  },

  filename: (req, file, cb) => {
    cb(null, `${req.body.name}-${file.originalname}`);
  },
});

export const uploader = multer({ storage });
