import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "reflect-metadata";
import { ApplicationErrorFilter } from "./applicationError.filter";
import { I18nService } from "nestjs-i18n";
import { ValidationPipe } from "./common/pipes/validation.pipe";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全域的錯誤處理器
  app.useGlobalFilters(new ApplicationErrorFilter(app.get(I18nService)));

  app.useGlobalPipes(new ValidationPipe());

  // Swagger 設定
  const config = new DocumentBuilder()
    .setTitle("Todo List API")
    .setDescription("Todo 任務清單後台 API 文件")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      "jwt",
    )
    .addSecurityRequirements("jwt") //全域套用，告訴 Swagger 所有 API 都要用 jwt 認證
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document); // http://localhost:3000/docs
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      persistAuthorization: true, // ✅ 保持登入狀態, 按 F5 不會清掉 token
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
