import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import Base from "../../common/entities/base.entity";

@Entity({ name: "task" })
export default class Task extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 255, nullable: false, comment: "任務標題" })
  title: string;

  /**
   * 建立這個任務的人，ex: 助理
   */
  @Column("int", {
    name: "creator_user_id",
    nullable: false,
    comment: "建立者id",
  })
  creatorUserId: number;

  /**
   * 實際完成這項任務的人，ex: 工程師
   */
  @Column("json", {
    name: "owner_user_ids",
    nullable: true,
    comment: "負責人id",
  })
  ownerUserIds: number[] | null;

  /**
   * 想知道任務進度，不負責做事，ex: 老闆
   */
  @Column("json", {
    name: "follower_user_ids",
    nullable: true,
    comment: "關注者id",
  })
  followerUserIds: number[] | null;

  @Column("timestamp", {
    name: "start_at",
    nullable: true,
    comment: "開始時間",
  })
  startAt: Date | null;

  @Column("timestamp", { name: "end_at", nullable: true, comment: "截止時間" })
  endAt: Date | null;

  @Column("timestamp", {
    name: "complete_at",
    nullable: true,
    comment: "完成時間",
  })
  completeAt: Date | null;

  // @Column("int", { nullable: true, comment: "任務列表id" })
  // task_list_id: number | null;

  @Column("text", { nullable: true, comment: "任務描述" })
  description: string | null;

  @Column("json", { nullable: true, comment: "附件" })
  files: string[] | null;

  @Column("int", {
    name: "parent_task_id",
    nullable: true,
    comment: "父任務id",
  })
  @Index()
  parentTaskId: number | null;
}
