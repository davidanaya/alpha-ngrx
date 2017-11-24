import { AppState, INITIAL_STATE } from "../state/app-state";
import { Action } from "@ngrx/store";

export function storeReducer(state: AppState = INITIAL_STATE, action: Action): AppState {
  switch (action.type) {
    default:
      return state;
  }
}
