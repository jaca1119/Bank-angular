import { Injectable } from '@angular/core';

const API_URL = "https://bank-app-spring.herokuapp.com";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(username: string, password: string) {
    let json = JSON.stringify({username, password});
    
    return fetch(API_URL + '/authenticate', {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
      })
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(exception => {
        console.warn(exception);
        return exception;
      });
  }

  refreshToken() {
    return fetch(API_URL + '/refresh-token', {
      method: "GET",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(exception => {
      console.warn(exception);
      return exception;
    });
  }

}
