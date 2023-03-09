import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
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
  async validateUser(data: UserEntity): Promise<any> {
    const { username, password } = data;
    const user = await this.findOne({ where: { username } });
    if (user) {
      console.log(await bcrypt.compare(password, user.password));

      if (await bcrypt.compare(password, user.password)) {
        const { id, role } = user;
        const payload = { username: data.username, id, role };
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
  async register(data: UserEntity): Promise<UserEntity> {
    const user = new UserEntity();
    user.username = data.username;
    user.password = data.password;
    user.role = data.role;
    return this.repo.save(user);
  }
  async getProfile(userToken: any) {
    const { id } = userToken ?? {};
    const user = await this.repo.findOne({ where: { id } });
    return user || { code: 1, msg: '不存在该用户' };
  }
  async setPassword(userToken: any, password: string) {
    const { id } = userToken ?? {};
    const userEntity = new UserEntity();
    userEntity.id = id;
    userEntity.password = password;
    return this.repo.save(userEntity) || { code: 1, msg: '不存在该用户' };
  }
}
