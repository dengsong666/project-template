import { Strategy, ExtractJwt } from 'passport-jwt';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }
  async validate(request: Request, { id, username, role }) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request as any);
    const cacheToken = await this.cacheManager.get(`${id}&${username}&${role}`);
    if (!cacheToken) {
      throw new UnauthorizedException('token 已过期');
    }
    if (token != cacheToken) {
      throw new UnauthorizedException('token不正确');
    }
    this.cacheManager.set(
      `${id}&${username}&${role}`,
      token,
      24 * 60 * 60 * 1000,
    );
    return { id, username, role };
  }
}
