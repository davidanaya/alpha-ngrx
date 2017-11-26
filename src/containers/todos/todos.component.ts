import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Store } from "@ngrx/store";

import { Todo, TodosService } from "./todos.service";
import { AppState } from "../../store/state/app-state";
import { TodoAddedAction, TodosClearedAction } from "../../store/actions/todo-actions";

@Component({
  selector: "todos",
  templateUrl: "todos.component.html"
})
export class TodosComponent implements OnInit {
  private todos$: Observable<Todo[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.todos$ = this.store.select(state => state.todos);
  }

  addTodo() {
    const newTodo = { id: null, text: `todo`, complete: false };
    this.store.dispatch(new TodoAddedAction(newTodo));
  }

  clearTodos() {
    this.store.dispatch(new TodosClearedAction());
  }
}
