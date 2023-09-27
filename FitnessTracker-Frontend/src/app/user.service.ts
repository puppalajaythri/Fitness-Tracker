// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/fitness-tracker';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Object> {
    //const body = { email, password };
    let body = new HttpParams();
    body = body.set('email', email);
    body = body.set('password', password);
    
    return this.http.post<string>(`${this.apiUrl}/login`, body);
  }

  getUsersList(email: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/users/${email}`);
  }

  getUsersEmail(): Observable<string>{
    return this.http.get<string>(`${this.apiUrl}/register/users`);
  }

  registerUser(user: User): Observable<Object>{
    return this.http.post<User>(`${this.apiUrl}/register/users`,user);
  } 

}
