import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Batch } from './batch';
import { SecurityService} from './security.service';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private securityService: SecurityService, private http: HttpClient) { }
  getBatches(): Observable<Batch[]> {
   return this.http.get<Batch[]>('http://127.0.0.1:8080/services/batch');
  }
}
