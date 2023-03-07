import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo) {
    super(repo);
  }
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOne({ where: { username } });
    if (user) {
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      if (user.password === encryptPassword(password, user.pwdsalt))
        return { code: 1, user }; // 密码正确
      else return { code: 2, user: null }; // 密码错误
    }
    return { code: 0, user };
  }
  /**
   * 用户名密码自动注册
   * @param username
   * @param password
   */

  async register(username, password): Promise<UserEntity> {
    const pwdsalt = makeSalt();
    const a = this.repo.save({
      username,
      password: encryptPassword(password, pwdsalt), // 加密密码
      pwdsalt,
    });
    console.log(typeof a);

    return a;
  }
}
