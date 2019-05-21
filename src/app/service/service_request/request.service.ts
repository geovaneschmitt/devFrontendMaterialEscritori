import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Request } from '../../component/component_request/request';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/';

  postCreate(request: Request): Observable<Request> {
    return this.http.post<Request>(this.url + 'request', request).pipe(map(el => {return el;}),catchError(err => { return Observable.throw(err);}));
  }

  putUpdate(request: Request): Observable<Request> { 
    return this.http.put<Request>(this.url + 'request', request).pipe(map(el => {return el;}),catchError(err => { return Observable.throw(err);}));
  }

  getRequests() {
    return this.http.get(this.url + 'requests');
  }

  getRequestsByStatus(status: string) {
    return this.http.get(this.url + 'request/' + status);
  }

  getRequestById(id: string) {
    return this.http.get(this.url + 'requests/' + id);
  }

  getRequestByFilter(filter: Request) {
    return this.http.get(this.url + 'filter?priority=' + filter.priority + 'status=' + filter.status + '&userRequest=' + filter.userRequester + '&description=' + filter.description);
  }
}
