import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFiter } from './common/filters/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(new LoggerMiddleware());
  app.useGlobalFilters(new HttpExceptionFiter());
  await app.listen(3000);
}
bootstrap();
