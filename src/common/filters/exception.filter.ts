import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { BaseRes } from "../model";
import { HttpAdapterHost } from "@nestjs/core";
import { logger } from "config/logger";
import { isString } from "class-validator";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const result = BaseRes.fail("未知错误，请联系管理员", 1);
    if (exception instanceof HttpException) {
      const error: any = exception.getResponse();
      result.code = exception.getStatus();
      result.msg = isString(error) ? error : error.message || error.error;
    } else {
      result.code = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    logger.error(exception);
    httpAdapter.reply(ctx.getResponse(), result, result.code);
  }
}
