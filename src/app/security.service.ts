import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  authenticated = false;
  authorization = null;
  userName = null;
  role = null;
  constructor(private http: HttpClient) { }
  login(user,  callback) {
    this.authorization = 'Basic ' + btoa(user.userName + ':' + user.password);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
   this.http.post('http://127.0.0.1:8080/services/security/login', user, httpOptions).subscribe(response => {
            if (response['id']) {
                this.authenticated = true;
                this.role = response['role'];
                this.userName = response['userName'];
            } else {
                this.authenticated = false;
            }
            return callback && callback(response['errorMessage']);
        });
  }
  isMerchant(): boolean {
    return 'Merchant' === this.role;
  }

}
