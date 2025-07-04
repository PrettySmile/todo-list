import { DataSource, EntityManager, IsNull, Repository } from "typeorm";
import User from "./user.entity";
import { Inject, Injectable } from "@nestjs/common";
import { ApplicationError } from "../../applicationError";
import { DATA_SOURCE } from "../../common/constants/database.constants";

@Injectable()
export class UserRepository {
  private readonly repository: Repository<User>;

  constructor(
    @Inject(DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(User);
  }

  async nameExist(name: string, manager?: EntityManager) {
    const repository = manager ? manager.getRepository(User) : this.repository;
    const user = await repository.findOne({
      where: { name, deleted_at: IsNull() },
      select: { id: true },
    });
    return user !== null;
  }

  async create(createOptions: any, manager?: EntityManager): Promise<User> {
    const repository = manager ? manager.getRepository(User) : this.repository;
    const user = this.repository.create({
      name: createOptions.data.name,
      password: createOptions.data.password,
    });
    return await repository.save(user);
  }

  async findById(id: number, manager?: EntityManager) {
    const repository = manager ? manager.getRepository(User) : this.repository;
    return await repository.findOne({
      where: { id },
    });
  }

  async findByIdWithRolePermission(id: number, manager?: EntityManager) {
    const repository = manager ? manager.getRepository(User) : this.repository;
    const user = await repository.findOne({
      where: { id },
      // relations: ["roles"], // 假設有 roles 關聯
    });
    if (!user) throw new Error("User not found");
    // return { ...user, roles: user.roles.map(role => role.name) }; // 假設 roles 有 name 屬性
    return user;
  }

  async findOneByUsername(name: string) {
    const user = await this.repository.findOne({
      where: { name },
      // relations: ["roles"], // 假設有 roles 關聯
    });
    if (!user) throw new ApplicationError("errors.B002");
    return user;
  }
}
