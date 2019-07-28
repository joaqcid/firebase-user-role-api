import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

export type CreateUserRequest = { displayName: string, password: string, email: string, role: string }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://us-central1-joaq-lab.cloudfunctions.net/api/users'

  constructor(
    private http: HttpClient
  ) { }

  get users$(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${this.baseUrl}`).pipe(
      map(result => {
        return result.users
      })
    )
  }

  user$(id: string): Observable<User> {
    return this.http.get<{ user: User }>(`${this.baseUrl}/${id}`).pipe(
      map(result => {
        return result.user
      })
    )
  }

  create(user: CreateUserRequest) {
    return this.http.post(`${this.baseUrl}`, user).pipe(
      map(_ => { })
    )
  }
}
