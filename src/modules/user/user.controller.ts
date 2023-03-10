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
import { NoAuth, Roles } from 'src/common/decorator';
import { RolesGuard } from 'src/common/guard/role.guard';
import { Request } from 'express';
import { UserRole } from 'src/utils/enum';
@Crud({
  model: { type: UserEntity },
  routes: {
    exclude: ['createOneBase'],
    getManyBase: {
      decorators: [Roles(UserRole.ADMIN)],
    },
  },
  dto: {
    update: UserEntity,
  },
  query: {
    join: {
      profile: {
        persist: ['username'],
        exclude: ['token'],
        eager: true,
      },
    },
  },
})
@Controller('user')
@UseGuards(RolesGuard)
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}
  // 登录测试
  @NoAuth()
  @Post('login')
  async login(@Body() data: UserEntity): Promise<any> {
    return this.service.login(data);
  }
  @NoAuth()
  @Post('register')
  async register(@Body() data: UserEntity) {
    return this.service.register(data);
  }
  @Get('profile')
  async profile(@Req() request: Request): Promise<any> {
    const { id, username } = request.user as any;
    return this.service.getProfile(id);
  }
  @Patch('password')
  async password(
    @Req() request: Request,
    @Body() data: UserEntity,
  ): Promise<any> {
    const { id, username } = request.user as any;
    data.id = id;
    data.username = username;
    return this.service.setPassword(data);
  }
}
