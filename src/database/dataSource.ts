import { DataSource } from "typeorm";
import { loadEnvConfig } from "@next/env";
import { ENTITIES } from "./entities";
loadEnvConfig(process.cwd()); // 手動載入 `.env` 檔案//todo change to inject: [ConfigService],

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // 啟用自動同步資料庫結構
  logging: false, // 設為 true 可以查看 SQL 查詢日誌
  //   entities: [__dirname + "/db/entity/*.{ts,js}"], // 需要同步的實體類型,  兼容ts及js運行時
  entities: ENTITIES, // 需要同步的實體類型,  兼容ts及js運行時
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});

export default AppDataSource;
