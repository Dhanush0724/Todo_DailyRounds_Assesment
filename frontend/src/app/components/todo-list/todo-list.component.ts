import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [], 
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  selectedTodo: Todo | null = null;

  sortBy: string = 'created_at';
  order: number = -1;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos(this.sortBy, this.order).subscribe(data => {
      this.todos = data;
    });
  }

  viewDetails(todo: Todo) {
    this.selectedTodo = todo;
  }
}
