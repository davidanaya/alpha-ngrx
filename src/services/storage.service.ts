import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Todo } from "../containers/todos/todos.service";
import { AppState } from "../store/state/app-state";
import { Store } from "@ngrx/store";
import { TodosLoadedAction } from "../store/actions/todo-actions";

@Injectable()
export class StorageService {
  constructor(private storage: Storage, private store: Store<AppState>) {
    this.store.select(state => state.todos).subscribe(todos => this.saveTodos(todos));
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
