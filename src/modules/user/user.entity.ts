import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import Base from "../../common/entities/base.entity";

@Entity({ name: "user" })
export default class User extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 255, nullable: false, comment: "帳號" })
  @Index({ unique: true })
  name: string;

  @Column("varchar", { length: 255, nullable: false, comment: "密碼" })
  password: string;
}
