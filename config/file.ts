import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as dayjs from 'dayjs';
export default MulterModule.register({
  dest: './upload',
  storage: diskStorage({
    //自定义路径
    destination: `./upload/${dayjs().format('YYYY-MM-DD')}`,
    filename: (req, file, cb) => cb(null, crypto.randomUUID()),
  }),
});
