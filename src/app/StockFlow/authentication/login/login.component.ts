// src/app/authentication/login/login.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import UserService from 'src/app/Service/Userservice'; // Importar el servicio
import { FormsModule } from '@angular/forms';  // Importa FormsModule para ngModel
import { CommonModule } from '@angular/common';  // Importa CommonModule para usar ngFor

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  // Public model to bind the input fields
  credentials = {
    username: '',
    password: ''
  };

  // Public method for social login options
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];

  constructor(private userService: UserService, private router: Router) {}

  // Method to handle login on form submission
  login(): void {
    this.userService.loginUser(this.credentials).subscribe(
      (response) => {
        console.log('User logged in successfully:', response);
        // Save the token or any necessary data (e.g., in localStorage or sessionStorage)
        localStorage.setItem('auth_token', response.token);  // Assuming the response has a token
        localStorage.setItem('username', this.credentials.username); // Save username in localStorage
        this.router.navigate(['/dashboard/default']);  // Redirect to dashboard after login
      },
      (error) => {
        console.error('Error logging in:', error);
        alert('Error al iniciar sesión. Por favor, revisa tus credenciales.');
      }
    );
  }
}
