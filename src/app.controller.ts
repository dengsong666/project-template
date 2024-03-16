import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { Public } from "./common/decorator";
import { RolesGuard } from "./common/guard/role.guard";

@Controller()
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
