import { Global, Module } from "@nestjs/common";
import { redisProvider } from "./redis.providers";
import { RedisService } from "./redis.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [...redisProvider, RedisService],
  exports: [...redisProvider, RedisService],
})
export class RedisModule {}
