import { FileController } from "./modules/common/file/file.controller";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { EmailModule } from "./modules/common/email/email.module";
import config from "config";
import { UserModule } from "./modules/user/user.module";
import { ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { TaskModule } from "./modules/common/task/task.module";
import { OssModule } from "./modules/common/oss/oss.module";
import { OrderModule } from "./modules/order/order.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { ProductModule } from "./modules/product/product.module";
import { RoleModule } from "./modules/role/role.module";
console.log(config);

@Module({
  imports: [
    ...config,
    EmailModule,
    UserModule,
    ScheduleModule.forRoot(),
    TaskModule,
    OssModule,
    OrderModule,
    ProductModule,
    ProfileModule,
    RoleModule,
  ],
  controllers: [FileController, AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("/");
  }
}
