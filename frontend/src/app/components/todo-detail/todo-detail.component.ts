// todo-detail.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService, Todo } from '../../services/todo.service';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-detail.component.html'
})
export class TodoDetailComponent {
  @Input() todo!: Todo;
  note = '';

  constructor(private todoService: TodoService) {}

  addNote() {
    if (this.note.trim()) {
      this.todoService.addNote(this.todo._id!, this.note).subscribe(() => {
        this.todo.notes.push(this.note);
        this.note = '';
      });
    }
  }
}
