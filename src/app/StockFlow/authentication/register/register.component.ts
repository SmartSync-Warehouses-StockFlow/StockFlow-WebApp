import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  // Importa Router y RouterModule
import  UserService  from 'src/app/Service/Userservice';  // Asegúrate de que la importación sea correcta
import { FormsModule } from '@angular/forms';  // Importa FormsModule para ngModel
import { CommonModule } from '@angular/common';  // Importa CommonModule para usar ngFor

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,  // Asegúrate de que el componente sea independiente
  imports: [RouterModule, FormsModule, CommonModule]  // Agrega CommonModule
})
export default class RegisterComponent {
  user = {
    id: 0,
    username: '',
    password: '',
    email: ''
  };

  SignUpOptions = [
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

  register(): void {
    this.userService.registerUser(this.user).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/dashboard/default']);  // Redirigir después de registrar
      },
      (error) => {
        console.error('Error registering user:', error);
        alert('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
