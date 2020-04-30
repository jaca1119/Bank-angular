import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, share, map, shareReplay } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

export interface Account {
  accountBusinessId: string,
  balanceInHundredScale: number,
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

  constructor(private http: HttpClient ) { }

  getUserData() {
    return this.http.get<UserData>(environment.API_KEY + "/user-data", {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    }).pipe(shareReplay(2));
  }

  updateUserData() {
    console.warn("Updating user data");
    
    this.getUserData();
  }
  
}
