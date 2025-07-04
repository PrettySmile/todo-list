export enum TaskHistoryAction {
  CREATE = "create", //xxx 建立了任務
  ADD_SUBTASK = "add_subtask", //xxx 新增子任務 yyy
  CHANGE_TITLE = "change_title", //xxx 將任務標題 yyy 改為 zzz

  FOLLOW = "follow", //xxx 關注了任務
  UNFOLLOW = "unfollow", //xxx 取消關注任務
  ADD_FOLLOWER = "add_follower", //xxx 將 yyy 新增為關注者
  REMOVE_FOLLOWER = "remove_follower", //xxx 移除了關注者 yyy

  COMPLETE_TASK = "complete_task", //xxx 完成了整個任務
  REOPEN_TASK = "reopen_task", //xxx 恢復了整個任務

  UPLOAD_FILE = "upload_file", //xxx 上傳了附件 yyy
  REMOVE_FILE = "remove_file", //xxx 移除了附件 yyy

  SET_DEADLINE = "set_deadline", //xxx 將任務截止時間設定為 yyy
  SET_REMINDER_TIME = "set_reminder_time", //xxx 將任務提示時間設定為 yyy

  ADD_DESCRIPTION = "add_description", //xxx 新增了任務說明 yyy
  UPDATE_DESCRIPTION = "update_description", //xxx 將任務說明修改為：yyy
  REMOVE_DESCRIPTION = "remove_description", //xxx 移除了任務說明 yyy

  ASSIGN_OWNER = "assign_owner", //xxx 將 yyy 新增為任務負責人
  REMOVE_OWNER = "remove_owner", //xxx 移除了任務負責人 yyy

  ADD_COMMENT = "add_comment", //xxx 新增了評論
  REMOVE_COMMENT = "remove_comment", //xxx 移除了評論 yyy

  // 可以保留 fallback 類型
  UPDATE = "update",
}

export enum TaskHistoryFieldName {
  COMMENT = "comment",
}
