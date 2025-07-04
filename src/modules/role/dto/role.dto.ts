import {
  PaginateQuerySchema,
  zMaxBytes,
} from "../../../common/contract/schema";
import { z } from "zod";

export const RoleQuerySchema = PaginateQuerySchema;
export type RoleQueryDto = z.infer<typeof RoleQuerySchema>;

export const RoleCreateSchema = z
  .object({
    name: zMaxBytes(20),
    permissions: z.array(z.string()).optional(),
  })
  .strict();

export type RoleCreateDto = z.infer<typeof RoleCreateSchema>;
