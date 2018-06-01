import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }
  login(user) {
    //TODO : Integration with backend
  }
}
