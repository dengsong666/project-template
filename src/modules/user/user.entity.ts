import { BaseEntity } from 'config/database';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from 'src/utils/enum';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
  Max,
  Min,
  min,
  validate,
} from 'class-validator';
import { password, phone } from 'src/utils/regexp';
import * as bcrypt from 'bcrypt';
import { async } from 'rxjs';
@Entity('user')
export class UserEntity extends BaseEntity {
  @IsOptional()
  @IsNotEmpty({ message: '请输入用户名' })
  @Column({ length: 100, unique: true, update: false, comment: '用户名' })
  username: string;

  @IsOptional()
  @Column({ length: 100, nullable: true, comment: '昵称' })
  nickname: string;

  @IsOptional()
  @Max(150, { message: '年龄最大值为150' })
  @Min(1, { message: '年龄最小值为1' })
  @IsInt({ message: '请输入整数' })
  @Column({ type: 'int', nullable: true, comment: '年龄' })
  age: number;

  @IsOptional()
  @Matches(phone, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @Column({
    nullable: true,
    comment: '手机号',
    transformer: {
      from: (v: string) => {
        console.log('phone from:' + v);

        return v;
      },
      to: (v: string) => {
        console.log('phone to:' + v);
        return v;
        // return bcrypt.hashSync(v, bcrypt.genSaltSync(10));
      },
    },
  })
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
  @Exclude({ toPlainOnly: true })
  @Column({
    comment: '密码',
    transformer: {
      from: (v: string) => {
        console.log('from:' + v);

        return v;
      },
      to: (v: string) => {
        console.log('to:' + v);

        return bcrypt.hashSync(v, bcrypt.genSaltSync(10));
      },
    },
  })
  password: string;

  @IsOptional()
  @Matches(password, {
    message: '新密码长度8-16位，至少1个大写字母，1个小写字母和1个数字',
  })
  @IsNotEmpty({ message: '请输入新密码' })
  @Exclude({ toPlainOnly: true })
  newPassword: string;
}
