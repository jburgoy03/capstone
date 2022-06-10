import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLine } from './requestline.class';

@Injectable({
  providedIn: 'root'
})
export class RequestlineService {

  baseurl: string = "http://localhost:5238/api/requestlines";

  constructor(
    private http: HttpClient
  ) { }

  get(id: number): Observable<RequestLine> {
    return this.http.get(`${this.baseurl}/${id}`) as Observable<RequestLine>;
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/${id}`) as Observable<any>;
  }

  change(reql: RequestLine): Observable<any> {
    return this.http.put(`${this.baseurl}/${reql.id}`, reql) as Observable<any>;
  }

  create(reql: RequestLine): Observable<RequestLine> {
    return this.http.post(`${this.baseurl}`, reql) as Observable<RequestLine>;
  }
}
