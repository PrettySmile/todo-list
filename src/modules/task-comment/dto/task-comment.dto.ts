import { z } from "zod";

export const TaskCommentCreateSchema = z.object({
  content: z.string().max(1000).optional(),
  images: z.array(z.string().url()).optional(),
  attachments: z.array(z.string().url()).optional(),
});

export type TaskCommentCreateDto = z.infer<typeof TaskCommentCreateSchema>;
