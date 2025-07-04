import { Injectable } from "@nestjs/common";
import { TaskHistoryRepository } from "./task-history.repository";
import { TaskHistoryCreateDto } from "./dto/task-history.dto";

@Injectable()
export class TaskHistoryService {
  constructor(private readonly taskHistoryRepo: TaskHistoryRepository) {}

  async getAllTaskHistories() {
    return await this.taskHistoryRepo.getAllTasks();
  }

  async getTaskHistoryById(id: number) {
    return await this.taskHistoryRepo.getTaskById(id);
  }

  async createTaskHistory(dto: TaskHistoryCreateDto) {
    return await this.taskHistoryRepo.createTaskHistory({
      taskId: dto.taskId,
      operatorId: dto.operatorId,
      action: dto.action,
      fieldName: dto.fieldName,
      oldValue: dto.oldValue,
      newValue: dto.newValue,
    } as TaskHistoryCreateDto);
  }
}
