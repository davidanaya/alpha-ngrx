import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

export interface Todo {
  id: number;
  text: string;
  complete: boolean;
}

@Injectable()
export class TodosService {
  public todos$: Observable<Todo[]>;

  constructor(private http: HttpClient) {
    this.todos$ = this.http.get<any>(`assets/db/todos.json`).map(todos => this.todoToViewModel(todos));
  }

  private todoToViewModel(todos: any[]): Todo[] {
    console.log(todos);
    return todos.map(todo => Object.assign({}, { id: todo.id, text: todo.description, complete: todo.complete }));
  }
}
