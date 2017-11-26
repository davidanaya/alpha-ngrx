import { Action } from "@ngrx/store";

import {
  TODOS_LOADED_ACTION,
  TodosLoadedAction,
  TODO_ADDED_ACTION,
  TodoAddedAction,
  TODOS_CLEARED_ACTION,
  TodosClearedAction
} from "../actions/todo-actions";
import { AppState, INITIAL_STATE } from "../state/app-state";

export function storeReducer(state: AppState = INITIAL_STATE, action: Action): AppState {
  switch (action.type) {
    case TODOS_LOADED_ACTION:
      return handleTodosLoadedAction(state, <any>action);
    case TODO_ADDED_ACTION:
      return handleTodoAddedAction(state, <any>action);
    case TODOS_CLEARED_ACTION:
      return handleTodosClearedAction(state, <any>action);
    default:
      return state;
  }
}

function handleTodosLoadedAction(state: AppState, action: TodosLoadedAction): AppState {
  const todos = action.payload;
  const newState: AppState = { ...state, todos };
  return newState;
}

function handleTodoAddedAction(state: AppState, action: TodoAddedAction): AppState {
  const todo = action.payload;
  console.log("newtodos: ", [...state.todos, todo]);
  const newState: AppState = { ...state, todos: [...state.todos, todo] };
  return newState;
}

function handleTodosClearedAction(state: AppState, action: TodosClearedAction): AppState {
  const newState: AppState = { ...state, todos: [] };
  return newState;
}
