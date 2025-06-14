import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TodoDetailPageComponent } from './pages/todo-detail-page/todo-detail-page.component';

const routes: Routes = [
  { path: '', component: TodoPageComponent },
  { path: 'todo/:id', component: TodoDetailPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
