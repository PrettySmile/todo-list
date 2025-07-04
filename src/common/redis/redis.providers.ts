import Redis from "ioredis";
import { REDIS_CLIENT } from "../../common/constants/database.constants";
import { ConfigService } from "@nestjs/config";

export const redisProvider = [
  {
    provide: REDIS_CLIENT,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const redisUrl = configService.get<string>("REDIS_URL");
      if (!redisUrl) {
        throw new Error(`invalid redis connection config`);
      }

      const redis = new Redis(redisUrl, {
        retryStrategy: (times) => {
          console.error(
            `Redis of ${redisUrl} connect error: at ${times}th retry...`,
          );
          const delay = Math.min(times * 1000, 15000);
          return delay;
        },
        commandTimeout: 5000,
        connectTimeout: 10000,
        maxRetriesPerRequest: 3,
        enableReadyCheck: false,
        keepAlive: 10000,
        keyPrefix: "{todo-list}:",
        reconnectOnError: (err) => {
          const targetError = "READONLY";
          if (err.message.includes(targetError)) {
            return true;
          }
          return false;
        },
      });

      redis.on("error", (err) => {
        console.error(`Redis of ${redisUrl} connect error: ${err}`);
      });

      redis.on("connect", () => {
        console.log(`Redis of ${redisUrl} connect success`);
      });

      return redis;
    },
  },
];
