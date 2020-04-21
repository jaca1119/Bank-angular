import { Injectable } from '@angular/core';

const API_URL = "https://bank-app-spring.herokuapp.com";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(username: string, password: string): boolean {
    
    let isAuthenticationSucessful = false;

    var req = new XMLHttpRequest();
    req.open('POST', API_URL + '/authenticate', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.withCredentials = true;
    req.onreadystatechange = function (aEvt) {
        if (req.readyState === 4) {
            if(req.status === 200) {
                console.log(req.responseText);
                isAuthenticationSucessful = true;
            }
            else
                console.log("Error loading site");
        }
    };

    req.send(JSON.stringify({username, password}));

    return isAuthenticationSucessful;
  }

}
