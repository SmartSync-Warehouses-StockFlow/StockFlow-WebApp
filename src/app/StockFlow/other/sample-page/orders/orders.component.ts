import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí

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
  imports: [FormsModule, CommonModule], // Asegúrate de incluir ambos módulos aquí
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export default class OrdersComponent {
  dataSet: Order[] = [
    { product: 'Maggi', orderValue: 4306, quantity: 43, orderId: '7535', expectedDelivery: '11/12/22', status: 'Delayed' },
    { product: 'Bru', orderValue: 2557, quantity: 22, orderId: '5724', expectedDelivery: '21/12/22', status: 'Confirmed' },
    { product: 'Red Bull', orderValue: 4075, quantity: 36, orderId: '2775', expectedDelivery: '5/12/22', status: 'Returned' },
    { product: 'Bourn Vita', orderValue: 5052, quantity: 14, orderId: '2275', expectedDelivery: '8/12/22', status: 'Out for delivery' },
    { product: 'Horlicks', orderValue: 5370, quantity: 5, orderId: '2427', expectedDelivery: '9/1/23', status: 'Returned' },
    { product: 'Harpic', orderValue: 6065, quantity: 10, orderId: '2578', expectedDelivery: '9/1/23', status: 'Out for delivery' },
    { product: 'Ariel', orderValue: 4078, quantity: 23, orderId: '2757', expectedDelivery: '15/12/23', status: 'Delayed' },
    { product: 'Scotch Brite', orderValue: 3559, quantity: 43, orderId: '3757', expectedDelivery: '6/6/23', status: 'Confirmed' },
    { product: 'Coca cola', orderValue: 2055, quantity: 41, orderId: '2474', expectedDelivery: '11/11/22', status: 'Delayed' }
  ];
  
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

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  addProduct() {
    console.log('New Product:', this.newOrder);
    this.resetForm();
  }

  resetForm() {
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
}
