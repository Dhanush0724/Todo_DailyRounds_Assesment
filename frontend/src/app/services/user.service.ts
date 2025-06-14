import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5000/users/'); // adjust port if needed
  }
}
