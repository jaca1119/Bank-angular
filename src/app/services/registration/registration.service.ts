import { Injectable } from '@angular/core';

const API_URL = "https://bank-app-spring.herokuapp.com";
// const API_URL = "http://localhost:8080";

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
    console.warn(JSON.stringify(registrationData));

    var req = new XMLHttpRequest();
    req.open('POST', API_URL + '/register', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.withCredentials = true;
    req.onreadystatechange = function (aEvt) {
        if (req.readyState === 4) {
            if(req.status === 200) {
                console.log(req.responseText);
            }
            else
                console.log("Error loading site");
        }
    };

    req.send(JSON.stringify(registrationData));
  }

}
