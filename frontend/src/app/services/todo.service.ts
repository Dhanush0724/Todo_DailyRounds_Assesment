import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  _id?: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  tags: string[];
  notes: string[];
  created_by: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/api/todos/';

  constructor(private http: HttpClient) {}

  getTodos(
    sortBy: string,
    order: number,
    filters: { [key: string]: string } = {},
    skip: number = 0,
    limit: number = 10
  ): Observable<Todo[]> {
    let params = new HttpParams()
      .set('sort_by', sortBy)
      .set('order', order.toString())
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    for (const key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }

    return this.http.get<Todo[]>(this.apiUrl, { params });
  }

  addTodo(todo: Todo): Observable<any> {
    return this.http.post(this.apiUrl, todo);
  }

  getTodoById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}${id}`);
  }

  updateTodo(id: string, todo: Partial<Todo>): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, todo);
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

  addNote(id: string, note: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${id}/notes`, { note });
  }
}
