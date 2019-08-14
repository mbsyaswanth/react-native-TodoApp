import { observable, action } from "mobx";
import { persist } from "mobx-persist";
export default class TodoItem {
  @persist id;
  @persist @observable description;
  @persist @observable isCompleted;
  setDefault(description) {
    this.id = Date.now();
    this.description = description;
    this.isCompleted = false;
  }

  @action.bound toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  @action.bound editTodo(editedText) {
    this.description = editedText;
  }
}
