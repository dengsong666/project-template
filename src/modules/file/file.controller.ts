/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@Body() data, @UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
