import { z } from "zod";

export const UserLoginSchema = z
  .object({
    name: z.string(),
    password: z.string(),
  })
  .strict();
export type UserLoginDto = z.infer<typeof UserLoginSchema>;

export const UserCreateSchema = z
  .object({
    name: z.string().min(1).max(20),
    password: z
      .string()
      .min(8, { message: "密碼長度需介於8-16之間" })
      .max(16, { message: "密碼長度需介於8-16之間" }),
  })
  .strict();
export type UserCreateDto = z.infer<typeof UserCreateSchema>;
