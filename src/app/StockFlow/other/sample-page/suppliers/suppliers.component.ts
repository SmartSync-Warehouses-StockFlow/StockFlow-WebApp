import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms'; // Módulo para manejar formularios
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export default class SuppliersComponent {
  // Variables para la tabla
  isLoading: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 10;
  filteredSuppliers: any[] = [];
  listOfSuppliers: any[] = [
    { supplierName: 'Richard Martin', product: 'Kit Kat', contactNumber: '7687764556', email: 'richard@gmail.com', type: 'Taking Return', onTheWay: 13 },
    { supplierName: 'Tom Homan', product: 'Maaza', contactNumber: '9867545368', email: 'tomhoman@gmail.com', type: 'Taking Return', onTheWay: 0 },
    { supplierName: 'Veandir', product: 'Dairy Milk', contactNumber: '9867545566', email: 'veandir@gmail.com', type: 'Not Taking Return', onTheWay: 0 },
    { supplierName: 'Charin F.', product: 'Tomatoes', contactNumber: '9234567890', email: 'charin@gmail.com', type: 'Taking Return', onTheWay: 8 },
    { supplierName: 'Susan Green', product: 'Green Tea', contactNumber: '9012345678', email: 'susan.green@gmail.com', type: 'Not Taking Return', onTheWay: 3 },
    { supplierName: 'Ahmed Khan', product: 'Biscuits', contactNumber: '8123456789', email: 'ahmed.khan@gmail.com', type: 'Taking Return', onTheWay: 5 },
    { supplierName: 'Ella Morgan', product: 'Detergent', contactNumber: '7890123456', email: 'ella.morgan@gmail.com', type: 'Not Taking Return', onTheWay: 2 },
    { supplierName: 'John Carter', product: 'Chocolates', contactNumber: '6789012345', email: 'john.carter@gmail.com', type: 'Taking Return', onTheWay: 6 },
    { supplierName: 'Marie Hudson', product: 'Cooking Oil', contactNumber: '5678901234', email: 'marie.hudson@gmail.com', type: 'Taking Return', onTheWay: 9 },
    { supplierName: 'David Black', product: 'Coffee', contactNumber: '4567890123', email: 'david.black@gmail.com', type: 'Not Taking Return', onTheWay: 4 },
    { supplierName: 'Hannah Brown', product: 'Shampoo', contactNumber: '3456789012', email: 'hannah.brown@gmail.com', type: 'Taking Return', onTheWay: 7 },
    { supplierName: 'Liam White', product: 'Sugar', contactNumber: '2345678901', email: 'liam.white@gmail.com', type: 'Taking Return', onTheWay: 10 },
    { supplierName: 'Sophia Gray', product: 'Pasta', contactNumber: '1234567890', email: 'sophia.gray@gmail.com', type: 'Not Taking Return', onTheWay: 1 }
  ];
  

  // Variables para el formulario
  isFormVisible: boolean = false;
  newSupplier: any = {
    supplierName: '',
    product: '',
    category: '',
    buyingPrice: null,
    contactNumber: '',
    type: ''
  };
  categories: string[] = ['Beverages', 'Snacks', 'Cleaning', 'Personal Care', 'Others'];

  constructor() {
    this.updateFilteredSuppliers();
  }

  // Métodos para la tabla
  updateFilteredSuppliers(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    this.filteredSuppliers = this.listOfSuppliers.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateFilteredSuppliers();
  }

  sortName = (a: any, b: any) => a.supplierName.localeCompare(b.supplierName);
  sortProduct = (a: any, b: any) => a.product.localeCompare(b.product);
  sortOnTheWay = (a: any, b: any) => a.onTheWay - b.onTheWay;

  // Métodos para el formulario
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  addSupplier(): void {
    console.log('Nuevo Proveedor:', this.newSupplier);
    this.listOfSuppliers.push({ ...this.newSupplier });
    this.resetForm();
    this.updateFilteredSuppliers();
  }

  resetForm(): void {
    this.newSupplier = {
      supplierName: '',
      product: '',
      category: '',
      buyingPrice: null,
      contactNumber: '',
      type: ''
    };
    this.isFormVisible = false;
  }

  // Métodos adicionales
  applyFilters(): void {
    console.log('Filters applied');
  }

  downloadAll(): void {
    console.log('Download all data');
  }
}
