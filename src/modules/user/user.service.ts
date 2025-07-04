import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { ApplicationError } from "../../applicationError";
import { UserCreateDto, UserLoginDto } from "./dto/user.dto";
import User from "./user.entity";
import { encryptPassword, validatePassword } from "../../common/utils/utils";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "../../common/redis/redis.service";

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
    private readonly user: UserRepository,
  ) {}

  async login(userLoginDto: UserLoginDto) {
    //todo 可以加上驗證碼, 從redis讀取驗證碼
    const user = await this.user.findOneByUsername(userLoginDto.name);

    const match = await validatePassword(userLoginDto.password, user.password);
    if (!match) {
      throw new ApplicationError("errors.B005");
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
    });
    await this.redis.addActiveUser(user.name, token);
    return {
      token,
      user,
      // roles,
      // permissions,
    };
  }

  async logout(name: string) {
    await this.redis.removeActiveUser(name);
  }

  async create(user: UserCreateDto): Promise<User> {
    const exist = await this.nameExist(user.name);
    if (exist) {
      throw new ApplicationError("errors.B001");
    }
    const createOptions: { data: { name: string; [key: string]: any } } = {
      data: {
        name: user.name,
      },
    };
    if (user?.password) {
      const encryptedPassword = await encryptPassword(user.password);
      createOptions.data.password = encryptedPassword;
    }
    return this.user.create(createOptions as any);
  }

  async nameExist(name: string): Promise<boolean> {
    return await this.user.nameExist(name);
  }

  async findById(id: number) {
    return await this.user.findById(id);
  }

  async findByIdWithRolePermission(id: number) {
    const [user] = await Promise.all([
      this.findById(id),
      // this.roleService.findUserRolesById(id),
    ]);

    return user;
  }
}
