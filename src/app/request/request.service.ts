import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from './request.class';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseurl: string = "http://localhost:5238/api/requests";

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<Request[]> {
    return this.http.get(`${this.baseurl}`) as Observable<Request[]>;
  }
  
  get(id: number): Observable<Request> {
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Request>;
  }

  getReview(id: number): Observable<any> {
    return this.http.get(`${this.baseurl}/getreviews/${id}`) as Observable<any>;
  }

  approve(id: number, req: Request): Observable<any> {
    return this.http.put(`${this.baseurl}/approved/${req.id}`, req) as Observable<any>;
  }

  reject(id: number, req: Request): Observable<any> {
    return this.http.put(`${this.baseurl}/rejected/${req.id}`, req) as Observable<any>;
  }
  
  review(id: number, req: Request): Observable<Request[]> {
    return this.http.put(`${this.baseurl}/review/${req.id}`, req) as Observable<Request[]>;
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/${id}`) as Observable<any>;
  } 
  
  change(req: Request): Observable<any> {
    return this.http.put(`${this.baseurl}/${req.id}`, req) as Observable<any>;
  }
  
  create(req: Request): Observable<Request> {
    return this.http.post(`${this.baseurl}`, req) as Observable<Request>;
  } 
}
