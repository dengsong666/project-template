import { password } from 'src/utils/regexp';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { isArray, isNotEmptyObject } from 'class-validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const action = (method: string) => {
  switch (method) {
    case 'GET':
      return '查询成功';
    case 'POST':
      return '创建成功';
    case 'PUT':
    case 'PATCH':
      return '更新成功';
    case 'DELETE':
      return '删除成功';
    default:
      return '操作成功';
  }
};
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        const { code = 0, msg = '', ...data } = value ?? {};
        const { method } = context.switchToHttp().getRequest();
        delete data.password;
        return {
          data: isNotEmptyObject(data) ? (isArray(value) ? value : data) : null,
          msg: msg || action(method),
          code,
        };
      }),
    );
  }
}
