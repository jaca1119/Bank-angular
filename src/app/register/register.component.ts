import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = formBuilder.group({
      username: [''],
      email: [''],
      password: ['']
    });
   }

  ngOnInit() {
  }

  onSubmit(registrationData) {

  }

}
