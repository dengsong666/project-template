import { BaseEntity } from 'config/database';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
} from 'typeorm';
import { UserRole } from 'src/utils/enum';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { password, phone } from 'src/utils/regexp';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity extends BaseEntity {
  @IsOptional()
  @IsNotEmpty({ message: '请输入用户名' })
  @Column({ length: 100, unique: true, update: false })
  username: string;

  @IsOptional()
  @Column({ length: 100, nullable: true })
  nickname: string;

  @IsOptional()
  @Column({ length: 100, nullable: true })
  avatar: string;

  @IsOptional()
  @Max(150, { message: '年龄最大值为150' })
  @Min(1, { message: '年龄最小值为1' })
  @IsInt({ message: '请输入整数' })
  @Column({ type: 'int', nullable: true })
  age: number;

  @IsOptional()
  @Matches(phone, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: '角色类型仅有admin和user' })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @IsOptional()
  @Matches(password, {
    message: '密码长度8-16位，至少1个大写字母，1个小写字母和1个数字',
  })
  @IsNotEmpty({ message: '请输入密码' })
  @Column({ comment: '密码' })
  password: string;

  @IsOptional()
  @Matches(password, {
    message: '新密码长度8-16位，至少1个大写字母，1个小写字母和1个数字',
  })
  @IsNotEmpty({ message: '请输入新密码' })
  newPassword: string;

  @BeforeInsert()
  @BeforeUpdate()
  encrypt() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    }
  }
}
