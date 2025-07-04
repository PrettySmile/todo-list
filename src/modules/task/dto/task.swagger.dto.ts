import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class GetTaskQuerySwaggerDto {
  @ApiPropertyOptional({ description: "是否只查自己建立的任務", type: Boolean })
  createdByMe?: boolean;

  @ApiPropertyOptional({
    description: "是否只查自己被指派的任務",
    type: Boolean,
  })
  assignedToMe?: boolean;

  @ApiPropertyOptional({ description: "是否只查自己關注的任務", type: Boolean })
  followedByMe?: boolean;

  @ApiPropertyOptional({
    description: "排序欄位",
    enum: ["created_at", "endAt", "creatorUserId", "id"],
    default: "created_at",
  })
  sortBy?: "created_at" | "endAt" | "creatorUserId" | "id";

  @ApiPropertyOptional({
    description: "排序方向",
    enum: ["asc", "desc"],
    type: "string",
    default: "desc",
  })
  sortOrder?: "asc" | "desc";

  @ApiPropertyOptional({ description: "是否查已完成任務", type: Boolean })
  completed?: boolean;

  @ApiPropertyOptional({ description: "指定負責人 userId", type: Number })
  ownerUserId?: number;

  @ApiPropertyOptional({ description: "指定建立人 userId", type: Number })
  creatorUserId?: number;
}

export class TaskCreateSwaggerDto {
  @ApiProperty({ description: "任務標題" })
  title!: string;

  @ApiPropertyOptional({ description: "負責人 userId 陣列" })
  ownerUserIds?: number[];

  @ApiPropertyOptional({ description: "關注者 userId 陣列" })
  followerUserIds?: number[];

  @ApiPropertyOptional({
    description: "開始時間",
    type: String,
    format: "date-time",
  })
  startAt?: string;

  @ApiPropertyOptional({
    description: "結束時間",
    type: String,
    format: "date-time",
  })
  endAt?: string;

  @ApiPropertyOptional({ description: "任務描述" })
  description?: string;

  @ApiPropertyOptional({ description: "檔案 URL 陣列" })
  files?: string[];

  @ApiPropertyOptional({ description: "父任務 ID" })
  parentTaskId?: number;
}

export class TaskUpdateSwaggerDto {
  @ApiPropertyOptional({ description: "任務標題" })
  title?: string;

  @ApiPropertyOptional({ description: "負責人 userId 陣列" })
  ownerUserIds?: number[];

  @ApiPropertyOptional({ description: "關注者 userId 陣列" })
  followerUserIds?: number[];

  @ApiPropertyOptional({
    description: "開始時間",
    type: String,
    format: "date-time",
  })
  startAt?: string;

  @ApiPropertyOptional({
    description: "結束時間",
    type: String,
    format: "date-time",
  })
  endAt?: string;

  @ApiPropertyOptional({ description: "任務描述" })
  description?: string;

  @ApiPropertyOptional({ description: "檔案 URL 陣列" })
  files?: string[];

  @ApiPropertyOptional({ description: "父任務 ID" })
  parentTaskId?: number;
}

export class TaskIdParamDto {
  @ApiProperty({ description: "任務ID", example: 1 })
  id!: number;
}

export class TaskCompleteBodyDto {
  @ApiProperty({ description: "是否完成", example: true })
  complete!: boolean;
}
