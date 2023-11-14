import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../Supplier';
import { Observable } from 'rxjs';
import { SupplierUpdate } from '../SupplierUpdate';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://192.168.33.10:8095/supplier'

  addSupplier(supplier: Supplier): Observable<Supplier>{
    return this.http.post<Supplier>(this.baseUrl,supplier);
  }

  getAllSuppliers():Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.baseUrl);
  }

  deleteSupplier(id: number): Observable<Supplier>{
    return this.http.delete<Supplier>(`http://192.168.33.10:8095/supplier/${id}`);
  }

  updateSupplier(supplier: SupplierUpdate, id: number) : Observable<Supplier[]>{
    return this.http.put<Supplier[]>(`http://192.168.33.10:8095/supplier/${id}`,supplier);
  }

  detailSupplier(id: number): Observable<Supplier>{
    return this.http.get<Supplier>(`http://192.168.33.10:8095/supplier/${id}`);
  }
}
