import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { I18n, I18nContext } from "nestjs-i18n";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/hello")
  getI18nHello(@I18n() i18n: I18nContext) {
    const i18n2 = I18nContext.current();
    console.log("current language=", i18n2?.lang); //確定是zh
    return i18n.translate("events.A001", { lang: "zh" });
  }
}
