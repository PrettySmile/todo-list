import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Base from "../../common/entities/base.entity";
import Task from "../task/task.entity";
import User from "../user/user.entity";

@Entity({ name: "task_comment" })
export default class TaskComment extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int", { name: "task_id", nullable: false, comment: "任務id" })
  @Index()
  taskId: number;

  @Column("int", { name: "user_id", nullable: false, comment: "使用者id" })
  userId: number;

  @Column("text", { nullable: true, comment: "留言內容" })
  content: string | null;

  @Column("json", { nullable: true, comment: "圖片連結清單" })
  images: string[] | null;

  @Column("json", { nullable: true, comment: "附件清單（檔案 URL）" })
  attachments: string[] | null;

  @ManyToOne(() => Task)
  @JoinColumn({ name: "task_id" })
  task: Task;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}
