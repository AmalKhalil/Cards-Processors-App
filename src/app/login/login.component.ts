import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../user';
import { SecurityService} from '../security.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    id : -1,
    userName: '',
    password: ''
  };
  constructor(private securityService: SecurityService,
              private messageService: MessageService,
              private location: Location,
              private router: Router) { }
  signIn():  void {
   this.messageService.add('Login in progress .....');
   this.securityService.login(this.user, (error) => {
        this.messageService.clear();
        if (this.securityService.authenticated) {
          this.router.navigateByUrl('merchants');
        } else {
          this.messageService.add(error);
        }
    });
  }
  ngOnInit() {

  }

}
