// src/app/service/services.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../StockFlow/authentication/user.module'; // Asegúrate de que la ruta es correcta
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'https://charming-purpose-production.up.railway.app/api/smart/v1/';
  private registerUrl = `${this.apiUrl}users`;
  private loginUrl = `${this.apiUrl}users/authenticate`;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.registerUrl, user, { headers });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.loginUrl, credentials, { headers });
  }
}
