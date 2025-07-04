import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { RoleService } from "./role.service";
import { ZodParse } from "../../common/pipes/zodparse.pipe";
import { sendOk } from "../../response.util";
import {
  RoleCreateDto,
  RoleCreateSchema,
  RoleQueryDto,
  RoleQuerySchema,
} from "./dto/role.dto";

@Controller("role")
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Get()
  async findAll(@Query(new ZodParse(RoleQuerySchema)) dto: RoleQueryDto) {
    return sendOk(await this.service.findAll(dto));
  }

  @Post()
  async create(@Body(new ZodParse(RoleCreateSchema)) dto: RoleCreateDto) {
    return sendOk(await this.service.create(dto));
  }
}
