import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from "@nestjs/common";
import {
  TaskCommentCreateSchema,
  TaskCommentCreateDto,
} from "./dto/task-comment.dto";
import { ZodParse } from "../../common/pipes/zodparse.pipe";
import { sendOk } from "../../response.util";
import { TaskCommentService } from "./task-comment.service";
import { ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { TaskCommentCreateSwaggerDto } from "./dto/task-comment.swagger.dto";

@ApiTags("任務評論")
@Controller("task/:taskId/comment")
export class TaskCommentController {
  constructor(private readonly taskCommentService: TaskCommentService) {}

  /**
   * 新增評論
   */
  @Post()
  @ApiOperation({ summary: "新增任務評論" })
  @ApiParam({ name: "taskId", description: "任務 ID", type: Number })
  @ApiBody({ type: TaskCommentCreateSwaggerDto })
  async createTaskComment(
    @Request() req: any,
    @Param("taskId") taskId: number,
    @Body(new ZodParse(TaskCommentCreateSchema)) dto: TaskCommentCreateDto,
  ) {
    return sendOk(
      await this.taskCommentService.createTaskComment(req.user.id, taskId, dto),
    );
  }

  @Delete(":commentId")
  @ApiOperation({ summary: "刪除任務評論" })
  @ApiParam({ name: "taskId", description: "任務 ID", type: Number })
  @ApiParam({ name: "commentId", description: "評論 ID", type: Number })
  async deleteComment(
    @Request() req: any,
    @Param("taskId", ParseIntPipe) taskId: number,
    @Param("commentId", ParseIntPipe) commentId: number,
  ) {
    return sendOk(
      await this.taskCommentService.deleteComment(
        req.user.id,
        taskId,
        commentId,
      ),
    );
  }
}
