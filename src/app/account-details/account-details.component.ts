import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsService, Account, UserData } from '../services/user-details/user-details.service';
import { share, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  account$: Observable<Account>;
  account: Account;

  constructor(private route: ActivatedRoute, private userDetailsService: UserDetailsService) { }

  ngOnInit() {
    console.warn("Account details");
    
    this.route.paramMap.subscribe(params => {
      let accountId = params.get('accountId');

      this.userDetailsService.userData$.subscribe(userData => {
        this.account = userData.accounts[accountId];
      });
    });
  }

}
