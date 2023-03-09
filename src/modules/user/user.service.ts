import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { plainToClass, plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { UserDTO, UserToken } from './dto/user.dto';
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
  async validateUser(dto: UserDTO): Promise<any> {
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
  /**
   * 用户注册
   * @param dto
   * @returns
   */
  async register(dto: UserDTO): Promise<UserEntity> {
    const user = new UserEntity();
    user.username = dto.username;
    user.password = dto.password;
    user.role = dto.role;
    return this.repo.save(user);
  }
  async getProfile(userToken: UserToken) {
    const { id } = userToken ?? {};
    const user = await this.repo.findOne({ where: { id } });
    return user || { code: 1, msg: '不存在该用户' };
  }
  async setPassword(userToken: UserToken, dto: UserDTO): Promise<UserEntity> {
    const user = new UserEntity();
    user.username = userToken.username;
    user.password = dto.newPassword;
    console.log(user);

    return this.repo.save(user);
  }
}
