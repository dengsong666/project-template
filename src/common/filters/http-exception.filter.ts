/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFiter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    /**
     * error         eg:throw new HttpException('error', HttpStatus.BAD_REQUEST);
     * error.message eg:throw new BadRequestException('error')
     * error.error   eg:throw new BadRequestException()
     */
    const error: any = exception.getResponse();

    response.status(status).json({
      status: status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      error: typeof error == 'string' ? error : error.message || error.error,
    });
  }
}
