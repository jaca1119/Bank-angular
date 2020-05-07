import { Component, OnInit, Input } from '@angular/core';
import { ITransferContent } from 'src/app/services/user-details/ITransferContent';

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.css']
})
export class TransferDetailsComponent implements OnInit {
  @Input() transfer: ITransferContent;

  constructor() { }

  ngOnInit() {
  }

  getTransferDate() {
    const transferDate = new Date(this.transfer.transferDateTime)

    const options = { year: 'numeric', month: 'long', day: '2-digit', hour: 'numeric', minute: 'numeric' };
    const dateFormat = Intl.DateTimeFormat(undefined, options).format;

    return dateFormat(transferDate);
  }

}
