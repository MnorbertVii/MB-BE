import multer, { StorageEngine } from "multer";

const storage: StorageEngine = multer.diskStorage({
  filename: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, file.originalname);
  },
});

const upload: multer.Multer = multer({ storage: storage });

export default upload;