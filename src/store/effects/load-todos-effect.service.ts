import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import { TodosService } from "../../containers/todos/todos.service";
import { LOAD_TODOS_ACTION, TodosLoadedAction } from "../actions/todo-actions";

@Injectable()
export class LoadTodosEffectService {
  constructor(private actions$: Actions, private todosService: TodosService) {}

  @Effect()
  todos$ = this.actions$
    .ofType(LOAD_TODOS_ACTION)
    .switchMap(() => this.todosService.loadTodos())
    .map(todos => new TodosLoadedAction(todos));
}
