import { DATA_SOURCE } from "../../common/constants/database.constants";
import AppDataSource from "../../database/dataSource";

export const databaseProvider = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      if (!AppDataSource.isInitialized) {
        // 確保資料源只初始化一次
        try {
          await AppDataSource.initialize();
          // console.log("Database connection successfully");
        } catch (error) {
          console.error("Database connection failed", error);
          throw error;
        }
      }
      return AppDataSource;
    },
  },
];
