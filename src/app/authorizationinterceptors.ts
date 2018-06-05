import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SecurityService} from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptors implements HttpInterceptor {
    constructor(private securityService: SecurityService, private router: Router ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
    let authRequest = request;
    if (this.securityService.authenticated) {
       authRequest = request.clone({
        headers: request.headers.set('Authorization', this.securityService.authorization)
      });
    } else {
       this.router.navigate( ['/login'] );
    }
    return next.handle(authRequest);
  }
}

