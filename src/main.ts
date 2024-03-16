import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import useSwagger from "../config/swagger";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/exception.filter";
import { JwtAuthGuard } from "./common/guard/auth.guard";
import { ResponseInterceptor } from "./common/interceptor/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  useSwagger(app); // swagger
  app.useStaticAssets("public");
  app.useGlobalInterceptors(new ResponseInterceptor()); // 结果格式化
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // 结果序列化
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector))); // jwt守卫
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost))); // 异常过滤器
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // 请求验证
  app.use(helmet()); // 防止跨站脚本攻击
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
  app.set("trust proxy", 1);
  await app.listen(process.env.APP_LISTEN_PORT);
}
bootstrap();
