import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserPwdDTO } from './dto/user.dto';
import { NoAuth, Roles } from 'src/common/decorator';
import { RolesGuard } from 'src/common/guard/role.guard';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserRole } from 'src/utils/enum';
@Crud({
  model: { type: UserEntity },
  routes: {
    exclude: ['createOneBase'],
    getManyBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
  },
})
@Controller('user')
@UseGuards(RolesGuard)
export class UserController implements CrudController<UserEntity> {
  constructor(
    public service: UserService,
    private readonly jwtService: JwtService,
  ) {}
  // 登录测试
  @NoAuth()
  @Post('login')
  async login(@Body() dto: UserPwdDTO): Promise<any> {
    const { code, user } = await this.service.validateUser(dto);
    switch (code) {
      case 0:
        const response = await this.service.autoRegister(dto);
        return plainToInstance(UserEntity, { ...response, msg: '注册成功' });
      case 1:
        const { id, role } = user;
        const payload = { username: dto.username, id, role };
        return { token: this.jwtService.sign(payload), msg: '登录成功' };
      case 2:
        return { code: 1, msg: '密码错误' };
    }
  }

  @Roles(UserRole.USER, UserRole.ADMIN)
  @Get('profile')
  async getProfile(@Req() request: Request): Promise<any> {
    const { id } = (request.user as any) ?? {};
    const user = await this.service.findOne({ where: { id } });
    return user || { code: 1, msg: '不存在该用户' };
  }
}
