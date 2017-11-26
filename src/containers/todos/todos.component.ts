import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Todo, TodosService } from "./todos.service";

@Component({
  selector: "todos",
  templateUrl: "todos.component.html"
})
export class TodosComponent implements OnInit {
  private todos$: Observable<Todo[]>;

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todos$ = this.todosService.todos$;
  }

  addTodo() {
    const newTodo = { id: null, text: `todo`, complete: false };
    this.todosService.addTodo(newTodo);
  }

  clearTodos() {
    this.todosService.clearTodos();
  }
}
