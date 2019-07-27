import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const routes: Routes = [{
  path: 'users', component: UsersComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class UsersRoutingModule {

  constructor(

  ) {

  }

}
