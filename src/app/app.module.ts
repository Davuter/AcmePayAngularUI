import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentsComponent } from './payments/payments.component';
import { PagerComponent } from './pager/pager.component';
import { DataService } from './services/data.services';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
