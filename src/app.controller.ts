import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { NoAuth, Roles } from './common/decorator';
import { RolesGuard } from './common/guard/role.guard';

@Controller()
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}
  @NoAuth()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
