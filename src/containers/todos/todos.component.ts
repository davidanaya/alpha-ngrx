import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Store } from "@ngrx/store";

import { Todo, TodosService } from "./todos.service";
import { AppState } from "../../store/state/app-state";

@Component({
  selector: "todos",
  templateUrl: "todos.component.html"
})
export class TodosComponent implements OnInit {
  private todos$: Observable<Todo[]>;

  constructor(private store: Store<AppState>, private todosService: TodosService) {}

  ngOnInit() {
    this.todos$ = this.store.select(state => state.todos);
  }

  addTodo() {
    const newTodo = { id: null, text: `todo`, complete: false };
    this.todosService.addTodo(newTodo);
  }

  clearTodos() {
    this.todosService.clearTodos();
  }
}
