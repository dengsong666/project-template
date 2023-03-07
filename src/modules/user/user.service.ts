import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { UserPwdDTO } from './dto/user.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo) {
    super(repo);
  }
  async validateUser(dto: UserPwdDTO): Promise<any> {
    const { username, password } = dto;
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
  async autoRegister(dto: UserPwdDTO): Promise<UserEntity> {
    const pwdsalt = makeSalt();
    const user = new UserEntity();
    user.username = dto.username;
    user.password = encryptPassword(dto.password, pwdsalt);
    user.pwdsalt = pwdsalt;
    return this.repo.save(user);
  }
}
