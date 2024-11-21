// angular import
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../login-form.model';
import { ServicesService } from '../../../service/services.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  loginForm: FormGroup<LoginForm>;
  submitted = false;
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

  constructor(
    private formBuilder: FormBuilder,
    private authService: ServicesService,
    private router: Router,
    private toastr: ToastrService // Opcional: para notificaciones
  ) {
    this.loginForm = this.formBuilder.group<LoginForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  // Getter para facilitar el acceso a los controles del formulario
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Detener si el formulario no es válido
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    // Llamar al servicio para autenticar al usuario
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        // Almacenar el token o información necesaria
        // Por ejemplo, si el backend devuelve un token JWT:
        // localStorage.setItem('token', response.token);

        // Mostrar una notificación de éxito
        this.toastr.success('Inicio de sesión exitoso', 'Éxito');

        // Redirigir al dashboard o a otra página
        this.router.navigate(['/dashboard/default']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        // Mostrar mensaje de error al usuario
        this.toastr.error('Credenciales inválidas. Por favor, inténtalo de nuevo.', 'Error');
      }
    });
  }
}
