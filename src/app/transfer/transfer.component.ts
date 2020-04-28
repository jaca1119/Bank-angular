import { Component, OnInit } from '@angular/core';
import { UserDetailsService, Account } from '../services/user-details/user-details.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  accounts: Account[];
  transferGroup: FormGroup;

  constructor(
    private userDetailsService: UserDetailsService,
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) {
      this.transferGroup = formBuilder.group({
        accountFrom: '',
        accountTo: '',
        amount: 0
      })
      this.accounts = userDetailsService.userData.accounts;
   }

  ngOnInit() {
  }

  onSubmit() {
    console.warn("Submit transfer");
    console.warn(this.transferGroup.value);
    let transferDTO = this.createTransferDTO(this.transferGroup.value);

    this.http.post(environment.API_KEY + "/transfer", transferDTO ,{
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    }).subscribe(response => {
      console.warn(response);
    })

  }

  createTransferDTO(formValue) {
    let transferDTO = {
      from: formValue.accountFrom,
      to: formValue.accountTo,
      amountInHundredScale: formValue.amount * 100,
      transferDateTime: Date.now(),
      transferType: "INTERNAL",
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone 
    };
    return transferDTO
  }

}
