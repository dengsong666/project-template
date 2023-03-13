/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import * as fs from 'fs';
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
    console.log(files);
    files.forEach((file) => {
      fs.writeFileSync(file.originalname, file.buffer);
    });
  }
}
