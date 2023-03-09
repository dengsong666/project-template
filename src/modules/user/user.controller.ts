import { password } from 'src/utils/regexp';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserDTO, UserToken } from './dto/user.dto';
import { NoAuth, Roles } from 'src/common/decorator';
import { RolesGuard } from 'src/common/guard/role.guard';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserRole } from 'src/utils/enum';
import { AuthGuard } from '@nestjs/passport';
import { PickKeysByType } from 'typeorm/common/PickKeysByType';
@Crud({
  model: { type: UserEntity },
  routes: {
    exclude: ['createOneBase'],
    getManyBase: {
      // decorators: [Roles(UserRole.ADMIN)],
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
  async login(@Body() data: UserDTO): Promise<any> {
    return this.service.validateUser(data);
  }
  @NoAuth()
  @Post('register')
  async register(@Body() data: UserDTO) {
    return this.service.register(data);
  }
  @Get('profile')
  async getProfile(@Req() request: Request): Promise<any> {
    return this.service.getProfile(request.user as UserToken);
  }

  @Patch('password')
  password(@Req() request: Request, @Body() data: UserDTO) {
    return this.service.setPassword(request.user as UserToken, data);
  }
}
