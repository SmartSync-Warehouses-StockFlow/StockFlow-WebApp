import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Store {
  branch: string;
  name: string;
  address: string;
  city: string;
  zipcode: string;
  phone: string;
}

@Component({
  selector: 'app-manage-store',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule aquí
  templateUrl: './manage-store.component.html',
  styleUrl: './manage-store.component.scss'
})
export default class ManageStoreComponent {
  stores: Store[] = [
    {
      branch: 'Singanallur Branch',
      name: 'Lisy Store',
      address: '1A/Krishnarajapuram, 3rd street sulur',
      city: 'Coimbatore',
      zipcode: '6313403',
      phone: '044-653578'
    },
    {
      branch: 'Slur Branch',
      name: 'Lisy Store',
      address: '54 Ramani colony, 3rd street sulur',
      city: 'Coimbatore',
      zipcode: '63133452',
      phone: '044-653763'
    },
    {
      branch: 'Gaandipuram Branch',
      name: 'Lisy Store',
      address: '32/ Venkatasamy layout, 3rd street sulur',
      city: 'Coimbatore',
      zipcode: '6313403',
      phone: '044-653578'
    }
  ];

  addStore() {
    // Lógica para agregar una nueva tienda
    console.log('Add Store button clicked');
  }

  editStore(store: Store) {
    // Lógica para editar la tienda seleccionada
    console.log('Edit Store button clicked for:', store);
  }
}
