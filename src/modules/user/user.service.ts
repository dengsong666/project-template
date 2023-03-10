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
   * 用户校验
   * @param data
   * @returns
   */
  async validateUser(data: UserEntity): Promise<any> {
    const { username, password } = data;
    const user = await this.findOne({ where: { username } });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      return isOk ? user : { code: 1, msg: '密码错误' };
    }
    return { code: 2, msg: '用户不存在' };
  }
  /**
   * 用户登录
   * @param data
   * @returns
   */
  async login(data: UserEntity): Promise<any> {
    const res = await this.validateUser(data);
    if (res.code) return res;
    const { id, username, role } = res;
    const payload = { username, id, role };
    return { token: this.jwtService.sign(payload), msg: '登录成功' };
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
  /**
   * 获取个人信息
   * @param token
   * @returns
   */
  async getProfile(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    return user || { code: 1, msg: '不存在该用户' };
  }
  /**
   * 密码修改
   * @param token
   * @param password
   * @returns
   */
  async setPassword(data: UserEntity) {
    const res = await this.validateUser(data);
    if (res.code) return res;
    return data.id ? this.repo.save(data) : { code: 1, msg: '不存在该用户' };
  }
}
