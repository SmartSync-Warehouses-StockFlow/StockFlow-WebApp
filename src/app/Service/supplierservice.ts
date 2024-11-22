import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = 'http://localhost:8080/api/smart/v1/suppliers'; // URL base para los productos
  private addSupplierUrl = 'http://localhost:8080/api/smart/v1/supplier/'; // URL base para los productos

  constructor(private http: HttpClient) {}

  // Obtener productos por username
  getSupplier(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Agregar un nuevo producto
  addSupplier(product: any, username: string): Observable<any> {
    return this.http.post(`${this.addSupplierUrl}`, product);
  }


  // Eliminar un producto por id
  deleteSupplier(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
