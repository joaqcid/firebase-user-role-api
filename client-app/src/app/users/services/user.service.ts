import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://us-central1-joaq-lab.cloudfunctions.net/api'

  constructor(
    private http: HttpClient
  ) { }

  get users$(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${this.baseUrl}/users`).pipe(
      map(result => {
        return result.users
      })
    )
  }
}
