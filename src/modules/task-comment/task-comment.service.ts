import { Injectable } from "@nestjs/common";
import { TaskCommentRepository } from "./task-comment.repository";
import { TaskHistoryService } from "../task/task-history.service";
import { TaskCommentCreateDto } from "./dto/task-comment.dto";
import { TaskHistoryCreateDto } from "../task/dto/task-history.dto";
import {
  TaskHistoryAction,
  TaskHistoryFieldName,
} from "../task/task-history.constant";
import { ApplicationError } from "../../applicationError";

@Injectable()
export class TaskCommentService {
  constructor(
    private readonly taskCommentRepo: TaskCommentRepository,
    private readonly taskHistoryService: TaskHistoryService,
  ) {}

  async createTaskComment(
    userId: number,
    taskId: number,
    dto: TaskCommentCreateDto,
  ) {
    const comment = await this.taskCommentRepo.createTaskComment(
      userId,
      taskId,
      dto,
    );
    await this.taskHistoryService.createTaskHistory({
      taskId,
      operatorId: userId,
      action: TaskHistoryAction.ADD_COMMENT,
      fieldName: TaskHistoryFieldName.COMMENT,
      oldValue: null,
      newValue: JSON.stringify({
        content: dto.content,
        images: dto.images,
        attachments: dto.attachments,
      }),
    } as TaskHistoryCreateDto);
    return comment;
  }

  async deleteComment(userId: number, taskId: number, commentId: number) {
    const comment = await this.taskCommentRepo.findById(commentId);
    if (comment.taskId !== taskId) {
      throw new ApplicationError("E001");
    }

    // 只能刪除自己的評論
    if (comment.userId !== userId) {
      throw new ApplicationError("E002");
    }

    await this.taskCommentRepo.delete(commentId);
  }
}
