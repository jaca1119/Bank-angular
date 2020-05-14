import { Component, OnInit } from '@angular/core';
import { UserDetailsService, Account } from '../../services/user-details/user-details.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-domestic',
  templateUrl: './domestic.component.html',
  styleUrls: ['./domestic.component.css']
})
export class DomesticComponent implements OnInit {
  transferGroup: FormGroup;
  accounts: Account[];
  isPayment: boolean = true;

  constructor(
    private userDetailsService: UserDetailsService,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private http: HttpClient,
  ) {
    this.transferGroup = formBuilder.group({
      accountFrom: [''],
      accountTo: [{ value: '', disabled: false }],
      message: [''],
      amount: [0, Validators.min(1)]
    });
  }

  ngOnInit() {
    this.userDetailsService.userData$.subscribe(userData => {
      this.accounts = userData.accounts
    });

    if (this.paymentService.paymentData) {
      this.transferGroup.controls['accountTo'].disable();
    }
  }

  onSubmit() {
    let transferDTO = this.createTransferDTO(this.transferGroup.value);

    this.http.post(environment.API_KEY + "/transfer", transferDTO, {
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
