import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1751607986357 implements MigrationInterface {
  name = "Init1751607986357";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '流水號 id', \`created_at\` datetime(6) NOT NULL COMMENT '建立日期' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL COMMENT '刪除日期', \`name\` varchar(255) NOT NULL COMMENT '帳號', \`password\` varchar(255) NOT NULL COMMENT '密碼', UNIQUE INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '流水號 id', \`created_at\` datetime(6) NOT NULL COMMENT '建立日期' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL COMMENT '刪除日期', \`name\` varchar(255) NOT NULL COMMENT '角色名稱', \`permissions\` json NULL COMMENT '權限', UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '流水號 id', \`created_at\` datetime(6) NOT NULL COMMENT '建立日期' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL COMMENT '刪除日期', \`title\` varchar(255) NOT NULL COMMENT '任務標題', \`creator_user_id\` int NOT NULL COMMENT '建立者id', \`owner_user_ids\` json NULL COMMENT '負責人id', \`follower_user_ids\` json NULL COMMENT '關注者id', \`start_at\` timestamp NULL COMMENT '開始時間', \`end_at\` timestamp NULL COMMENT '截止時間', \`complete_at\` timestamp NULL COMMENT '完成時間', \`description\` text NULL COMMENT '任務描述', \`files\` json NULL COMMENT '附件', \`parent_task_id\` int NULL COMMENT '父任務id', INDEX \`IDX_01c122fbf6a1e855a2622957f5\` (\`parent_task_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`task_histories\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '流水號 id', \`created_at\` datetime(6) NOT NULL COMMENT '建立日期' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL COMMENT '刪除日期', \`action\` enum ('create', 'add_subtask', 'change_title', 'follow', 'unfollow', 'add_follower', 'remove_follower', 'complete_task', 'reopen_task', 'upload_file', 'remove_file', 'set_deadline', 'set_reminder_time', 'add_description', 'update_description', 'remove_description', 'assign_owner', 'remove_owner', 'add_comment', 'update') NOT NULL COMMENT '操作類型', \`fieldName\` varchar(255) NULL, \`oldValue\` text NULL, \`newValue\` text NULL, \`task_id\` int NOT NULL COMMENT 'task id', \`operator_id\` int NOT NULL COMMENT '操作人(user id)', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`task_comment\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '流水號 id', \`created_at\` datetime(6) NOT NULL COMMENT '建立日期' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL COMMENT '刪除日期', \`task_id\` int NOT NULL COMMENT '任務id', \`user_id\` int NOT NULL COMMENT '使用者id', \`content\` text NULL COMMENT '留言內容', \`images\` json NULL COMMENT '圖片連結清單', \`attachments\` json NULL COMMENT '附件清單（檔案 URL）', INDEX \`IDX_55866536e2125e25624db4d963\` (\`task_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`task_comment\` ADD CONSTRAINT \`FK_55866536e2125e25624db4d963b\` FOREIGN KEY (\`task_id\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`task_comment\` ADD CONSTRAINT \`FK_42dad5d624ed3008880f73b60bc\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`task_comment\` DROP FOREIGN KEY \`FK_42dad5d624ed3008880f73b60bc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`task_comment\` DROP FOREIGN KEY \`FK_55866536e2125e25624db4d963b\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_55866536e2125e25624db4d963\` ON \`task_comment\``,
    );
    await queryRunner.query(`DROP TABLE \`task_comment\``);
    await queryRunner.query(`DROP TABLE \`task_histories\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_01c122fbf6a1e855a2622957f5\` ON \`task\``,
    );
    await queryRunner.query(`DROP TABLE \`task\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``,
    );
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
