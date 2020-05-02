import { Component, OnInit } from '@angular/core';
import { UserDetailsService, Account } from '../services/user-details/user-details.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-foreign-domestic',
  templateUrl: './foreign-domestic.component.html',
  styleUrls: ['./foreign-domestic.component.css']
})
export class ForeignDomesticComponent implements OnInit {
  transferGroup: FormGroup;
  accounts: Account[];

  constructor(
    private userDetailsService: UserDetailsService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    this.transferGroup = formBuilder.group({
      accountFrom: '',
      accountTo: '',
      message: '',
      amount: 0
    });
   }

  ngOnInit() {
    this.userDetailsService.userData$.subscribe(userData => {
      this.accounts = userData.accounts
    });
  }
  
  onSubmit() {
    let transferDTO = this.createTransferDTO(this.transferGroup.value);

    this.http.post(environment.API_KEY + "/transfer", transferDTO ,{
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    }).subscribe(response => {
      if (response.ok) {
        this.userDetailsService.getUserData();
      }
    });
  }

  createTransferDTO(formValue) {
    let transferDTO = {
      from: formValue.accountFrom,
      to: formValue.accountTo,
      message: formValue.message,
      amountInHundredScale: formValue.amount * 100,
      transferDateTime: Date.now(),
      transferType: "DOMESTIC",
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone 
    };
    return transferDTO
  }

}
