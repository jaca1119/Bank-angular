import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const API_URL = "https://bank-app-spring.herokuapp.com";

export interface Account {
  accountBusinessId: string,
  balance: number,
  currency: string,
  id: number
}

export interface UserData {
  id: number,
  username: string,
  enabled: boolean,
  accounts: Account[]
}

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  userData: UserData;

  constructor(private http: HttpClient ) { }

  getUserData() {
    return this.http.get<UserData>(API_URL + "/user-data", {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      withCredentials: true
    }).toPromise()
    .then(data => {
      this.userData = data;
      return data;
    });
  }

}
