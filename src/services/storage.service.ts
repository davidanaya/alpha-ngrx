import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Todo } from "../containers/todos/todos.service";

@Injectable()
export class StorageService {
  constructor(private storage: Storage) {
  }

  async loadTodos(): Promise<Todo[]> {
    let todos;
    try {
      todos = await this.storage.get("todos");
      console.log("Todos loaded from storage", todos);
    } catch (err) {
      console.error("Could not load todos from storage", err.message);
    }
    return todos;
  }

  async saveTodos(todos: Todo[]): Promise<any> {
    let saved = false;
    try {
      saved = await this.storage.set("todos", todos);
      console.log("Todos saved in storage", todos);
    } catch (err) {
      console.error("Could not save todos in storage", err.message);
    }
    return saved;
  }
}
