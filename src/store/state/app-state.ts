import { Todo } from "../../containers/todos/todos.service";

export interface AppState {
  platformReady: boolean;
  todos: Todo[];
}

export const INITIAL_STATE: AppState = {
  platformReady: false,
  todos: undefined
};
