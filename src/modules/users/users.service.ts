import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';

@Injectable()
export class UsersService extends TypeOrmCrudService<UsersEntity> {
  constructor(@InjectRepository(UsersEntity) repo) {
    super(repo);
  }
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOne({ where: { username } });
    if (user) {
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      if (user.password === encryptPassword(password, user.pwdsalt)) {
        return { code: 1, user }; // 密码正确
      } else {
        return { code: 2, user: null }; // 密码错误
      }
    }
    return null;
  }
  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(user: UsersEntity): Promise<any> {
    const { username, password } = user;
    if (await this.findOne({ where: { username } })) {
      return {
        code: 7,
        msg: '用户已存在',
      };
    }
    const hashPwd = encryptPassword(password, makeSalt()); // 加密密码

    // this.createOne();
  }
}
