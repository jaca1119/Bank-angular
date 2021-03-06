import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { TransferComponent } from './transfer/transfer.component';
import { environment } from "../environments/environment";
import { InternalComponent } from './transfer/internal/internal.component';
import { DomesticComponent } from "./transfer/domestic/domestic.component";
import { CreateAccountComponent } from './create-account/create-account.component';
import { InfoMessageComponent } from './info-message/info-message.component';

let authPath;
let enableTracing;

if (environment.production) {
  authPath = {
    path: 'auth',
    component: HomeComponent,
    canActivate: [AuthGuard],

    children: [
      { path: 'account/:accountId', component: AccountDetailsComponent },
      {
        path: 'transfer', component: TransferComponent, children: [
          { path: 'internal', component: InternalComponent },
          { path: 'domestic', component: DomesticComponent }
        ]
      },
      { path: 'create', component: CreateAccountComponent },
      { path: 'info', component: InfoMessageComponent }
    ]
  };

  enableTracing = { enableTracing: false };

} else {
  authPath = {
    path: 'auth',
    component: HomeComponent,
    children: [
      { path: 'account/:accountId', component: AccountDetailsComponent },
      {
        path: 'transfer', component: TransferComponent, children: [
          { path: 'internal', component: InternalComponent },
          { path: 'domestic', component: DomesticComponent }
        ]
      },
      { path: 'create', component: CreateAccountComponent },
      { path: 'info', component: InfoMessageComponent }
    ]
  };

  enableTracing = { enableTracing: true };
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
    enableTracing
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
