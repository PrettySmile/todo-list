import { z } from "zod";
import { intString, maxBytes } from "./refine";
import { toNonZeroIntOr } from "./transform";

export const zMaxBytes = (max: number) =>
  z.string().refine(maxBytes(max), {
    message: `Must be less than ${max} bytes`,
  });

export const zIntString = () =>
  z.string().refine(intString, {
    message: "Must be an integer string",
  });

export const zBooleanString = () =>
  z.preprocess((val) => {
    if (typeof val === "string") {
      const v = val.toLowerCase();
      if (v === "false" || v === "0" || v === "") return false;
      return true;
    }
    return val;
  }, z.boolean());

export const PaginateQuerySchema = z
  .object({
    page: zIntString().optional().transform(toNonZeroIntOr(1)),
    limit: zIntString().optional().transform(toNonZeroIntOr(10)),
    order: z.enum(["asc", "desc"]).optional(),
  })
  .strict();
export type PaginateQuery = z.infer<typeof PaginateQuerySchema>;
