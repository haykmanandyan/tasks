import {ApiUserInterface} from "../api/api-user.interface";
import {ApiTodoInterface} from "../api/api-todo.interface";

export interface CustomDataInterface {
  user: ApiUserInterface,
  userTodos: ApiTodoInterface,
}
