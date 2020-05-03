import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface RegistrationData {
  username: String,
  email: String,
  password: String
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  register(registrationData: RegistrationData) {
    console.warn(JSON.stringify(registrationData));

    return this.http.post(`${environment.API_KEY}/register`, registrationData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response',
      withCredentials: true,
      responseType: 'text'
    });
  }

}
