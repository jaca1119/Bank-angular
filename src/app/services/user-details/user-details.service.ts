import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, ReplaySubject } from 'rxjs';
import { catchError, retry, share, map, shareReplay } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

export interface Account {
  accountBusinessId: string,
  balanceInHundredScale: number,
  currency: string,
  id: string
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
  private userDataSubject = new ReplaySubject<UserData>(1);

  userData$: Observable<UserData> = this.userDataSubject.asObservable();


  constructor(private http: HttpClient ) { }

  getUserData() {
    this.http.get<UserData>(environment.API_KEY + "/user-data", {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    })
    .subscribe(userData => this.userDataSubject.next(userData));
  }

  updateUserData() {
    console.warn("Updating user data");
    
    this.getUserData();
  }
  
}
