import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import { AppState } from "../../store/state/app-state";
import { Store } from "@ngrx/store";
import { TodosLoadedAction, LoadTodosAction } from "../../store/actions/todo-actions";
import { StorageService } from "../../services/storage.service";

export class Todo {
  id: number;
  text: string;
  complete: boolean;
}

@Injectable()
export class TodosService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private storageService: StorageService
  ) {
    this.store
      .select(state => state.platformReady)
      .filter(platformReady => !!platformReady)
      .take(1) // we only want to subscribe once
      .subscribe(async () => {
        const todos = await this.storageService.loadTodos();
        if (!todos) {
          this.store.dispatch(new LoadTodosAction());
        } else {
          this.store.dispatch(new TodosLoadedAction(todos));
        }
      });
  }

  loadTodos(): Observable<Todo[]> {
    return this.http
      .get<any>(`assets/db/todos.json`)
      .delay(2000)
      .map(todos => this.todoToViewModel(todos));
  }

  private todoToViewModel(todos: any[]): Todo[] {
    return todos.map(todo =>
      Object.assign({}, { id: todo.id, text: todo.description, complete: todo.complete })
    );
  }
}
