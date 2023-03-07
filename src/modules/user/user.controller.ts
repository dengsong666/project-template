import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { classToPlain, instanceToPlain } from 'class-transformer';

@Crud({
  model: { type: UserEntity },
  params: {},
  routes: {
    // exclude: ['createOneBase'],
    deleteOneBase: {
      returnDeleted: true,
    },
  },
  // query: {
  //   exclude: ['password', 'pwdsalt'],
  // },
})
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private service: UserService,
    private readonly jwtService: JwtService,
  ) {}
  // 登录测试
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() { username, password }) {
    const { code, user } = await this.service.validateUser(username, password);
    switch (code) {
      case 0:
        const b = await this.service.register(username, password);
        return b;
      case 1:
        const payload = { username, sub: user.id };
        return {
          token: this.jwtService.sign(payload),
        };
      case 2:
        return { msg: '密码错误' };
    }
  }
  // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
  // @UseGuards(AuthGuard('jwt'))
  // @Get(':id')
  // getProfile(@Param() id) {
  //   return id;
  // }
}
