import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Todo, TodosService } from "./todos.service";

@Component({
  selector: "todos",
  templateUrl: "todos.component.html"
})
export class TodosComponent implements OnInit {
  private todos: Todo[] = [];
  private loaded = false;

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todosService.loadTodos().subscribe(todos => {
      this.loaded = true;
      this.todos = todos;
      this.todosService.saveTodos(this.todos);
    });
  }

  addTodo() {
    const maxIndexInTodos = this.todos.length ? this.todos.reduce((a, b) => (a > b.id ? a : b.id), 0) : 0;
    const newTodo = { id: maxIndexInTodos + 1, text: `todo ${maxIndexInTodos}`, complete: false };
    this.todos = [...this.todos, newTodo];
    this.todosService.saveTodos(this.todos);
  }

  clearTodos() {
    this.todos = [];
    this.todosService.saveTodos(this.todos);
  }
}
