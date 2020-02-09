import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormService } from '../services/user-form.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { debug } from 'util';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl(''),
    displayName: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
  });
  title$: Observable<string>;
  user$: Observable<{}>;

  constructor(
    public modal: NgbActiveModal,
    private userService: UserService,
    private userForm: UserFormService
  ) { }

  ngOnInit() {
    this.title$ = this.userForm.title$;
    this.user$ = this.userForm.user$.pipe(
      tap(user => {
        if (user) {
          this.form.patchValue(user);
        } else {
          this.form.reset({});
        }
      })
    );
  }

  dismiss() {
    this.modal.dismiss('modal dismissed');
  }

  save() {
    const { displayName, email, role, password, uid } = this.form.value;
    this.modal.close({ displayName, email, role, password, uid });
  }

}
