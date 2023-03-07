import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    return next.handle().pipe(
      map((data) => {
        console.log(context.switchToHttp().getRequest());
        // console.log(context.switchToHttp().getResponse());

        return {
          data,
          code: 0,
          message: '请求成功',
        };
      }),
    );
  }
}
