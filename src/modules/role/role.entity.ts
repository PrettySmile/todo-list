import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import Base from "../../common/entities/base.entity";

@Entity({ name: "role" })
export default class Role extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 255, nullable: false, comment: "角色名稱" })
  @Index({ unique: true })
  name: string;

  @Column("json", { nullable: true, comment: "權限" })
  permissions: string[];
}
