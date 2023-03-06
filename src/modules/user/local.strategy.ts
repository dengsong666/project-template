import { UserService } from './user.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// 本地策略非必须
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    console.log(username, password);
    const user = await this.userService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
