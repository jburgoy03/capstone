import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PO } from './po.class';
import { Vendor } from './vendor.class';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  baseurl: string = "http://localhost:5238/api/vendors"

  constructor(
    private http: HttpClient
  ) { }

  createPo(id: number): Observable<PO> {
    return this.http.get(`${this.baseurl}/po/${id}`) as Observable<PO>;
  }

  list(): Observable<Vendor[]> {
    return this.http.get(`${this.baseurl}`) as Observable<Vendor[]>;
  }
  
  get(id: number): Observable<Vendor> {
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Vendor>; 
  }

  create(vend: Vendor): Observable<Vendor> {
    return this.http.post(`${this.baseurl}`, vend) as Observable<Vendor>;
  } 
  
  change(vend: Vendor): Observable<any> {
    return this.http.put(`${this.baseurl}/${vend.id}`, vend) as Observable<any>;
  } 
  
  remove(id: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/${id}`) as Observable<any>;
  } 
}
