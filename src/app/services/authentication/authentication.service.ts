import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { tap, shareReplay, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) {
    let json = JSON.stringify({ username, password });

    return this.http.post(environment.API_KEY + "/authenticate", json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response',
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      tap(response => {
        if (response.status === 200) {
          sessionStorage.setItem('isLoggedIn', 'true');
        }
      }),
      catchError(() => {
        sessionStorage.setItem('isLoggedIn', 'false');

        return of(null);
      }));
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

  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
  }

}
