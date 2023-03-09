import { UserRole } from './../../../utils/enum';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
  validate,
} from 'class-validator';
import { password, phone } from 'src/utils/regexp';
export class UserDTO {
  @IsOptional()
  @Matches(phone, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  readonly mobile: string;

  @IsOptional()
  @IsNotEmpty({ message: '请输入用户名' })
  readonly username: string;

  @IsOptional()
  @Matches(password, {
    message: '密码长度8-16位，至少1个大写字母，1个小写字母和1个数字',
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
  readonly newPassword?: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: '角色类型仅有admin和user' })
  readonly role: UserRole;
}

export interface UserToken {
  id: string;
  username: string;
  role: string;
}
