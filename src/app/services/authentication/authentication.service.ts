import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) {
    let json = JSON.stringify({username, password});

      return this.http.post(environment.API_KEY + "/authenticate", json, {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response',
        withCredentials: true,
        responseType: 'text'
      }).toPromise()
      .then(response => {
        if (response.ok) {
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
        }
        return response;
      });
  }

  refreshToken() {
    return fetch(environment.API_KEY + '/refresh-token', {
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
