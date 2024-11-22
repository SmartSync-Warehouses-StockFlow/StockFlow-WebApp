import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


interface Supplier {
  supplierName: string;
  product: string;
  contactNumber: string;
  email: string;
  type: string;
  onTheWay: number;
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
    CommonModule
  ],
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export default class SuppliersComponent implements OnInit {
  // Variables para la tabla
  isLoading: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 10;
  filteredSuppliers: any[] = [];
  listOfSuppliers: Supplier[] = [];

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

  ngOnInit(): void {
    // Llamar al servicio para obtener los datos del usuario usando el username
    this.orderService.getUserByOrder(this.username).subscribe({
        next: (products: Order[]) => {
          this.dataSet = products
        },
        error: (error: any) => {
          console.error('Error fetching products:', error);
        },

    });
}

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


  applyFilters(): void {
    console.log('Filters applied');
  }

  downloadAll(): void {
    console.log('Download all data');
  }
}
