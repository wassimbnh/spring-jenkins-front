import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../Invoice';
import { Observable } from 'rxjs';
import { InvoiceUpdate } from '../InvoiceUpdate';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  constructor(private http: HttpClient) { }

  addInvoice(invoice: Invoice): Observable<Invoice>{
    return this.http.post<Invoice>('http://192.168.33.10:8095/add-invoice',invoice);
  }

  getAllInvoices():Observable<Invoice[]>{
    return this.http.get<Invoice[]>('http://192.168.33.10:8095/invoice');
  }

  deleteInvoice(id: number): Observable<Invoice>{
    return this.http.delete<Invoice>(`http://192.168.33.10:8095/invoice/delete/${id}`);
  }

  updateInvoice(invoice: InvoiceUpdate, id: number) : Observable<Invoice[]>{
    return this.http.put<Invoice[]>(`http://192.168.33.10:8095/invoice/update/${id}`,invoice);
  }

  detailInvoice(id: number): Observable<Invoice>{
    return this.http.get<Invoice>(`http://192.168.33.10:8095/invoice/${id}`)
  }

}
