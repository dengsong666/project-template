import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Crud({
  model: { type: UsersEntity },
  params: {},
  routes: {
    exclude: ['createOneBase'],
    deleteOneBase: {
      returnDeleted: true,
    },
  },
})
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  // 登录测试
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: UsersEntity) {
    const code = this.userService.validateUser(user.username, user.password);

    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
  @UseGuards(AuthGuard('jwt'))
  @Get('user/:id')
  getProfile(@Param() id) {
    return id;
  }
}
