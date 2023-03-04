import { Request } from "express";
import multer, { diskStorage } from "multer";
import path from "path";
/** 
 * storage - 
 */
const storage = diskStorage({
  destination: "/tmp/uploads",
  filename(_req, file, cb) {
    let filename: string = `${file.fieldname}-${Date.now()}-${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, accepted: boolean) => void
) => {
  let pattern: RegExp = /jpg|png|svg/;
  if (pattern.test(path.extname(file.originalname))) return cb(null, true);
  cb(new Error("Error: not a valid file type"), false);
};
const upload = multer({ storage });
export default upload;
