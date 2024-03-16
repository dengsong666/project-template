import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { ApiTags } from "@nestjs/swagger";
import { Role } from "./role.entity";

@ApiTags("角色")
@Controller("role")
export class RoleController {
  constructor(private readonly service: RoleService) {}

  /**
   * 创建角色
   */
  @Post()
  async addRole(@Body() data: Role) {
    return this.service.save(data);
  }
  /**
   * 查询角色
   */
  @Get(":id")
  queryRole(@Param("id") id: number) {
    return this.service.findOneBy({ id });
  }
  /**
   * 修改角色
   */
  @Put()
  updateRole(@Body() data: Role) {
    this.service.update({ id: data.id }, data);
  }
  /**
   * 删除角色
   */
  @Delete(":id")
  async delRole(@Param("id") id: number) {
    const role = await this.service.findOneBy({ id });
    // this.service.softDelete({ id });
    this.service.remove(role);
  }
}
