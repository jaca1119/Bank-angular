import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

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
    req.open('POST', environment.API_KEY + '/register', true);
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
