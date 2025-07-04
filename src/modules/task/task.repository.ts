import { DataSource, DeepPartial, FindManyOptions, Repository } from "typeorm";
import Task from "./task.entity";
import { TaskCreateDto, TaskUpdateDto } from "./dto/task.dto";
import { Inject, Injectable } from "@nestjs/common";
import { DATA_SOURCE } from "../../common/constants/database.constants";
import { ApplicationError } from "src/applicationError";

@Injectable()
export class TaskRepository {
  private readonly taskRepo: Repository<Task>;

  constructor(
    @Inject(DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.taskRepo = this.dataSource.getRepository(Task);
  }

  get repo() {
    return this.taskRepo;
  }

  async getTasks(options: FindManyOptions<Task>) {
    return this.taskRepo.find(options);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id },
      // relations: ["ownerUser", "followerUsers", "parentTask"],
    });
    if (!task) throw new ApplicationError("D001", { taskId: id });
    return task;
  }

  async createTask(userId: number, dto: TaskCreateDto) {
    const task: DeepPartial<Task> = {
      title: dto.title,
      creatorUserId: userId,
      ownerUserIds: dto.ownerUserIds,
      followerUserIds: dto.followerUserIds
        ? Array.from(new Set([...dto.followerUserIds, userId]))
        : null,
      startAt: dto.startAt,
      endAt: dto.endAt,
      description: dto.description,
      files: dto.files,
      parentTaskId: dto.parentTaskId,
    };
    const rent = this.taskRepo.create(task);
    return await this.taskRepo.save(rent);
  }

  async updateTask(userId: number, id: number, dto: TaskUpdateDto) {
    await this.taskRepo.update({ id }, dto);
    return await this.taskRepo.findOne({ where: { id } });
  }

  async deleteTask(id: number) {
    const task = await this.getTaskById(id);
    if (!task) throw new Error("Task not found");

    await this.taskRepo.softDelete(id);
  }
}
