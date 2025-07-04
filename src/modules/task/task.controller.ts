import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import {
  TaskCreateDto,
  TaskCreateSchema,
  TaskUpdateDto,
  TaskUpdateSchema,
  GetTaskQuerySchema,
  GetTaskQueryDto,
} from "./dto/task.dto";
import { ZodParse } from "../../common/pipes/zodparse.pipe";
import { sendOk } from "../../response.util";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import {
  GetTaskQuerySwaggerDto,
  TaskCompleteBodyDto,
  TaskCreateSwaggerDto,
  TaskUpdateSwaggerDto,
} from "./dto/task.swagger.dto";

@ApiTags("任務")
@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: "取得任務列表" })
  @ApiQuery({ type: GetTaskQuerySwaggerDto })
  async getTasks(
    @Request() req: any,
    @Query(new ZodParse(GetTaskQuerySchema)) dto: GetTaskQueryDto,
  ) {
    return sendOk(await this.taskService.getTasks(req.user.id, dto));
  }

  @Post()
  @ApiOperation({ summary: "新增任務或子任務" })
  @ApiBody({ type: TaskCreateSwaggerDto })
  async createTask(
    @Request() req: any,
    @Body(new ZodParse(TaskCreateSchema)) dto: TaskCreateDto,
  ) {
    return await this.taskService.createTask(req.user.id, dto);
  }

  /**
   * 修改任務, 子任務
   * input: title, owner
   * input(optional): deadline, taskListId, description, subTaskId, files, follower_user_ids, parentTaskId
   */
  @Patch(":id")
  @ApiOperation({ summary: "更新任務" })
  @ApiParam({ name: "id", type: Number, description: "任務ID" })
  @ApiBody({ type: TaskUpdateSwaggerDto })
  async updateTask(
    @Request() req: any,
    @Param("id") id: number,
    @Body(new ZodParse(TaskUpdateSchema)) dto: TaskUpdateDto,
  ) {
    return await this.taskService.updateTask(req.user.id, id, dto);
  }

  @Patch(":id/complete")
  @ApiOperation({ summary: "設定任務完成狀態" })
  @ApiParam({ name: "id", type: Number, description: "任務ID" })
  @ApiBody({ type: TaskCompleteBodyDto })
  async completeTask(
    @Request() req: any,
    @Param("id") id: number,
    @Body() { complete }: { complete: boolean },
  ) {
    return await this.taskService.setTaskCompletion(req.user.id, id, complete);
  }
}
