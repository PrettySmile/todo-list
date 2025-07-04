import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Base from "../../common/entities/base.entity";
import { TaskHistoryAction } from "./task-history.constant";

@Entity({ name: "task_histories" })
export default class TaskHistory extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: TaskHistoryAction,
    comment: "操作類型",
  })
  action: TaskHistoryAction;

  /**
   * 哪個欄位被修改
   */
  @Column({ nullable: true })
  fieldName: string;

  @Column({ type: "text", nullable: true })
  oldValue: string;

  @Column({ type: "text", nullable: true })
  newValue: string;

  @Column("int", { name: "task_id", nullable: false, comment: "task id" })
  taskId: number;

  @Column("int", {
    name: "operator_id",
    nullable: false,
    comment: "操作人(user id)",
  })
  operatorId: number;
}
