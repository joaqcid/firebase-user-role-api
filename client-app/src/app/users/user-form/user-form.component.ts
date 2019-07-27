import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(
    public modal: NgbActiveModal,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modal.dismiss()
  }

  save() {
    this.userService.create({ displayName: 'new', email: 'test@ldlksadssdslk.com', role: 'user', password: '123456' }).subscribe(_ => {
      this.modal.dismiss()
    })
  }

}
