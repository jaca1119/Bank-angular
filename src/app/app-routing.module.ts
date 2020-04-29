import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { TransferComponent } from './transfer/transfer.component';
import { environment } from "../environments/environment";

let authPath;

if (environment.production) {
  authPath = { 
    path: 'auth',
    component: HomeComponent,
    canActivate: [AuthGuard],
    
    children: [
    { path: 'account/:accountId', component: AccountDetailsComponent },
    { path: 'transfer', component: TransferComponent }
  ]};
} else {
  authPath = { 
    path: 'auth',
    component: HomeComponent,
    children: [
    { path: 'account/:accountId', component: AccountDetailsComponent },
    { path: 'transfer', component: TransferComponent }
  ]}
}

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  authPath,
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true,
      onSameUrlNavigation: "reload" }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
