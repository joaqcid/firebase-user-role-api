import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../user-form/user-form.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>
  user$: Observable<User>

  constructor(
    private userService: UserService,
    private modal: NgbModal,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.users$ = this.userService.users$

    this.user$ = this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user.uid))
    )
  }

  openModal() {
    this.modal.open(UserFormComponent)
  }

}
