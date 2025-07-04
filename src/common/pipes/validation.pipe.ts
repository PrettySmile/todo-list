import {
  BadRequestException,
  Injectable,
  ValidationPipe as NestValidationPipe,
  ValidationError,
  ValidationPipeOptions,
} from "@nestjs/common";
import { ApplicationError } from "../../applicationError";

@Injectable()
export class ValidationPipe extends NestValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      ...options,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors.map((error) =>
          Object.values(error.constraints || {}).join(", "),
        );
        // TODO: test
        return new ApplicationError("errors.A002", {
          errorMessages,
        });
      },
    });
  }
}
