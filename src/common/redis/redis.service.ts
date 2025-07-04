import { Inject, Injectable } from "@nestjs/common";
import { REDIS_CLIENT } from "../../common/constants/database.constants";
import { RedisClient } from "./type";
import { PREFIX_AUTH_ACTIVE_USER } from "../constants/rbac.constant";

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: RedisClient,
  ) {}

  getClient() {
    return this.redis;
  }

  addActiveUser(username: string, token: string) {
    return this.redis.set(
      `${PREFIX_AUTH_ACTIVE_USER}${username.toLowerCase()}`,
      token,
    );
  }

  removeActiveUser(username: string) {
    return this.redis.del(
      `${PREFIX_AUTH_ACTIVE_USER}${username.toLowerCase()}`,
    );
  }

  getActiveUser(username: string) {
    return this.redis.get(
      `${PREFIX_AUTH_ACTIVE_USER}${username.toLowerCase()}`,
    );
  }
}
