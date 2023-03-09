import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserPwdDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass, plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repo,
    private readonly jwtService: JwtService,
  ) {
    super(repo);
  }
  /**
   * 用户密码验证用户
   * @param dto
   * @returns
   */
  async validateUser(dto: UserPwdDTO): Promise<any> {
    const { username, password } = dto;
    const user = await this.findOne({ where: { username } });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const { id, role } = user;
        const payload = { username: dto.username, id, role };
        return { token: this.jwtService.sign(payload), msg: '登录成功' };
      } else return { code: 1, msg: '密码错误' };
    }
    return { code: 2, msg: '用户不存在' };
  }

  async setUsernamePassword(dto: UserPwdDTO): Promise<UserEntity> {
    const user = new UserEntity();
    user.username = dto.username;
    user.password = dto.password;
    return this.repo.save(user);
  }
}
