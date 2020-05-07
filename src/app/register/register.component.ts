import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  isRegistrationSucceed = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService) {
    this.registrationForm = formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.registrationService.register(this.registrationForm.value)
      .subscribe(response => {
        if (response.status === 200) {
          this.isRegistrationSucceed = true;
        }
      });
  }

  navigateToLogin() {
    this.router.navigateByUrl('/');
  }

}
