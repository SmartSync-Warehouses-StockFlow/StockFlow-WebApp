import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-orders',
  standalone: true, // Aquí agregas 'standalone: true'
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
export default class OrdersComponent implements OnInit {
  username: string | null = localStorage.getItem('username');
  dataSet: any[] = [];
  
  isFormVisible: boolean = false;
  newOrder: any = {
    name: '',
    id: '',
    orderValue: 0,
    quantity: 0,
    date: '',
    status: '',
  };

  categories: string[] = ['Beverages', 'Snacks', 'Cleaning', 'Personal Care', 'Others'];

  constructor(private orderService: OrderService) {}  // Aquí inyectas el servicio

  ngOnInit(): void {
    this.orderService.getUserByOrder(this.username).subscribe((data) => {
      this.dataSet = data;
    });
  }

  // Métodos para manejar las órdenes (getTotalReceived, getTotalRevenue, etc.)
  getTotalReceived(): number {
    return this.dataSet.filter(order => order.status === 'received').reduce((total, order) => total + order.orderValue, 0);
  }

  getTotalRevenue(): number {
    return this.getTotalReceived();
  }

  getTotalReturned(): number {
    return this.dataSet.filter(order => order.status === 'returned').reduce((total, order) => total + order.orderValue, 0);
  }

  getTotalCost(): number {
    return this.getTotalReturned();
  }

  getTotalOnTheWay(): number {
    return this.dataSet.filter(order => order.status === 'on the way').reduce((total, order) => total + order.orderValue, 0);
  }

  getTotalOnTheWayCost(): number {
    return this.getTotalOnTheWay();
  }

  addProduct(): void {
    if (
      this.newOrder.name?.trim() &&
      this.newOrder.orderValue > 0 &&
      this.newOrder.quantity > 0 &&
      this.newOrder.date 
    
    ) {
      const newOrderData = {
        name: this.newOrder.name,
        orderValue: this.newOrder.orderValue,
        quantity: this.newOrder.quantity,
        date: this.newOrder.date,
        status: this.newOrder.status,
      };
      this.orderService.createOrder(this.username, newOrderData).subscribe((response) => {
        console.log('Nueva orden agregada:', response);
        this.resetForm();
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
  

  resetForm(): void {
    this.newOrder = {
      name: '',
      orderValue: 0,
      quantity: 0,
      date: '',
      status: '',
    };
    this.isFormVisible = false;
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
}
