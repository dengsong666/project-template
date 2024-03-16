import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/common/decorator";
import {
  User,
  UserLoginDto,
  UserQueryDto,
  UserRegisterDto,
} from "./user.entity";
import { UserService } from "./user.service";

@ApiTags("用户")
// @ApiBearerAuth()
@Controller("user")
// @UseGuards(RolesGuard)
export class UserController {
  constructor(private service: UserService) {}
  /**
   * 用户登录
   */
  @Public()
  @Post("login")
  login(@Body() data: UserLoginDto) {
    return this.service.login(data);
  }
  /**
   * 用户注册
   */
  @Public()
  @Post("register")
  register(@Body() data: UserRegisterDto) {
    return this.service.register(data);
  }
  /**
   * 获取用户
   */
  @Get()
  queryUsers(@Query() query: UserQueryDto) {
    return this.service.findPageBy(query);
  }
  /**
   * 查询用户以及相关配置
   */
  @Get(":id")
  queryUser(@Param("id") id: number) {
    return this.service.findOne({
      where: { id },
      relations: { profile: true, roles: true },
    });
  }
  /**
   * 修改用户
   */
  @Put()
  updateUser(@Body() data: User) {
    this.service.update({ id: data.id }, data);
  }
  /**
   * 删除用户
   */
  @Delete(":id")
  delUser(@Param("id") id: number) {
    this.service.softDelete({ id });
  }
  /**
   * 设置角色
   */
  @Put(":id/role")
  setRoles(@Param("id") id: number, @Body() roleIds: number[]) {
    return this.service.setRoles(id, roleIds);
  }
  // 修改个人密码
  // @Patch("password")
  // password(@Req() request: Request, @Body() data: UserEntity): Promise<any> {
  //   const { id, username } = request.user as any;
  //   data.id = id;
  //   data.username = username;
  //   return this.service.setPassword(plainToInstance(UserEntity, data));
  // }
}
