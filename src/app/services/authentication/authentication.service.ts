import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(username: string, password: string): boolean {
    if (username === "user" && password === "user") {
      return true;
    } else {
      return false;
    }
  }

}
