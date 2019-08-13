import TodoStore from "../stores/TodoStore";

let todoStore;
beforeEach(() => {
  todoStore = new TodoStore();
});

describe("Todo item model", () => {
  it("should test whether toggleCompleted of model works", () => {
    todoStore.addTodo("item 1");
    todoStore.todos[0].toggleCompleted();
    expect(todoStore.todos[0].isCompleted).toBeTruthy();
    todoStore.todos[0].toggleCompleted();
    expect(todoStore.todos[0].isCompleted).toBeFalsy();
  });

  it("should test whether edit todo function is able to edit the todo", () => {
    todoStore.addTodo("this is a todo");
    todoStore.todos[0].editTodo("this is edited");
    expect(todoStore.todos[0].description).toBe("this is edited");
  });
});
