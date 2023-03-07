import { Body, Controller, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserPwdDTO } from './dto/user.dto';
import { NoAuth } from 'src/common/decorator';

@Crud({
  model: { type: UserEntity },
})
@Controller('user')
export class UserController implements CrudController<UserEntity> {
  constructor(
    public service: UserService,
    private readonly jwtService: JwtService,
  ) {}
  // 登录测试
  @NoAuth()
  @Post('login')
  async login(@Body() dto: UserPwdDTO) {
    const { code, user } = await this.service.validateUser(dto);
    switch (code) {
      case 0:
        return this.service.autoRegister(dto);
      case 1:
        const payload = { username: dto.username, sub: user.id };
        return { token: this.jwtService.sign(payload), msg: '登录成功' };
      case 2:
        return { code: 1, msg: '密码错误' };
    }
  }
}
