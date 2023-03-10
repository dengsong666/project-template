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
      const isOk = bcrypt.compare(password, user.password);
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
    const { username, password } = data;
    const user = await this.findOne({ where: { username } });
    const { id, password: pwd, role } = user;
    if (user) {
      if (bcrypt.compareSync(password, pwd))
        return {
          token: this.jwtService.sign({ username, id, role }),
          msg: '登录成功',
        };
      else return { code: 1, msg: '密码错误' };
    }
    return { code: 2, msg: '用户不存在' };
  }
  /**
   * 用户注册
   * @param data
   * @returns
   */
  async register(data: UserEntity): Promise<any> {
    const { username, password } = data;
    const user = await this.findOne({ where: { username } });
    if (user) return { code: 2, msg: '用户已存在' };
    return this.repo.save(plainToInstance(UserEntity, { username, password }));
  }
  /**
   * 个人信息
   * @param data
   * @param isGet 是否获取
   * @returns
   */
  async profile(data: UserEntity, isGet = true) {
    if (isGet) return this.findOne({ where: { id: data.id } });
    else {
      if (data.password || data.newPassword) this.throwBadRequestException();
      return this.repo.save(plainToInstance(UserEntity, data));
    }
  }
  /**
   * 密码修改
   * @param password
   * @returns
   */
  async setPassword(data: UserEntity) {
    const { username, password, newPassword } = data;
    const user = await this.findOne({ where: { username } });
    if (bcrypt.compareSync(password, user.password)) {
      data.password = newPassword;
      return this.repo.save(plainToInstance(UserEntity, data));
    } else return { code: 1, msg: '原密码错误' };
  }
}
