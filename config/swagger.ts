import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { knife4jSetup } from "nest-knife4j";

export default function (app: any) {
  // 创建Swagger文档
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle("测试 API")
      .setDescription("这是测试API文档")
      .setVersion("1.0")
      .setContact("666", "https://github.com/dengsong666", "ds@qq.com")
      .addTag("测试")
      .addBearerAuth()
      .build(),
  );

  // 设置`/api`路由为Swagger文档及其UI的主页
  SwaggerModule.setup("api", app, document);
  // 设置knife4j为新皮肤
  knife4jSetup(app, [
    {
      name: "1.X版本",
      url: `/api-json`,
      swaggerVersion: "3.0",
      location: `/api-json`,
    },
  ]);
}
