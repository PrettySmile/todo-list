import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { DatabaseModule } from "../database/database.module";
import { TaskRepository } from "./task.repository";
import { TaskHistoryRepository } from "./task-history.repository";
import { TaskHistoryService } from "./task-history.service";

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskRepository,
    TaskHistoryService,
    TaskHistoryRepository,
  ],
  exports: [
    TaskService,
    TaskRepository,
    TaskHistoryService,
    TaskHistoryRepository,
  ],
})
export class TaskModule {}
