import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { isInstance } from "class-validator";
import { UserService } from "../../modules/user/user.service";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    private readonly redis: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    const hasBearerToken = Boolean(type === "Bearer" && token);
    if (hasBearerToken) {
      try {
        let name = "admin";
        let id: number = 1;
        if (process.env.NODE_ENV === "local") {
          /* empty */
        } else {
          const payload: { id: number; name: string } =
            await this.jwtService.verifyAsync(token, {
              secret: process.env.JWT_SECRET,
            });

          id = payload.id;
          name = payload.name;

          const active_token = await this.redis.getActiveUser(name);
          if (token !== active_token) {
            throw new UnauthorizedException("token expired");
          }
        }

        request.user = await this.userService.findByIdWithRolePermission(id);
        return true;
      } catch (e: any) {
        if (isInstance(e, TokenExpiredError)) {
          throw new UnauthorizedException("token expired");
        }
        throw e;
      }
    }
    throw new UnauthorizedException();
  }
}
