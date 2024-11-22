import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Reactive Forms
import { Router } from '@angular/router'; // Para la redirección si es necesario
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
import OrderService from 'src/app/Service/orderservice';

interface Order {
  product: string;
  orderValue: number;
  quantity: number;
  orderId: string;
  expectedDelivery: string;
  status: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
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
})
export default  class OrdersComponent implements OnInit {
  username: string | null = localStorage.getItem('username'); // Recuperar el username desde localStorage

  constructor(
    private orderService: OrderService,
    private router: Router, // Inyectar Router
    private fb: FormBuilder // Inyectar FormBuilder
  ) {
    // Crear el formulario reactivo
  }


  dataSet: Order[] = [];
  
  isFormVisible: boolean = false;
  
  newOrder: any = {
    productName: '',
    productId: '',
    category: '',
    orderValue: 0,
    quantity: 0,
    unit: '',
    buyingPrice: 0,
    deliveryDate: '',
    notifyOnDelivery: false
  };
  
  categories: string[] = ['Beverages', 'Snacks', 'Cleaning', 'Personal Care', 'Others'];

  ngOnInit(): void {
      // Llamar al servicio para obtener los datos del usuario usando el username
      this.orderService.getUserByOrder(this.username).subscribe((data) => {
          this.dataSet = data
      });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  addProduct(): void {
    if (this.newOrder.productName && this.newOrder.orderValue > 0 && this.newOrder.quantity > 0) {
      const newOrderData: Order = {
        product: this.newOrder.productName,
        orderValue: this.newOrder.orderValue,
        quantity: this.newOrder.quantity,
        orderId: this.generateOrderId(),
        expectedDelivery: this.newOrder.deliveryDate,
        status: 'Pending',
      };
      this.dataSet = [...this.dataSet, newOrderData];
      console.log('New Product Added:', newOrderData);
      this.resetForm();
    } else {
      alert('Please fill in all required fields!');
    }
  }

  resetForm(): void {
    this.newOrder = {
      productName: '',
      productId: '',
      category: '',
      orderValue: 0,
      quantity: 0,
      unit: '',
      buyingPrice: 0,
      deliveryDate: '',
      notifyOnDelivery: false
    };
    this.isFormVisible = false;
  }

  private generateOrderId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }
}
