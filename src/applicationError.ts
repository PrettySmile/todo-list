import { HttpException, HttpStatus } from "@nestjs/common";

export class ApplicationError extends HttpException {
  constructor(
    private readonly i18nKey: string,
    private readonly args: Record<string, any> = {},
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    // super(i18nKey, statusCode);
    super("Error message placeholder", statusCode);
  }

  // 取得語系 Key
  getKey(): string {
    return this.i18nKey;
  }

  // 取得傳遞的參數
  getArgs(): Record<string, any> {
    return this.args;
  }
}
