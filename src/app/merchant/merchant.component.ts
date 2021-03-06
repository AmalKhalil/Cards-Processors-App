import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FileUploader, FileSelectDirective , Headers} from 'ng2-file-upload/ng2-file-upload';
import { JsonPipe } from '@angular/common';
import { Observable ,  Subscription } from 'rxjs';
import {Message} from '@stomp/stompjs';
import {StompService} from '@stomp/ng2-stompjs';

import { SecurityService} from '../security.service';
import { BatchService} from '../batch.service';
import { MessageService} from '../message.service';
import { Batch } from '../batch';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private messages: Observable<Message>;
  private subscribed: boolean;
  batches: Batch[] = [];
  isMerchant = false;
  constructor(private changeDetectorRef: ChangeDetectorRef,
              private _stompService: StompService,
              private securityService: SecurityService,
              private batchService: BatchService,
              public messageService: MessageService) {
  }
  public uploader: FileUploader = new FileUploader({url: environment.backendUrl + 'services/batch', itemAlias: 'file',
    headers : [ {name : 'authorization' , value: this.securityService.authorization}]});
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const responseObject = JSON.parse(response);
      this.messageService.clear();
      if (responseObject['errorMessage']) {
          this.messageService.add( responseObject['errorMessage']);
       } else {
          this.messageService.add('File uploaded successfully');
      }
     };
    this.batchService.getBatches().subscribe(batches => this.batches = batches);
    this.isMerchant = this.securityService.isMerchant();
    if (this.isMerchant) {
      this.subscribe();
      this.sendMessage();
    }
  }

  public sendMessage() {
    this._stompService.publish('/merchant', 'Subscribed');
  }

  private subscribe() {
    if (this.subscribed) {
      return;
    }

    // Stream of messages
    this.messages = this._stompService.subscribe('/user/' + this.securityService.userName + '/reply');

    // Subscribe a function to be run on_next message
    this.subscription = this.messages.subscribe(this.onMessageRecieved);

    this.subscribed = true;
  }

  public unsubscribe() {
    if (!this.subscribed) {
      return;
    }

    this.subscription.unsubscribe();
    this.subscription = null;
    this.messages = null;
    this.subscribed = false;
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


  public onMessageRecieved = (message: Message) => {
    this.batchService.getBatches().subscribe(batches => this.setBatches(batches));
    console.log(message);
  }

  private setBatches(batches) {
    this.batches = batches;
    alert('Batch Result is ready');
    this.changeDetectorRef.detectChanges();
  }
}
