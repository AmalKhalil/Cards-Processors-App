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
   this.messageService.add('Login .....');
   this.securityService.login(this.user);
   this.router.navigateByUrl('merchants');
  }
  ngOnInit() {

  }

}
