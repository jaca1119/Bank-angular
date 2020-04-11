import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountDetailsComponent } from './account-details/account-details.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth', component: HomeComponent, children: [
    { path: 'account/:accountId', component: AccountDetailsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
