import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentData;

  constructor() { }

  setData(data: any) {
    this.paymentData = data;
  }

}
