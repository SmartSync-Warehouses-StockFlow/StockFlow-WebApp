import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  private apiUrl = 'http://localhost:8080/api/smart/v1/users'; // Ruta para registrar usuarios
  private authUrl = 'http://localhost:8080/api/smart/v1/users/authenticate'; // Ruta para autenticar
  private userByUsernameUrl = 'http://localhost:8080/api/smart/v1/users/username/'; // Ruta para obtener el usuario por username

  // Creamos un BehaviorSubject para manejar el estado del username
  private usernameSubject = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  public username$ = this.usernameSubject.asObservable(); // Observable para que los componentes se suscriban a los cambios del username

  constructor(private http: HttpClient) {}

  // Método para registrar un usuario
  registerUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // Método para autenticar un usuario (login)
  loginUser(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.authUrl, credentials);
  }

  // Método para obtener usuario por username desde la API
  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.userByUsernameUrl}${username}`);
  }

  // Método para actualizar la información de un usuario
  updateUser(username: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.userByUsernameUrl}${username}`, updatedData);
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
