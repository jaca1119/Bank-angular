import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, ReplaySubject } from 'rxjs';
import { environment } from "../../../environments/environment";
import { ITransfer } from './ITransfer';

export interface Account {
  accountBusinessId: string,
  balanceInHundredScale: number,
  currency: string,
  name: string,
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


  constructor(private http: HttpClient) { }

  getUserData() {
    this.http.get<UserData>(environment.API_KEY + "/user-data", {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    })
      .subscribe(userData => this.userDataSubject.next(userData));
  }

  getAccountTransfers(accountId: string) {
    return this.http.get<ITransfer>(`${environment.API_KEY}/account/${accountId}/transfers`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    });
  }

}
