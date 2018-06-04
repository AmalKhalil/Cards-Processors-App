import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';
import {StompConfig, StompService} from '@stomp/ng2-stompjs';

import { AppComponent } from './app.component';
import { AuthorizationInterceptors } from './authorizationinterceptors';
import { LoginComponent } from './login/login.component';
import { MerchantComponent } from './merchant/merchant.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import * as SockJS from 'sockjs-client';

const stompConfig: StompConfig = {
  url: new SockJS('http://127.0.0.1:8080/socket'),

  headers: {
    login: '',
    passcode: ''
  },

  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  reconnect_delay: 5000,

  debug: true
};
@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    MerchantComponent,
    LoginComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptors, multi: true},
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
