import { Injectable } from "@nestjs/common";
import { GetTaskQueryDto, TaskCreateDto, TaskUpdateDto } from "./dto/task.dto";
import { TaskRepository } from "./task.repository";
import { TaskHistoryService } from "./task-history.service";
import { TaskHistoryCreateDto } from "./dto/task-history.dto";
import { TaskHistoryAction } from "./task-history.constant";
import { IsNull, Raw, Not } from "typeorm";

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepo: TaskRepository,
    private readonly taskHistoryService: TaskHistoryService,
  ) {}

  async getTasks(userId: number, dto: GetTaskQueryDto) {
    const sortBy = dto.sortBy;
    const sortOrder = dto.sortOrder;
    const where: any[] = [];

    if (dto.createdByMe) {
      where.push({ creatorUserId: userId, deleted_at: IsNull() });
    }

    if (dto.assignedToMe) {
      where.push({
        ownerUserIds: Raw((alias) => `JSON_CONTAINS(${alias}, '${userId}')`),
        deleted_at: IsNull(),
      });
    }

    if (dto.followedByMe) {
      where.push({
        followerUserIds: Raw((alias) => `JSON_CONTAINS(${alias}, '${userId}')`),
        deleted_at: IsNull(),
      });
    }

    if (dto.ownerUserId) {
      where.push({
        ownerUserIds: Raw(
          (alias) => `JSON_CONTAINS(${alias}, '${dto.ownerUserId}')`,
        ),
        deleted_at: IsNull(),
      });
    }

    if (dto.creatorUserId) {
      where.push({
        creatorUserId: dto.creatorUserId,
        deleted_at: IsNull(),
      });
    }

    if (dto.completed !== undefined) {
      where.push({
        completeAt: dto.completed ? Not(IsNull()) : IsNull(),
        deleted_at: IsNull(),
      });
    }

    // 查詢
    const queryOptions = {
      order: {
        [sortBy]: sortOrder,
      },
    };

    if (where.length === 0) {
      return this.taskRepo.getTasks({
        where: { deleted_at: IsNull() },
        ...queryOptions,
      });
    }

    return this.taskRepo.getTasks({ where, ...queryOptions });
  }

  async createTask(userId: number, dto: TaskCreateDto) {
    const task = await this.taskRepo.createTask(userId, dto);
    const history: TaskHistoryCreateDto = {
      taskId: task.id,
      operatorId: userId,
      action: TaskHistoryAction.CREATE,
      fieldName: null,
      oldValue: null,
      newValue: JSON.stringify(task),
    };
    await this.taskHistoryService.createTaskHistory(history);
    return task;
  }

  async updateTask(userId: number, id: number, dto: TaskUpdateDto) {
    const oldTask = await this.taskRepo.getTaskById(id);
    const newTask = await this.taskRepo.updateTask(userId, id, dto);

    const fieldName = Object.keys(dto)[0] as keyof TaskUpdateDto;
    const before = oldTask[fieldName];
    const after = dto[fieldName];

    const action: TaskHistoryAction = this.determineTaskHistoryAction(
      fieldName,
      before,
      after,
    );

    const history: TaskHistoryCreateDto = {
      taskId: oldTask.id,
      operatorId: userId,
      action,
      fieldName,
      oldValue: JSON.stringify(before),
      newValue: JSON.stringify(after),
    };
    await this.taskHistoryService.createTaskHistory(history);
    return newTask;
  }

  async setTaskCompletion(userId: number, taskId: number, complete: boolean) {
    const now = new Date();

    // 更新子任務完成狀態
    const task = await this.updateTaskCompletionStatus(
      userId,
      taskId,
      complete,
      now,
    );

    // 如果有父任務，進一步檢查是否要更新它
    if (task.parentTaskId) {
      const siblingTasks = await this.taskRepo.repo.find({
        where: { parentTaskId: task.parentTaskId, deleted_at: IsNull() },
      });

      const allDone = siblingTasks.every((t) => !!t.completeAt);

      await this.updateTaskCompletionStatus(
        userId,
        task.parentTaskId,
        allDone,
        now,
      );
    }

    return task;
  }

  /**
   * 更新任務狀態
   * @param taskId
   * @param complete
   * @returns
   */
  async updateTaskCompletionStatus(
    userId: number,
    taskId: number,
    complete: boolean,
    date: Date = new Date(),
  ) {
    const before = await this.taskRepo.getTaskById(taskId);

    // ✅ 若 complete 狀態與資料庫一致，就不做任何事
    const beforeCompleted = !!before.completeAt;
    if (beforeCompleted === complete) {
      return before;
    }

    await this.taskRepo.repo.update(
      { id: taskId },
      { completeAt: complete ? date : null },
    );
    const after = await this.taskRepo.getTaskById(taskId);

    // 寫入 task_histories
    const fieldName = "completeAt";
    const action: TaskHistoryAction = this.determineTaskHistoryAction(
      fieldName,
      before.completeAt,
      after.completeAt,
    );

    const history: TaskHistoryCreateDto = {
      taskId: taskId,
      operatorId: userId,
      action,
      fieldName,
      oldValue: JSON.stringify(before.completeAt),
      newValue: JSON.stringify(after.completeAt),
    };
    await this.taskHistoryService.createTaskHistory(history);

    return after;
  }

  /**
   * 決定 action 的邏輯
   * @param fieldName
   * @param before
   * @param after
   * @returns
   */
  private determineTaskHistoryAction(
    fieldName: keyof TaskUpdateDto | "completeAt",
    before: any,
    after: any,
  ): TaskHistoryAction {
    switch (fieldName) {
      case "title":
        return TaskHistoryAction.CHANGE_TITLE;

      case "description":
        if (!before && after) return TaskHistoryAction.ADD_DESCRIPTION;
        if (before && !after) return TaskHistoryAction.REMOVE_DESCRIPTION;
        if (before !== after) return TaskHistoryAction.UPDATE_DESCRIPTION;
        return TaskHistoryAction.UPDATE;

      case "files":
        if (
          (!before?.length && after?.length) ||
          after?.length > before?.length
        ) {
          return TaskHistoryAction.UPLOAD_FILE;
        }
        if (before?.length && after?.length < before.length) {
          return TaskHistoryAction.REMOVE_FILE;
        }
        return TaskHistoryAction.UPDATE;

      case "endAt":
        return TaskHistoryAction.SET_DEADLINE;

      case "startAt":
        return TaskHistoryAction.SET_REMINDER_TIME;

      case "followerUserIds":
        if (
          (!before?.length && after?.length) ||
          after?.length > before?.length
        ) {
          return TaskHistoryAction.ADD_FOLLOWER;
        }
        if (before?.length && after?.length < before.length) {
          return TaskHistoryAction.REMOVE_FOLLOWER;
        }
        return TaskHistoryAction.UPDATE;

      case "ownerUserIds":
        if (
          (!before?.length && after?.length) ||
          after?.length > before?.length
        ) {
          return TaskHistoryAction.ASSIGN_OWNER;
        }
        if (before?.length && after?.length < before.length) {
          return TaskHistoryAction.REMOVE_OWNER;
        }
        return TaskHistoryAction.UPDATE;

      case "completeAt":
        if (!before && after) return TaskHistoryAction.COMPLETE_TASK;
        if (before && !after) return TaskHistoryAction.REOPEN_TASK;
        return TaskHistoryAction.UPDATE;

      default:
        return TaskHistoryAction.UPDATE;
    }
  }
}
