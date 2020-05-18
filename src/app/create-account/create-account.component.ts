import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetailsService } from '../services/user-details/user-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createAccountGroup: FormGroup;


  constructor(
    private userService: UserDetailsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createAccountGroup = this.formBuilder.group({
      accountName: ['', [Validators.minLength(3), Validators.maxLength(60), Validators.required]],
      currency: [{ value: 'EUR', disabled: true }, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.createAccountGroup.valid) {
      this.userService.createAccount(this.createAccountGroup.getRawValue())
        .subscribe(response => {
          this.userService.getUserData();
          this.router.navigateByUrl('/auth');
        });
    }
  }
}
