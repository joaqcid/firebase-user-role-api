import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.users$ = this.userService.users$
  }

}
