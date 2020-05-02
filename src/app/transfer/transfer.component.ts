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

  constructor( ) { }

  ngOnInit() {
    
  }

}
