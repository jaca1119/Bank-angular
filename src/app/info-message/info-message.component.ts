import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.css']
})
export class InfoMessageComponent implements OnInit {
  isSuccessful: boolean;
  message: string;

  constructor(private router: Router) {
    this.isSuccessful = this.router.getCurrentNavigation().extras.state.isSuccessful;
    if (this.isSuccessful) {
      this.message = "Operation was successful";
    } else {
      this.message = "Something went wrong with executing operation"
    }
  }

  ngOnInit() {
  }

}
