import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { DatabaseModule } from "../database/database.module";
import { RoleRepository } from "./role.repository";

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
