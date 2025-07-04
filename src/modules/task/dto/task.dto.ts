import { zBooleanString } from "../../../common/contract/schema";
import { z } from "zod";

export const GetTaskQuerySchema = z.object({
  createdByMe: zBooleanString().optional(),
  assignedToMe: zBooleanString().optional(),
  followedByMe: zBooleanString().optional(),
  sortBy: z
    .enum(["created_at", "endAt", "creatorUserId", "id"])
    .optional()
    .default("created_at"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  completed: zBooleanString().optional(), //篩選任務狀態（已完成/末完成）
  ownerUserId: z.coerce.number().int().optional(), //篩選指定負責人(userID)
  creatorUserId: z.coerce.number().int().optional(), //篩選指定任務新增人(userID)
});
export type GetTaskQueryDto = z.infer<typeof GetTaskQuerySchema>;

export const TaskQuerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  creatorUserId: z.number().int(),
  ownerUserId: z.number().int().optional(),
  deadline: z.date().optional(),
  tasklListId: z.number().int().optional(),
  description: z.string().optional(),
  files: z.array(z.string()).optional(),
  followerUserIds: z.array(z.number().int()).optional(),
  parentTaskId: z.number().int().optional(),
});
export type TaskQueryDto = z.infer<typeof TaskQuerySchema>;

export const TaskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    creatorUserId: z.number().int(),
    ownerUserIds: z.array(z.number().int()).optional().nullable(),
    followerUserIds: z.array(z.number().int()).optional().nullable(),
    startAt: z.date().optional().nullable(),
    endAt: z.date().optional().nullable(),
    completeAt: z.date().optional().nullable(),
    description: z.string().optional().nullable(),
    files: z.array(z.string()).optional().nullable(),
    parentTaskId: z.number().int().optional().nullable(),
  })
  .strict();
export type TaskDto = z.infer<typeof TaskSchema>;

export const TaskCreateSchema = TaskSchema.omit({
  creatorUserId: true,
  completeAt: true,
});

export type TaskCreateDto = z.infer<typeof TaskCreateSchema>;

export const TaskUpdateSchema = TaskSchema.omit({
  creatorUserId: true,
  completeAt: true,
})
  .partial()
  .refine(
    (data) => {
      const updateCount = Object.values(data).filter(
        (v) => v !== undefined,
      ).length;
      return updateCount === 1;
    },
    {
      message: "Only one field can be updated at a time.",
    },
  );
export type TaskUpdateDto = z.infer<typeof TaskUpdateSchema>;
