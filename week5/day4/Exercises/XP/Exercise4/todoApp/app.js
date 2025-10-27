import {TodoList} from './todo.js';

const todoList = new TodoList();

todoList.addTodo({ title: 'Learn Python', completed: false });
todoList.addTodo({ title: 'Learn React', completed: false });
todoList.addTodo({ title: 'Learn Node.js', completed: false });

todoList.markAsCompleted(1);

console.log(todoList.getTodos());