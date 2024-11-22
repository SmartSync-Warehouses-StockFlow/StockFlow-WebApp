import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class SupplierService {
  private apiUrl = 'http://localhost:8080/api/smart/v1/suppliers'; // URL para proveedores

  constructor(private http: HttpClient) {}

  // Obtener todos los proveedores
  getAllSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar un nuevo proveedor
  addSupplier(supplier: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, supplier);
  }
}
