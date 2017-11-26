import { Action } from "@ngrx/store";

import { Todo } from "../../containers/todos/todos.service";

export const PLATFORM_READY_ACTION = "PLATFORM_READY_ACTION";
export const TODOS_LOADED_ACTION = "TODOS_LOADED_ACTION";
export const TODO_ADDED_ACTION = "TODO_ADDED_ACTION";
export const TODOS_CLEARED_ACTION = "TODOS_CLEARED_ACTION";

export class PlatformReadyAction implements Action {
  readonly type = PLATFORM_READY_ACTION;

  constructor() {}
}

export class TodosLoadedAction implements Action {
  readonly type = TODOS_LOADED_ACTION;

  constructor(public payload?: Todo[]) {}
}

export class TodoAddedAction implements Action {
  readonly type = TODO_ADDED_ACTION;

  constructor(public payload?: Todo) {}
}

export class TodosClearedAction implements Action {
  readonly type = TODOS_CLEARED_ACTION;

  constructor() {}
}
