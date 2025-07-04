import { ApiPropertyOptional } from "@nestjs/swagger";

export class TaskCommentCreateSwaggerDto {
  @ApiPropertyOptional({ description: "評論內容", maxLength: 1000 })
  content?: string;

  @ApiPropertyOptional({
    description: "圖片 URL 清單",
    type: [String],
    format: "url",
  })
  images?: string[];

  @ApiPropertyOptional({
    description: "附件 URL 清單",
    type: [String],
    format: "url",
  })
  attachments?: string[];
}
