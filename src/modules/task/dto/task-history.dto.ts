import { z } from "zod";
import { TaskHistoryAction } from "../task-history.constant";

export const TaskHistoryCreateSchema = z.object({
  taskId: z.number().int().positive(),
  action: z.nativeEnum(TaskHistoryAction),
  fieldName: z.string().optional().nullable(), // 哪個欄位被修改
  oldValue: z.string().optional().nullable(),
  newValue: z.string().optional().nullable(),
  operatorId: z.number().int().positive(),
});
export type TaskHistoryCreateDto = z.infer<typeof TaskHistoryCreateSchema>;
