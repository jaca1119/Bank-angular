import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { RegisterComponent } from './register/register.component';
import { TransferComponent } from './transfer/transfer.component';
import { InternalComponent } from './internal/internal.component';
import { DomesticComponent } from './domestic/domestic.component';
import { TransferDetailsComponent } from './account-details/transfer-details/transfer-details.component';
import { CreateAccountComponent } from './create-account/create-account.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      AccountDetailsComponent,
      RegisterComponent,
      TransferComponent,
      InternalComponent,
      DomesticComponent,
      TransferDetailsComponent,
      CreateAccountComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
