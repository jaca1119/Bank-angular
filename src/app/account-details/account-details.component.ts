import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsService, Account } from '../services/user-details/user-details.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  account: Account;

  constructor(private route: ActivatedRoute, private userDetailsService: UserDetailsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let accountId = params.get('accountId');
      this.account = this.userDetailsService.userData.accounts[accountId];
    })
  }

}
