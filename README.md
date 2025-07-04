<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 使用版本

- node v22.13.1
- npm v10.9.2
- mysql v8.0
- redis

## 專案說明

這是一個「任務」功能，可以與多人分享任務進度，有參考 [Lark](https://www.larksuite.com/en_sg/) 的任務功能。

1. 可以創建帳號，並登入。
2. 可以新增任務, 及子任務。
   - 主任務與子任務的結構相同。
   - 可以設定任務負責人、任務關注者、截止時間、任務是否完成、任務說明、附件等。
3. 可以取得任務歷史紀錄。
4. 取得任務列表時，可以進行排序及篩選。
   - 例如：取得「自己創建」的任務。
   - 例如：取得「被指派給自己執行」的任務。
   - 例如：取得「自己有在關注」的任務。
   - 例如：取得「已完成」的任務。
   - 例如：取得「指定創建者」的任務。
5. 所有子任務完成後，自動完成主任務。
6. 可以為任務新增評論。
7. 可透過 docker container 運行。

## 專案目標

1. 使用 [NestJS](https://github.com/nestjs/nest) 框架
2. 使用 TypeScript 撰寫
3. 使用 TypeORM 連接 MySQL(關聯型資料庫)
4. 使用 NestJS i18n 語系
5. 使用 全域的錯誤處理器，保持乾淨的Controller
6. 使用 sendOk()，保持API回傳一致性
7. 使用 NestJS 單元測試 (@nestjs/testing)
8. 使用 zod，檢查參數型別
9. 使用 swagger，建立 API 文檔

## 開發測試

```
npm install
npm run start:dev
```

## DB 操作

1. xxx.entity.ts 新增資料表及欄位
2. src/database/entities.ts 手動維護 ENTITIES
3. 產生 Migration 檔案

```
npm run db:g
```

4. 更新 DB。

```
npm run db:run
```

# 查閱 API 文檔

http://localhost:3000/docs

# 佈署指令

```
docker build -t todo-list .
docker run -p 3000:3000 todo-list
docker run \
  --env-file .env \
  --network my-app-network \
  -p 3000:3000 \
  --name todo-list \
  todo-list
docker rm -f todo-list
```
