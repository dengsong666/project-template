import { IsNotEmpty, Matches } from 'class-validator';
import { phone } from 'src/utils/regexp';

export class RegisterDTO {
  @IsNotEmpty({ message: '请输入用户名' })
  readonly username: string;

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
