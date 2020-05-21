import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PaymentService } from '../services/payment/payment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginFailed: boolean = false;
  loginForm: FormGroup;
  isPayment: boolean = false;
  timeout;
  isWaitingForServer: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.timeout = setTimeout(() => {
      this.isWaitingForServer = true;
    }, 1000);

    this.authService.authenticate(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(() => {
        this.isLoginFailed = !this.authService.isLoggedIn();

        if (!this.isLoginFailed) {
          this.navigate();
        }
      });
  }

  onDestroy() {
    clearTimeout(this.timeout);
  }

  navigate() {

    if (this.isPayment) {
      this.router.navigateByUrl('/auth/transfer/domestic');
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

  onRegistrationClick() {
    this.router.navigateByUrl('/register');
  }

  refreshToken() {
    this.authService.refreshToken();
  }

  @HostListener('window:message', ['$event'])
  onPostMessage(event: MessageEvent) {

    if (!environment.PAYMENT_URLS.includes(event.origin)) {
      return;
    }

    this.isPayment = true;
    this.paymentService.setData(event.data);
  }

}
