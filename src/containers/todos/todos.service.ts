import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import { AppState } from "../../store/state/app-state";
import { Store } from "@ngrx/store";
import { TodosLoadedAction } from "../../store/actions/todo-actions";

export class Todo {
  id: number;
  text: string;
  complete: boolean;
}

@Injectable()
export class TodosService {
  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store
      .select(state => state.todos)
      .skip(1) // skip store initializer, could also use skipUntil or any other merge/filter operator
      .take(1) // we only want load from http once
      .filter(todos => !todos)
      .subscribe(todos =>
        this.loadTodos().subscribe(todos => {
          this.store.dispatch(new TodosLoadedAction(todos));
        })
      );
  }

  private loadTodos(): Observable<Todo[]> {
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
