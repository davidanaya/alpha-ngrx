import { Todo } from "../../containers/todos/todos.service";

export interface AppState {
  todos: Todo[];
}

export const INITIAL_STATE: AppState = {
  todos: undefined
};
