import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { Roles } from './common/decorator/roles.decorator';
import { RolesGuard } from './common/guard/role.guard';

@Controller()
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Roles('admin')
  getHello(): string {
    // console.log(process.env.DATABASE_PASSWORD);
    // throw new ForbiddenException('ddd');
    return this.appService.getHello();
  }
}
