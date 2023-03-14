/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
const fileValidators = [
  // new MaxFileSizeValidator({ maxSize: 1000 }),
  // new FileTypeValidator({ fileType: 'image/jpeg' }),
];
@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(
    @UploadedFiles(new ParseFilePipe({ validators: fileValidators }))
    files: Array<Express.Multer.File>,
  ) {
    return files.map(({ path }) =>
      path.replace('public', '').replace(/\\/g, '/'),
    );
  }
}
