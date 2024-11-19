import { Component,ChangeDetectorRef  } from '@angular/core';

// Importaciones de NG-ZORRO
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Order {
  product: string;
  orderValue: number;
  quantity: number;
  orderId: string;
  expectedDelivery: string;
  status: string;
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
  styleUrls: ['./inventory.component.scss']
})
export default class InventoryComponent {
  dataSet: Order[] = [
    { product: 'Maggi', orderValue: 4306, quantity: 43, orderId: '7535', expectedDelivery: '11/12/22', status: 'Delayed' },
    { product: 'Bru', orderValue: 2557, quantity: 22, orderId: '5724', expectedDelivery: '21/12/22', status: 'Confirmed' },
    { product: 'Red Bull', orderValue: 4075, quantity: 36, orderId: '2775', expectedDelivery: '5/12/22', status: 'Returned' },
    { product: 'Bourn Vita', orderValue: 5052, quantity: 14, orderId: '2275', expectedDelivery: '8/12/22', status: 'Out for delivery' },
    { product: 'Horlicks', orderValue: 5370, quantity: 5, orderId: '2427', expectedDelivery: '9/1/23', status: 'Returned' },
    { product: 'Harpic', orderValue: 6065, quantity: 10, orderId: '2578', expectedDelivery: '9/1/23', status: 'Out for delivery' },
    { product: 'Ariel', orderValue: 4078, quantity: 23, orderId: '2757', expectedDelivery: '15/12/23', status: 'Delayed' },
    { product: 'Scotch Brite', orderValue: 3559, quantity: 43, orderId: '3757', expectedDelivery: '6/6/23', status: 'Confirmed' },
    { product: 'Coca Cola', orderValue: 2055, quantity: 41, orderId: '2474', expectedDelivery: '11/11/22', status: 'Delayed' }
  ];

  isFormVisible: boolean = false;

  newProduct: any = {
    productName: '',
    productId: '',
    category: '',
    buyingPrice: 0,
    quantity: 0,
    unit: '',
    expiryDate: '',
    thresholdValue: 0
  };

  categories: string[] = ['Beverages', 'Snacks', 'Cleaning', 'Personal Care', 'Others'];
  constructor(private cdr: ChangeDetectorRef) {}
 
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    this.cdr.detectChanges(); // Forzar el redibujado del modal
  }

  addProduct(): void {
    if (this.newProduct.productName && this.newProduct.productId && this.newProduct.category) {
      const newProductData: Order = {
        product: this.newProduct.productName,
        orderValue: this.newProduct.buyingPrice * this.newProduct.quantity,
        quantity: this.newProduct.quantity,
        orderId: this.generateOrderId(),
        expectedDelivery: this.newProduct.expiryDate,
        status: 'Pending'
      };
      this.dataSet = [...this.dataSet, newProductData];
      console.log('New Product Added:', newProductData);
      this.resetForm();
    } else {
      alert('Please fill in all required fields!');
    }
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
      thresholdValue: 0
    };
    this.isFormVisible = false;
  }

  private generateOrderId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }
}
