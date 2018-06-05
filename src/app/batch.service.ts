import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Batch } from './batch';
import { SecurityService} from './security.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private securityService: SecurityService, private http: HttpClient) { }
  getBatches(): Observable<Batch[]> {
   return this.http.get<Batch[]>(environment.backendUrl + 'services/batch');
  }
}
