import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Cache } from "cache-manager";
import { logger } from "config/logger";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "src/common/constant";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
      passReqToCallback: true,
    });
  }
  async validate(request: Request, { id, username }) {
    logger.addContext("user", id + "-" + username);
    // console.log(request.headers.get("authorization"));
    return { id, username };
  }
}
