import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import { StorageService } from "../../services/storage.service";
import { AppState } from "../../store/state/app-state";
import { Store } from "@ngrx/store";
import { TodosLoadedAction } from "../../store/actions/todo-actions";

export interface Todo {
  id: number;
  text: string;
  complete: boolean;
}

@Injectable()
export class TodosService {
  private todos: Todo[];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private store: Store<AppState>
  ) {
    this.loadTodos().subscribe(todos => {
      this.todos = todos;
      this.store.dispatch(new TodosLoadedAction(this.todos));
    });
  }

  addTodo(newTodo: Todo) {
    // const maxIndexInTodos = this.todos.length ? this.todos.reduce((a, b) => (a > b.id ? a : b.id), 0) : 0;
    // newTodo.id = maxIndexInTodos + 1;
    // this.todos = [...this.todos, newTodo];
    // this.subject.next(this.todos);
    // this.saveTodos(this.todos);
  }

  clearTodos() {
    // this.todos = [];
    // this.subject.next(this.todos);
    // this.saveTodos(this.todos);
  }

  private loadTodos(): Observable<Todo[]> {
    return Observable.fromPromise(this.storageService.loadTodos()).mergeMap((todos: Todo[]) => {
      if (todos) {
        return Observable.of(todos);
      }
      console.log("No todos in storage, loading from http...");
      return this.http
        .get<any>(`assets/db/todos.json`)
        .delay(2000)
        .map(todos => this.todoToViewModel(todos));
    });
  }

  private saveTodos(todos: Todo[]) {
    this.storageService.saveTodos(todos);
  }

  private todoToViewModel(todos: any[]): Todo[] {
    return todos.map(todo =>
      Object.assign({}, { id: todo.id, text: todo.description, complete: todo.complete })
    );
  }
}
