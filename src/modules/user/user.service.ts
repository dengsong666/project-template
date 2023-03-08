import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserPwdDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass, plainToInstance } from 'class-transformer';
@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo) {
    super(repo);
  }
  async validateUser(dto: UserPwdDTO): Promise<any> {
    const { username, password } = dto;
    const user = await this.findOne({ where: { username } });
    if (user) {
      if (await bcrypt.compare(password, user.password))
        return { code: 1, user }; // 密码正确
      else return { code: 2, user: null }; // 密码错误
    }
    return { code: 0, user };
  }

  async setUsernamePassword(dto: UserPwdDTO): Promise<UserEntity> {
    const user = new UserEntity();
    user.username = dto.username;
    user.password = dto.password;
    return this.repo.save(user);
  }
}
