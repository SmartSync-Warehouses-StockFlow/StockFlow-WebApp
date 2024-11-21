// angular import
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesService } from '../../../service/services.service';
import { User } from '../user.module';
import { CommonModule } from '@angular/common';
import { RegisterForm } from '../register-form.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,CommonModule ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {
  registerForm: FormGroup<RegisterForm>;
  submitted = false;
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

  constructor(
    private formBuilder: FormBuilder,
    private userService: ServicesService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group<RegisterForm>({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      phone: new FormControl('')
    });
  }

  ngOnInit(): void { }

  // Getter para facilitar el acceso a los controles del formulario
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Detener si el formulario no es válido
    if (this.registerForm.invalid) {
      return;
    }

    // Crear el objeto de usuario
    const user: User = {
      username: `${this.registerForm.value.firstName} ${this.registerForm.value.lastName}`,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone: this.registerForm.value.phone
      // Puedes agregar más campos si es necesario
    };

    // Llamar al servicio para registrar el usuario
    this.userService.register(user).subscribe({
      next: (data) => {
        // Manejar la respuesta exitosa
        console.log('Usuario registrado:', data);
        // Redirigir al dashboard o a otra página
        this.router.navigate(['/dashboard/default']);
      },
      error: (error) => {
        // Manejar errores
        console.error('Error al registrar el usuario:', error);
        // Puedes mostrar un mensaje de error al usuario
      }
    });
  }
}
