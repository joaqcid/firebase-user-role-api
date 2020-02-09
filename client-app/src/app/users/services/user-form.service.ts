import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  _BS = new BehaviorSubject({ title: '', user: {} });

  constructor() { }

  edit(user) {
    this._BS.next({ title: 'Edit User', user });
  }

  create() {
    this._BS.next({ title: 'Create User', user: null });
  }

  get title$() {
    return this._BS.asObservable().pipe(
      map(uf => uf.title)
    );
  }

  get user$() {
    return this._BS.asObservable().pipe(
      map(uf => uf.user)
    );
  }
}
