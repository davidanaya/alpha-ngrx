import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import { StorageService } from "../../services/storage.service";

export interface Todo {
  id: number;
  text: string;
  complete: boolean;
}

@Injectable()
export class TodosService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  loadTodos(): Observable<Todo[]> {
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

  saveTodos(todos: Todo[]) {
    this.storageService.saveTodos(todos);
  }

  private todoToViewModel(todos: any[]): Todo[] {
    return todos.map(todo =>
      Object.assign({}, { id: todo.id, text: todo.description, complete: todo.complete })
    );
  }
}
