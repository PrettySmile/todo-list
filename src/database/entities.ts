import User from "../modules/user/user.entity";
import Role from "../modules/role/role.entity";
import Task from "../modules/task/task.entity";
import TaskHistory from "../modules/task/task-history.entity";
import TaskComment from "../modules/task-comment/task-comment.entity";

export const ENTITIES = [User, Role, Task, TaskHistory, TaskComment]; // **手動集中管理**
