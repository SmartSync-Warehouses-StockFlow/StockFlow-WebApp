import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class OrderService {
  private apiUrl = 'http://localhost:8080/api/smart/v1/orders/'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener las órdenes de un usuario específico
  getUserByOrder(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${username}`);
  }

  // Crear una nueva orden para un usuario específico
  createOrder(username: string, orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${username}`, orderData);
  }
}
