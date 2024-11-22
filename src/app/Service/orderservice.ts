import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class OrderService {
  private getOrders = 'http://localhost:8080/api/smart/v1/orders/';
  // Creamos un BehaviorSubject para manejar el estado del username
  private usernameSubject = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  public username$ = this.usernameSubject.asObservable(); // Observable para que los componentes se suscriban a los cambios del username

  constructor(private http: HttpClient) {}

  // Método para registrar un usuario
  registerUser(username, any, user: any): Observable<any> {
    return this.http.post(`${this.getOrders}${username}`, user);
  }

  // Método para obtener usuario por username desde la API
  getUserByOrder(username: string): Observable<any> {
    return this.http.get(`${this.getOrders}${username}`);
  }

  // Método para actualizar el username y notificar a los suscriptores
  setUsername(username: string): void {
    localStorage.setItem('username', username); // Guardamos el username en localStorage
    this.usernameSubject.next(username); // Notificamos a los suscriptores con el nuevo username
  }

  // Método para obtener el username actual
  getUsername(): string | null {
    return this.usernameSubject.value; // Devolvemos el valor actual del username
  }
}
