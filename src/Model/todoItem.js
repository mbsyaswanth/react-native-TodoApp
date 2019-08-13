import { observable, action } from "mobx";

export default class TodoItem {
  id;
  @observable description;
  @observable isCompleted;
  constructor(description) {
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
