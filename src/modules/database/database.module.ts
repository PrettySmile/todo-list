import { Module } from "@nestjs/common";
import { databaseProvider } from "./database.providers";

@Module({
  imports: [],
  controllers: [],
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {}
