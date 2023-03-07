import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFiter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { CrudConfigService } from '@nestjsx/crud';
import { JwtAuthGuard } from './common/guard/auth.guard';
CrudConfigService.load({
  query: {
    maxLimit: 100,
    cache: 2000,
  },
  routes: {
    deleteOneBase: {
      returnDeleted: true,
    },
  },
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor()); // 结果格式化
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // 结果序列化
  app.useGlobalFilters(new HttpExceptionFiter()); // 异常过滤器
  app.useGlobalPipes(new ValidationPipe()); // 请求验证
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector))); // jwt守卫
  await app.listen(process.env.APP_LISTEN_PORT);
}
bootstrap();
