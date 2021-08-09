import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { catchError }           from 'rxjs/operators';

import { PaymentService }       from './payment.services';
import { IPayments }             from '../models/payment.model';
import { IPager }               from '../models/pager.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-payments',
  providers: [PaymentService],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  payments!: IPayments;
  paginationInfo!: IPager;
  errorReceived: boolean = false;
  constructor(private service: PaymentService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {

    this.getTransactions(10, 1);
}

onPageChanged( value: any) {
  this.paginationInfo.actualPage = value;
  this.getTransactions(this.paginationInfo.itemsPage, value);
}

getTransactions(pageSize: number, pageIndex: number) {
  this.errorReceived = false;
  this.service.getPayments(pageIndex, pageSize)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe(transactions => {
          this.payments = transactions;
          this.paginationInfo = {
              actualPage : pageIndex,
              itemsPage : pageSize,
              totalItems : transactions.totalcount,
              totalPages: Math.ceil(transactions.totalcount / pageSize),
              items: pageSize
          };
  });
}

voidTransaction(paymentId: string, orderReference: string){
    this.service.voidPayment(paymentId,orderReference);
}

captureTransaction(paymentId: string, orderReference: string){
  this.service.capturePayment(paymentId,orderReference);
}

private handleError(error: any) {
  this.errorReceived = true;
  return Observable.throw(error);
}

private setHeaders(options: any, needId?: boolean){

      options["headers"] = new HttpHeaders()
          .append('Access-Control-Allow-Origin', 'https://localhost:44377')  
}
}
