import { Component } from '@angular/core';
import {StompService} from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Card Processor';
  constructor(private _stompService: StompService) {
  }
  ngOnInit() {
      this._stompService.initAndConnect();
    }

}
