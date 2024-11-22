import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import SupplierService from 'src/app/Service/supplierservice';

interface Supplier {
  id: number;
  name: string;
  direction: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    NzPaginationModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
})
export default class SuppliersComponent implements OnInit {
  // Estado para la tabla y el formulario
  isLoading: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 10;
  listOfSuppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];
  isFormVisible: boolean = false;

  // Nuevo proveedor
  newSupplier: Supplier = {
    id: 0,
    name: '',
    direction: '',
    phone: '',
    email: '',
  };

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers(); // Cargar proveedores al iniciar el componente
  }

  // Cargar todos los proveedores usando el servicio
  loadSuppliers(): void {
    this.isLoading = true;
    this.supplierService.getAllSuppliers().subscribe({
      next: (suppliers: Supplier[]) => {
        this.listOfSuppliers = suppliers;
        this.updateFilteredSuppliers();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching suppliers:', error);
        this.isLoading = false;
      },
    });
  }

  // Actualizar la paginación
  updateFilteredSuppliers(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    this.filteredSuppliers = this.listOfSuppliers.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  // Manejar el cambio de página
  onPageChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateFilteredSuppliers();
  }

  // Mostrar u ocultar el formulario
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  // Agregar un nuevo proveedor
  addSupplier(): void {
    this.supplierService.addSupplier(this.newSupplier).subscribe({
      next: (supplier: Supplier) => {
        this.listOfSuppliers.push(supplier); // Agregar al listado
        this.resetForm(); // Resetear el formulario
        this.updateFilteredSuppliers(); // Actualizar la tabla
      },
      error: (error: any) => {
        console.error('Error adding supplier:', error);
      },
    });
  }

  // Resetear el formulario
  resetForm(): void {
    this.newSupplier = {
      id: 0,
      name: '',
      direction: '',
      phone: '',
      email: '',
    };
    this.isFormVisible = false;
  }
}
