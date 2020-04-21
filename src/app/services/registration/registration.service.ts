import { Injectable } from '@angular/core';

const API_URL = "https://bank-app-spring.herokuapp.com";

interface RegistrationData {
  username: String,
  email: String,
  password: String
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

constructor() { }

  register(registrationData: RegistrationData) {
    console.warn(registrationData);

    fetch(API_URL + '/register', {
      method: "POST",
      body: JSON.stringify(registrationData)
    })
    .then(response => {
      console.warn(response)
    })
  }

}
