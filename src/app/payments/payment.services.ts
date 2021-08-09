import { Injectable } from '@angular/core';

import { DataService } from '../services/data.services';
import { IPayments } from '../models/payment.model';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IVoidModel } from '../models/payment.void.model';



@Injectable()
export class PaymentService {
  private paymentsUrl: string = '';

  constructor(private service: DataService) {
    this.paymentsUrl = "https://localhost:44377/api/Transactions"
  }

  getPayments(pageIndex: number, pageSize: number, from?: Date, to?: Date, status?: number): Observable<IPayments> {
    let url = this.paymentsUrl;

    url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

    return this.service.get(url).pipe<IPayments>(tap((response: any) => {
      return response;
    }));
  }

  voidPayment(paymentId:string, orderReference:string){
    let url = "https://localhost:44377/api/Authorize";

    url = url + "/"+paymentId+"/voids";

    return this.service.post(url, orderReference).pipe<IVoidModel>(tap((response: any) => {
      return response;
    }));
  }

  capturePayment(paymentId:string, orderReference:string){
    let url = "https://localhost:44377/api/Authorize";

    url = url + "/"+paymentId+"/capture";

    return this.service.post(url, orderReference).pipe<IVoidModel>(tap((response: any) => {
      return response;
    }));
  }
}
