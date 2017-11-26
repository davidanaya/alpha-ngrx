import { Action } from "@ngrx/store";

import { Todo } from "../../containers/todos/todos.service";

export const TODOS_LOADED_ACTION = "TODOS_LOADED_ACTION";

export class TodosLoadedAction implements Action {
  readonly type = TODOS_LOADED_ACTION;

  constructor(public payload?: Todo[]) {}
}
