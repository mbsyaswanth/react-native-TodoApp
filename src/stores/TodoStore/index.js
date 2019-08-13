import TodoItem from "../../Model/todoItem";
import { observable, action, computed } from "mobx";
import { filters } from "../../constants";
class TodoStore {
  @observable todos = [];
  @observable filter = filters.all;

  @action.bound addTodo(todoDescription) {
    this.todos.push(new TodoItem(todoDescription));
    return this.todos[this.todos.length - 1];
  }

  @action.bound removeTodo(todo) {
    this.todos = this.todos.filter(eachTodo => {
      return eachTodo !== todo;
    });
  }

  @action.bound setFilter(filter) {
    this.filter = filter;
  }

  @computed get filteredList() {
    if (this.filter === filters.all) {
      return this.todos;
    }
    if (this.filter === filters.completed) {
      return this.todos.filter(todo => {
        return todo.isCompleted;
      });
    }
    if (this.filter === filters.active) {
      return this.todos.filter(todo => {
        return !todo.isCompleted;
      });
    }
  }

  @action.bound clearCompleted() {
    this.todos = this.todos.filter(todo => {
      return !todo.isCompleted;
    });
  }

  @computed get activeCount() {
    return this.todos.filter(todo => {
      return !todo.isCompleted;
    }).length;
  }
}

export default TodoStore;
