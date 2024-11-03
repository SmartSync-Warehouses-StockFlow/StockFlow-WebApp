
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
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

  changePlan(): void {
    alert("Plan change functionality will be implemented here.");
  }
}
