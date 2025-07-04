import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";
import { ApplicationError } from "./applicationError";

@Catch(ApplicationError) // 只捕捉自定義的Exception
export class ApplicationErrorFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  catch(exception: ApplicationError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();

    // 根據傳入的 i18nKey 進行翻譯
    const message = this.i18n.translate(exception.getKey(), {
      args: exception.getArgs(),
    });

    response.status(status).json({
      statusCode: status,
      message: message,
      // timestamp: new Date().toISOString(),
    });
  }
}
