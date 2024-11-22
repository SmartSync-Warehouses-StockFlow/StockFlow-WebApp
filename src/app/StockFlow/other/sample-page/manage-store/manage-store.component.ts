import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from 'src/app/Service/storeservice'; // Ruta correcta para el servicio StoreService
import { FormsModule } from '@angular/forms';  // Importa FormsModule para ngModel

// Modelo Store integrado dentro del archivo
interface Store {
  id: number;
  name: string;
  direction: string;
  phone: string;
  supervisor: string;
}

@Component({
  selector: 'app-manage-store',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-store.component.html',
  styleUrls: ['./manage-store.component.scss']
})
export default class ManageStoreComponent implements OnInit {
  stores: Store[] = []; 
  isFormVisible = false;  // Controla la visibilidad del formulario
  isEditing = false;  // Determina si estamos editando o añadiendo una tienda
  currentStore: Store = { id: 0, name: '', direction: '', phone: '', supervisor: '' }; // Tienda actual a editar o agregar

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadStores('Darcy');
  }

  loadStores(username: string): void {
    this.storeService.getStores(username).subscribe(
      (stores) => {
        this.stores = stores;
      },
      (error) => {
        console.error('Error loading stores:', error);
      }
    );
  }

  // Abrir el formulario (para agregar o editar)
  openForm(action: string, store?: Store): void {
    this.isFormVisible = true;
    if (action === 'edit' && store) {
      this.isEditing = true;
      this.currentStore = { ...store }; // Copiar la tienda para editar
    } else {
      this.isEditing = false;
      this.currentStore = { id: 0, name: '', direction: '', phone: '', supervisor: '' }; // Limpiar el formulario para agregar
    }
  }

  // Cerrar el formulario sin guardar
  closeForm(): void {
    this.isFormVisible = false;
  }

  // Enviar el formulario (agregar o editar tienda)
  onSubmit(): void {
    if (this.isEditing) {
      this.storeService.editStore(this.currentStore.id, 'Darcy', this.currentStore).subscribe(
        (updatedStore) => {
          this.loadStores('Darcy');
          this.closeForm();
        },
        (error) => {
          console.error('Error updating store:', error);
        }
      );
    } else {
      this.storeService.addStore(this.currentStore, 'Darcy').subscribe(
        (newStore) => {
          this.loadStores('Darcy');
          this.closeForm();
        },
        (error) => {
          console.error('Error adding store:', error);
        }
      );
    }
  }
}
