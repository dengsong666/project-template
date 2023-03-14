import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { CrudConfigService } from '@nestjsx/crud';
CrudConfigService.load({
  query: {
    alwaysPaginate: true,
    maxLimit: 100,
    cache: 2000,
  },
  routes: {
    deleteOneBase: {
      returnDeleted: true,
    },
  },
});
import { AppModule } from './app.module';
import { HttpExceptionFiter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { JwtAuthGuard } from './common/guard/auth.guard';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useStaticAssets('public');
  app.useGlobalInterceptors(new ResponseInterceptor()); // 结果格式化
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // 结果序列化
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector))); // jwt守卫
  app.useGlobalFilters(new HttpExceptionFiter()); // 异常过滤器
  app.useGlobalPipes(new ValidationPipe()); // 请求验证
  app.use(helmet()); // 防止跨站脚本攻击
  await app.listen(process.env.APP_LISTEN_PORT);
}
bootstrap();
