import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as crypto from "crypto";
import * as path from "path";

export default MulterModule.register({
  dest: "public/upload",
  storage: diskStorage({
    //自定义路径
    destination: `public/upload`,
    filename: (req, file, cb) =>
      cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`),
  }),
});
