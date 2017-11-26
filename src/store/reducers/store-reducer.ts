import { Action } from "@ngrx/store";

import { TODOS_LOADED_ACTION, TodosLoadedAction } from "../actions/todo-actions";
import { AppState, INITIAL_STATE } from "../state/app-state";

export function storeReducer(state: AppState = INITIAL_STATE, action: Action): AppState {
  switch (action.type) {
    case TODOS_LOADED_ACTION:
      return handleTodosLoadedAction(state, <any>action);
    default:
      return state;
  }
}

function handleTodosLoadedAction(state: AppState, action: TodosLoadedAction): AppState {
  const todos = action.payload;
  const newState: AppState = { ...state, todos };
  return newState;
}
