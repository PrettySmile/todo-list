import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  IsNull,
  Repository,
} from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { DATA_SOURCE } from "../../common/constants/database.constants";
import { TaskHistoryCreateDto } from "./dto/task-history.dto";
import TaskHistory from "./task-history.entity";

@Injectable()
export class TaskHistoryRepository {
  private readonly taskHistoryRepo: Repository<TaskHistory>;

  constructor(
    @Inject(DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.taskHistoryRepo = this.dataSource.getRepository(TaskHistory);
  }

  async getAllTasks(options?: FindManyOptions<TaskHistory>) {
    const where = {
      deleted_at: IsNull(),
      ...(options?.where || {}),
    };

    return await this.taskHistoryRepo.find({
      ...options,
      where,
    });
  }

  async getTaskById(id: number) {
    const taskHistory = await this.taskHistoryRepo.findOne({
      where: { id },
      relations: ["task", "operator"],
    });
    if (!taskHistory) throw new Error("Task history not found");
    return taskHistory;
  }

  async createTaskHistory(dto: TaskHistoryCreateDto): Promise<TaskHistory> {
    const partial: DeepPartial<TaskHistory> = {
      taskId: dto.taskId,
      operatorId: dto.operatorId,
      action: dto.action,
      fieldName: dto.fieldName ?? undefined,
      oldValue: dto.oldValue ?? undefined,
      newValue: dto.newValue ?? undefined,
    };
    const taskHistory = this.taskHistoryRepo.create(partial);
    return await this.taskHistoryRepo.save(taskHistory);
  }
}
