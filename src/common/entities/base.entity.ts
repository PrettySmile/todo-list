import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

export default class Base extends BaseEntity {
  /**
   * 流水號 id (自動產生)
   */
  @PrimaryGeneratedColumn("increment", {
    type: "integer",
    comment: "流水號 id",
  })
  id!: number;

  /**
   * 建立日期
   */
  @CreateDateColumn({ comment: "建立日期" })
  created_at!: Date;

  /**
   * 更新日期
   */
  @UpdateDateColumn({ comment: "更新日期" })
  updated_at!: Date;

  /**
   * 刪除日期
   */
  @DeleteDateColumn({ comment: "刪除日期" })
  deleted_at!: Date | null;
}
