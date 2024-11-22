import { Component, ChangeDetectorRef } from '@angular/core';
import { ProductService } from 'src/app/Service/productservice'; // Ajusta la ruta
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

// Define la interfaz Product
interface Product {
  status: any;
  expectedDelivery: string;
  orderId: string;
  orderValue: number;
  product: string;
  productName: string;
  productId: string;
  category: string;
  buyingPrice: number;
  quantity: number;
  unit: string;
  expiryDate: string;
  thresholdValue: number;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzCardModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    NzPaginationModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export default class InventoryComponent {
  dataSet: Product[] = [];
  isFormVisible: boolean = false;

  newProduct: {
    expiryDate: string;
    unit: string;
    buyingPrice: number;
    quantity: number;
    productId: string;
    thresholdValue: number;
    category: string;
    productName: string
  } = {
    productName: '',
    productId: '',
    category: '',
    buyingPrice: 0,
    quantity: 0,
    unit: '',
    expiryDate: '',
    thresholdValue: 0,
  };

  categories: string[] = ['Beverages', 'Snacks', 'Cleaning', 'Personal Care', 'Others'];

  constructor(private cdr: ChangeDetectorRef, private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    const username = 'testUser';
    this.productService.getProducts(username).subscribe({
      next: (products: Product[]) => {
        this.dataSet = products;
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  addProduct(): void {
    if (this.newProduct.productName && this.newProduct.productId && this.newProduct.category) {
      const username = 'testUser';
      this.productService.addProduct(this.newProduct, username).subscribe({
        next: (response: any) => {
          console.log('Product added successfully:', response);
          this.fetchProducts();
          this.resetForm();
        },
        error: (error: any) => {
          console.error('Error adding product:', error);
        },
      });
    } else {
      alert('Please fill in all required fields!');
    }
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(Number(productId)).subscribe({
      next: (response: any) => {
        console.log('Product deleted successfully:', response);
        this.fetchProducts();
      },
      error: (error: any) => {
        console.error('Error deleting product:', error);
      },
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    this.cdr.detectChanges();
  }

  resetForm(): void {
    this.newProduct = {
      productName: '',
      productId: '',
      category: '',
      buyingPrice: 0,
      quantity: 0,
      unit: '',
      expiryDate: '',
      thresholdValue: 0,
    };
    this.isFormVisible = false;
  }
}
