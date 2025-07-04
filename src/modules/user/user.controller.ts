import { Body, Controller, Post, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import {
  UserCreateDto,
  UserCreateSchema,
  UserLoginDto,
  UserLoginSchema,
} from "./dto/user.dto";
import { ZodParse } from "../../common/pipes/zodparse.pipe";
import { Public } from "../../common/decorators/public.decorator";
import { sendOk } from "../../response.util";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  UserCreateSwaggerDto,
  UserLoginSwaggerDto,
} from "./dto/user.swagger.dto";

@ApiTags("使用者")
@Controller("user")
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: "建立新使用者" })
  @ApiBody({ type: UserCreateSwaggerDto })
  async create(@Body(new ZodParse(UserCreateSchema)) user: UserCreateDto) {
    return await this.service.create(user);
  }

  @Post("login")
  @Public()
  @ApiOperation({ summary: "使用者登入" })
  @ApiBody({ type: UserLoginSwaggerDto })
  async login(@Body(new ZodParse(UserLoginSchema)) userLoginDto: UserLoginDto) {
    return await this.service.login(userLoginDto);
  }

  @Post("logout")
  @ApiOperation({ summary: "使用者登出" })
  async logout(@Request() req: any) {
    return sendOk(await this.service.logout(req.user.name));
  }
}
