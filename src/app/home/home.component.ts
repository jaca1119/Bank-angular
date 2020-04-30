import { Component, OnInit } from '@angular/core';
import { UserDetailsService, UserData } from '../services/user-details/user-details.service';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userData: Observable<UserData>;
  isDataLoaded = false;

  constructor(private userDetailsService: UserDetailsService) { }

  ngOnInit() {  
    this.userData = this.userDetailsService.getUserData();
  }

  openPanel() {    
    document.getElementById("sideNav").classList.add("open");
  }

  closePanel() {
    document.getElementById("sideNav").classList.remove("open");
  }

}
