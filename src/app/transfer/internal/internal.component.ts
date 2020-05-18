import { Component, OnInit } from '@angular/core';
import { UserDetailsService, Account } from 'src/app/services/user-details/user-details.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.css']
})
export class InternalComponent implements OnInit {
  accounts: Account[];
  transferGroup: FormGroup;

  constructor(
    private userDetailsService: UserDetailsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) {
    this.transferGroup = formBuilder.group({
      accountFrom: [''],
      accountTo: [''],
      message: [''],
      amount: ['', Validators.min(1)]
    })
  }

  ngOnInit() {
    this.userDetailsService.userData$.subscribe(userData => {
      this.accounts = userData.accounts
    });
  }

  onSubmit() {
    let transferDTO = this.createTransferDTO(this.transferGroup.value);

    if (this.transferGroup.valid) {
      this.http.post(environment.API_KEY + "/transfer", transferDTO, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true,
        observe: 'response',
        responseType: 'text'
      })
        .subscribe(response => {
          if (response.ok) {
            this.userDetailsService.getUserData();
          }
        },
          err => {
            this.router.navigateByUrl("auth/info", {
              state: {
                isSuccessful: false,
              }
            });
          },
          () => {
            this.router.navigateByUrl("auth/info", {
              state: {
                isSuccessful: true,
              }
            });
          });
    }
  }

  createTransferDTO(formValue) {
    let transferDTO = {
      from: formValue.accountFrom,
      to: formValue.accountTo,
      message: formValue.message,
      amountInHundredScale: formValue.amount * 100,
      transferDateTime: Date.now(),
      transferType: "INTERNAL",
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return transferDTO
  }

}
