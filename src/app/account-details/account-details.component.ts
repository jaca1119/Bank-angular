import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsService, Account, UserData } from '../services/user-details/user-details.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  account: Account;
  transfers;

  constructor(private route: ActivatedRoute, private userDetailsService: UserDetailsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let accountId = params.get('accountId');

      this.userDetailsService.userData$.subscribe(userData => {
        this.account = userData.accounts.find(account => {
          return account.id == accountId;
        });
      });

      this.userDetailsService.getAccountTransfers(accountId).subscribe(accountTransfers => {
        this.transfers = accountTransfers.content;
      });

    });
  }

}
