import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = 'http://localhost:8080/api/smart/v1/products/'; // URL base para los productos

  constructor(private http: HttpClient) {}

  // Obtener productos por username
  getProducts(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${username}`);
  }

  // Agregar un nuevo producto
  addProduct(product: any, username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${username}`, product);
  }


  // Eliminar un producto por id
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
