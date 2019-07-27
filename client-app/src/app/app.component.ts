import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from './sign-in/sign-in.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loggedIn$: Observable<boolean>
  loggedOut$: Observable<boolean>

  constructor(
    private modal: NgbModal,
    private afAuth: AngularFireAuth
  ) {

  }

  ngOnInit() {
    this.loggedIn$ = this.afAuth.authState.pipe(
      map(user => !!user)
    )

    this.loggedOut$ = this.loggedIn$.pipe(
      map(loggedIn => !loggedIn)
    )
  }

  signIn() {
    this.modal.open(SignInComponent)
  }

  signOut() {
    this.afAuth.auth.signOut()
  }

}
