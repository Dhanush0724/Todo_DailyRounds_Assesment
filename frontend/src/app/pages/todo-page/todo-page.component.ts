import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
  imports: [CommonModule, FormsModule],
})
export class TodoPageComponent implements OnInit {
  todos: Todo[] = [];
  sortBy: string = 'created_at';
  order: number = -1;

  filters = {
    priority: '',
    created_by: '',
    tag: ''
  };

  page: number = 1;
  limit: number = 5;

  todo: Partial<Todo> = {
    title: '',
    description: '',
    priority: 'Medium',
    tags: [],
    notes: [],
    created_by: ''
  };

  tagsInput = '';
  editingTodo = false;
  editingTodoId = '';

  // Mention logic
  usernames: string[] = [];
  filteredUsers: string[] = [];
  showUserSuggestions = false;

  constructor(private todoService: TodoService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchTodos();
    this.fetchUsers();
  }

  fetchUsers() {
  this.http.get<any[]>('http://localhost:5000/api/users/').subscribe(users => {
    this.usernames = users.map(u => u.username); // Extract strings
  });
}


  fetchTodos() {
    const skip = (this.page - 1) * this.limit;
    this.todoService.getTodos(this.sortBy, this.order, this.filters, skip, this.limit)
      .subscribe((data) => {
        this.todos = data;
      });
  }

  onSubmit() {
    this.todo.tags = this.tagsInput.split(',').map(tag => tag.trim()).filter(Boolean);

    if (this.editingTodo) {
      const { _id, ...updatePayload } = this.todo;
      this.todoService.updateTodo(this.editingTodoId, updatePayload).subscribe(() => {
        this.fetchTodos();
        this.resetForm();
      });
    } else {
      this.todoService.addTodo(this.todo as Todo).subscribe(() => {
        this.fetchTodos();
        this.resetForm();
      });
    }
  }

  editTodo(todo: Todo) {
    this.todo = { ...todo };
    this.tagsInput = todo.tags.join(', ');
    this.editingTodo = true;
    this.editingTodoId = todo._id || '';
  }

  deleteTodo(id: string) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.fetchTodos();
      });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.todo = {
      title: '',
      description: '',
      priority: 'Medium',
      tags: [],
      notes: [],
      created_by: ''
    };
    this.tagsInput = '';
    this.editingTodo = false;
    this.editingTodoId = '';
    this.showUserSuggestions = false;
  }

  nextPage() {
    this.page++;
    this.fetchTodos();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchTodos();
    }
  }

  onTagInputChange(value: string) {
    const atIndex = value.lastIndexOf('@');
    if (atIndex !== -1) {
      const query = value.substring(atIndex + 1).toLowerCase();
      this.filteredUsers = this.usernames.filter(user =>
        user.toLowerCase().startsWith(query)
      );
      this.showUserSuggestions = this.filteredUsers.length > 0;
    } else {
      this.showUserSuggestions = false;
    }
  }

  selectUser(user: string) {
    const atIndex = this.tagsInput.lastIndexOf('@');
    this.tagsInput = this.tagsInput.substring(0, atIndex) + '@' + user + ' ';
    this.showUserSuggestions = false;
  }
}
