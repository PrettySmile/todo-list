import { DataSource, IsNull, Repository } from "typeorm";
import Role from "./role.entity";
import { Inject, Injectable } from "@nestjs/common";
import { RoleCreateDto, RoleQueryDto } from "./dto/role.dto";
import { paginate } from "../../paginate";
import { DATA_SOURCE } from "../../common/constants/database.constants";

@Injectable()
export class RoleRepository {
  private readonly roleRepo: Repository<Role>;

  constructor(
    @Inject(DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.roleRepo = this.dataSource.getRepository(Role);
  }

  async findAll({ page, limit }: RoleQueryDto) {
    const qb = this.roleRepo
      .createQueryBuilder("role")
      .where("role.deleted_at IS NULL");
    return await paginate(qb, {
      page,
      limit,
      orderBy: [["created_at", "DESC"]],
    });
  }

  async createRole(dto: RoleCreateDto): Promise<Role> {
    const role = this.roleRepo.create({
      name: dto.name,
      permissions: dto.permissions,
    });
    return await this.roleRepo.save(role);
  }

  async nameExist(name: string): Promise<boolean> {
    const result = await this.roleRepo.findOne({
      where: { name, deleted_at: IsNull() },
    });
    return result !== null;
  }
}
