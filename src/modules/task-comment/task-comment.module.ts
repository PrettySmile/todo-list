import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { TaskCommentService } from "./task-comment.service";
import { TaskCommentRepository } from "./task-comment.repository";
import { TaskCommentController } from "./task-comment.controller";
import { TaskHistoryService } from "../task/task-history.service";
import { TaskHistoryRepository } from "../task/task-history.repository";

@Module({
  imports: [DatabaseModule],
  controllers: [TaskCommentController],
  providers: [
    TaskCommentService,
    TaskCommentRepository,
    TaskHistoryService,
    TaskHistoryRepository,
  ],
  exports: [TaskCommentService, TaskCommentRepository],
})
export class TaskCommentModule {}
