import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

import { Observable } from "rxjs";
import { AUTH_META } from "../constant";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 排除不需要验证的接口
    return true;
    if (
      this.reflector.getAllAndOverride(AUTH_META.PUBLIC, [
        context.getHandler(),
        context.getClass(),
      ])
    )
      return true;
    if (!context.switchToHttp().getRequest().headers.authorization)
      throw new UnauthorizedException("凭证是必须的");
    return super.canActivate(context);
  }
  handleRequest(err: any, user: any, info: any) {
    if (info?.name) {
      switch (info.name) {
        case "TokenExpiredError":
          throw new UnauthorizedException("凭证已经过期");
        case "JsonWebTokenError":
          throw new UnauthorizedException("无效的凭证");
      }
    }
    if (!user)
      throw (
        err ||
        new UnauthorizedException(info) ||
        new UnauthorizedException("不正确的凭证")
      );
    return user;
  }
}
