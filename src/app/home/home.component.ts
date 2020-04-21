import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openPanel() {
    console.warn(document.getElementById("sideNav"));
    
    document.getElementById("sideNav").classList.add("open");
  }

  closePanel() {
    document.getElementById("sideNav").classList.remove("open");
  }

}
