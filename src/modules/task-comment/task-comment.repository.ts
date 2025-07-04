import { DataSource, Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import TaskComment from "./task-comment.entity";
import { DATA_SOURCE } from "../../common/constants/database.constants";
import { TaskCommentCreateDto } from "./dto/task-comment.dto";
import { ApplicationError } from "../../applicationError";

@Injectable()
export class TaskCommentRepository {
  private readonly repo: Repository<TaskComment>;

  constructor(
    @Inject(DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repo = this.dataSource.getRepository(TaskComment);
  }

  async createTaskComment(
    userId: number,
    taskId: number,
    dto: TaskCommentCreateDto,
  ): Promise<TaskComment> {
    const comment = this.repo.create({
      taskId,
      userId,
      content: dto.content ?? null,
      images: dto.images ?? null,
      attachments: dto.attachments ?? null,
    });

    return await this.repo.save(comment);
  }

  async findById(id: number) {
    const comment = await this.repo.findOne({ where: { id } });
    if (!comment) throw new ApplicationError("E001");
    return comment;
  }

  async delete(id: number) {
    await this.repo.softDelete(id);
  }
}
