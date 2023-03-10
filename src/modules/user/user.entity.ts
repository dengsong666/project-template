import { BaseEntity } from 'config/database';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from 'src/utils/enum';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
  validate,
} from 'class-validator';
import { password, phone } from 'src/utils/regexp';
import * as bcrypt from 'bcrypt';
@Entity('user')
export class UserEntity extends BaseEntity {
  @IsOptional()
  @IsNotEmpty({ message: '请输入用户名' })
  @Column({ length: 100, unique: true, update: false, comment: '用户名' })
  username: string;

  @Column({ length: 100, nullable: true, comment: '昵称' })
  nickname: string;

  @Column({ type: 'int', nullable: true, comment: '年龄' })
  age: number;

  @IsOptional()
  @Matches(phone, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @Column({ nullable: true, comment: '手机号' })
  phone: number;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: '角色类型仅有admin和user' })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.GHOST })
  role: UserRole;

  @IsOptional()
  @Matches(password, {
    message: '密码长度8-16位，至少1个大写字母，1个小写字母和1个数字',
  })
  @IsNotEmpty({ message: '请输入密码' })
  @Column({ comment: '密码', nullable: true })
  @Exclude()
  password: string;

  @IsOptional()
  @Matches(password, {
    message: '新密码长度8-16位，至少1个大写字母，1个小写字母和1个数字',
  })
  @IsNotEmpty({ message: '请输入新密码' })
  newPassword: string;

  @BeforeInsert()
  async encryptPwd2() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
