import { Component, OnInit } from '@angular/core';
import { UserDetailsService, UserData } from '../services/user-details/user-details.service';

import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userData: UserData;
  isDataLoaded = false;

  constructor(
    private userDetailsService: UserDetailsService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.userDetailsService.getUserData();
    this.userDetailsService.userData$.subscribe(userData => this.userData = userData);
  }

  openPanel() {
    document.getElementById("sideNav").classList.add("open");
  }

  closePanel() {
    document.getElementById("sideNav").classList.remove("open");
  }

  logout() {
    this.authService.logout();
  }

}
