import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponentComponent } from './components/user-form-component/user-form-component.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponentComponent } from './components/user-list-component/user-list-component.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registerForm',component:UserFormComponentComponent},
  { path: 'listUsers',component:UserListComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
