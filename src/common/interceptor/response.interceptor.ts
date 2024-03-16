import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { isNotEmptyObject } from "class-validator";
import { Observable, map } from "rxjs";
import { BaseRes } from "../model";
import { logger } from "config/logger";
const action = (method: string) => {
  switch (method) {
    case "GET":
      return "查询成功";
    case "POST":
      return "操作成功";
    case "PUT":
    case "PATCH":
      return "更新成功";
    case "DELETE":
      return "删除成功";
    default:
      return "响应成功";
  }
};
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { url, method, params, query, body, headers } = req;
    logger.info(
      `url:${url} method:${method} type:${headers["content-type"]} params:${JSON.stringify(params)} query:${JSON.stringify(query)} body:${JSON.stringify(body)}`,
    );
    return next.handle().pipe(
      map((value) => {
        console.log(value);
        return BaseRes.success(
          action(method),
          isNotEmptyObject ? value : null,
          0,
        );
      }),
    );
  }
}
