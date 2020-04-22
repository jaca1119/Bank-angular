import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginValue: string = '';
  isLoginFailed: boolean = false;
  loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
        this.loginForm = this.formBuilder.group({
          username: '',
          password: ''
        });
     }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.authenticate(this.loginForm.value.username, this.loginForm.value.password)
    .then(response => {
      if (response.ok) {
        this.router.navigateByUrl('/auth');
      } else {
        this.isLoginFailed = true;
      }
    })
  }

  onRegistrationClick() {
    this.router.navigateByUrl('/register');
  }

}
