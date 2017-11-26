import { Action } from "@ngrx/store";

import {
  TODOS_LOADED_ACTION,
  TodosLoadedAction,
  TODO_ADDED_ACTION,
  TodoAddedAction,
  TODOS_CLEARED_ACTION,
  TodosClearedAction,
  PLATFORM_READY_ACTION,
  PlatformReadyAction
} from "../actions/todo-actions";
import { AppState, INITIAL_STATE } from "../state/app-state";

export function storeReducer(state: AppState = INITIAL_STATE, action: Action): AppState {
  switch (action.type) {
    case PLATFORM_READY_ACTION:
      return handlePlatformReadyAction(state, <any>action);
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

function handlePlatformReadyAction(state: AppState, action: PlatformReadyAction): AppState {
  const newState: AppState = { ...state };
  newState.platformReady = true;
  return newState;
}

function handleTodosLoadedAction(state: AppState, action: TodosLoadedAction): AppState {
  const todos = action.payload;
  const newState: AppState = { ...state, todos };
  return newState;
}

function handleTodoAddedAction(state: AppState, action: TodoAddedAction): AppState {
  const todo = action.payload;
  let newTodo;
  if (!todo.id) {
    const maxIndexInTodos = state.todos.length ? state.todos.reduce((a, b) => (a > b.id ? a : b.id), 0) : 0;
    newTodo = { ...todo, id: maxIndexInTodos + 1 };
  }
  const newState: AppState = { ...state, todos: [...state.todos, todo] };
  return newState;
}

function handleTodosClearedAction(state: AppState, action: TodosClearedAction): AppState {
  const newState: AppState = { ...state, todos: [] };
  return newState;
}
