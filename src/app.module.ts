import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonLoader,
  I18nModule,
  QueryResolver,
} from "nestjs-i18n";
import path from "path";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./common/guards/auth.guard";
import { JwtService } from "@nestjs/jwt";
import { TaskModule } from "./modules/task/task.module";
import { UserModule } from "./modules/user/user.module";
import { RedisModule } from "./common/redis/redis.module";
import { ConfigModule } from "@nestjs/config";
import { RoleModule } from "./modules/role/role.module";
import { TaskCommentModule } from "./modules/task-comment/task-comment.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: "zh",
        loader: I18nJsonLoader,
        loaderOptions: {
          path: path.join(__dirname, "/i18n/"),
          watch: true,
          debug: true,
        },
        throwOnMissingKey: true,
      }),
      resolvers: [
        new QueryResolver(["lang", "l"]),
        new HeaderResolver(["x-custom-lang"]),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
    }),
    RedisModule,
    UserModule,
    RoleModule,
    TaskModule,
    TaskCommentModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtService,
    AppService,
  ],
})
export class AppModule {}
