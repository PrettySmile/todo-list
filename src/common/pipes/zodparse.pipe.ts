import { Injectable, PipeTransform } from "@nestjs/common";
import { ApplicationError } from "../../applicationError";
import { ZodSchema } from "zod";

@Injectable()
export class ZodParse implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any): unknown {
    const re = this.schema.safeParse(value);
    if (!re.success) {
      console.log(re.error, re.error.issues[0].path);
      throw new ApplicationError("errors.A001", {
        detail: re.error.issues[0].message,
      });
    }
    return re.data;
  }
}
