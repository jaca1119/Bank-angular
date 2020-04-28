import { Component, OnInit } from '@angular/core';
import { UserDetailsService, UserData } from '../services/user-details/user-details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userData: UserData;
  isDataLoaded = false;

  constructor(private userDetailsService: UserDetailsService) { }

  ngOnInit() {
    this.userDetailsService.getUserData()
    .then((data: UserData) => {
      this.userData = data;
      this.isDataLoaded = true;
    });
  }

  openPanel() {    
    document.getElementById("sideNav").classList.add("open");
  }

  closePanel() {
    document.getElementById("sideNav").classList.remove("open");
  }

}
