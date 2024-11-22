import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Reactive Forms
import { Router } from '@angular/router'; // Para la redirección si es necesario
import UserService from 'src/app/Service/userservice'; // Asegúrate de importar el servicio
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms';  // Importa FormsModule para ngModel

@Component({
  selector: 'app-profile',
  standalone: true,  // Asegúrate de que el componente sea standalone
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule], // Importa ReactiveFormsModule en lugar de FormsModule
})
export class ProfileComponent implements OnInit {
  username: string | null = localStorage.getItem('username'); // Recuperar el username desde localStorage
  userForm: FormGroup; // Formulario reactivo

  constructor(
    private userService: UserService,
    private router: Router, // Inyectar Router
    private fb: FormBuilder // Inyectar FormBuilder
  ) {
    // Crear el formulario reactivo
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phone: ['', [Validators.maxLength(30)]],
      direction: ['', [Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  ngOnInit(): void {
    if (this.username) {
      // Llamar al servicio para obtener los datos del usuario usando el username
      this.userService.getUserByUsername(this.username).subscribe((data) => {
        this.userForm.patchValue({
          username: data.username,
          email: data.email,
          phone: data.phone || '',
          direction: data.direction || '',
          password: data.password, // Aquí puedes aplicar una estrategia de seguridad
        });
      });
    }
  }

  // Método para cambiar la foto de perfil
  changeProfilePhoto(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();

    fileInput.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files ? target.files[0] : null;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const profilePhoto = document.getElementById('profilePhoto') as HTMLImageElement;
          profilePhoto.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Método para cambiar el plan (puedes personalizar esto más adelante)
  changePlan(): void {
    alert('Plan change functionality will be implemented here.');
  }

  // Método para guardar los cambios del perfil
  saveProfileChanges(): void {
    if (this.userForm.valid) {
      const updatedUserData = { ...this.userForm.value };
  
      // Si el username en el formulario es igual al username actual, lo eliminamos del objeto que se enviará
      if (updatedUserData.username === this.username) {
        delete updatedUserData.username; // Eliminar el campo username si es el mismo
      }
  
      console.log('Updated user data:', updatedUserData);  // Verifica qué datos estás enviando
  
      // Llamar al servicio para actualizar los datos del usuario
      this.userService.updateUser(this.username!, updatedUserData).subscribe(
        (response) => {
          console.log('User data updated successfully', response);
  
          // Actualizar el username en el localStorage si fue modificado
          if (updatedUserData.username && updatedUserData.username !== this.username) {
            localStorage.setItem('username', updatedUserData.username);  // Actualizar el username en el localStorage
          }
  
          alert('Profile updated successfully!');
  
          // Redirigir a la misma página para recargar los datos
          this.router.navigate(['/profile']).then(() => {
            window.location.reload();  // Forzar una recarga de la página
          });
        },
        (error) => {
          console.error('Error updating user data', error);
          alert('Error updating profile.');
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
