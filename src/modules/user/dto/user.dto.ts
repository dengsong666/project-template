import { IsNotEmpty, Matches } from 'class-validator';
import { password, phone } from 'src/utils/regexp';

export class UserPwdDTO {
  @IsNotEmpty({ message: '请输入用户名' })
  readonly username: string;

  @Matches(password, {
    message: '密码长度8-16位，至少1个大写字母，1个小写字母和1个数字',
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}

export class PhoneRegisterDTO {
  @Matches(phone, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  readonly mobile: string;

  @IsNotEmpty({ message: '请输入用户名' })
  readonly username: string;

  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}
