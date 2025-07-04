import { Injectable } from "@nestjs/common";
import { ApplicationError } from "../../applicationError";
import { RoleCreateDto, RoleQueryDto } from "./dto/role.dto";
import { RoleRepository } from "./role.repository";

@Injectable()
export class RoleService {
  constructor(private readonly repo: RoleRepository) {}

  async findAll(dto: RoleQueryDto) {
    return this.repo.findAll(dto);
  }

  async create(dto: RoleCreateDto) {
    const exist = await this.nameExist(dto.name);
    if (exist) {
      throw new ApplicationError("errors.C001", { name: dto.name });
    }

    return await this.repo.createRole(dto);
  }

  async nameExist(name: string) {
    return await this.repo.nameExist(name);
  }
}
