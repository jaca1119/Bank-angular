import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-timer',
  templateUrl: './token-timer.component.html',
  styleUrls: ['./token-timer.component.css']
})
export class TokenTimerComponent implements OnInit {
  minutes = 10;
  seconds = 0;
  formattedTime: string;
  intervalTime;

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.intervalTime = setInterval(() => {
      this.timer();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalTime);
  }

  timer() {
    this.seconds--;
    if (this.seconds < 0) {
      this.minutes--;
      if (this.minutes < 0) {
        this.timerEnd();
      } else {
        this.seconds = 60;
      }
    }

    this.formatTime();
  }

  timerEnd() {
    this.minutes = 0;
    this.seconds = 0;
    clearInterval(this.intervalTime);

    this.authService.logout();
    this.router.navigateByUrl('');
  }

  formatTime() {
    if (this.seconds < 10) {
      this.formattedTime = `${this.minutes}:0${this.seconds}`;
    } else {
      this.formattedTime = `${this.minutes}:${this.seconds}`;
    }
  }

  refreshToken() {
    this.resetTimer();

    this.authService.refreshToken();
  }

  resetTimer() {
    this.minutes = 10;
    this.seconds = 0;
  }
}
