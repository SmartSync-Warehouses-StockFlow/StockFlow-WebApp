import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = 'http://localhost:8080/api/smart/v1/stores/'; // URL base para las tiendas

  constructor(private http: HttpClient) {}

  // Obtener tiendas por username
  getStores(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${username}`);
  }

  // Agregar una nueva tienda
  addStore(store: any, username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${username}`, store);
  }

  // Editar una tienda por id y username
  editStore(id: number, username: string, store: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/${username}`, store);
  }
}
