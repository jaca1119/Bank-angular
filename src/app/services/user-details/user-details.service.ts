import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
  userData: UserData;

  constructor(private http: HttpClient ) { }

  async getUserData() {
    const data = await this.http.get<UserData>(environment.API_KEY + "/user-data", {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    }).toPromise();
    console.warn("GetUserData");
    

    this.userData = data;
    
    return data;
  }

  updateUserData() {
    console.warn("Updating user data");
    
    this.getUserData();
  }



}
