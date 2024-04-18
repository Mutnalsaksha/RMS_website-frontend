
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

interface ApiResponse {
  message: string;
  data: any; // Change this to the actual type of your data
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  bookOrder(orderData: any): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.baseUrl}/orders/book-order`, orderData);
  }
}
