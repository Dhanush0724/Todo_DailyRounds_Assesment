import { Routes } from '@angular/router';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TodoDetailPageComponent } from './pages/todo-detail-page/todo-detail-page.component';

export const routes: Routes = [
  { path: '', component: TodoPageComponent },
  { path: 'todo/:id', component: TodoDetailPageComponent }
];
