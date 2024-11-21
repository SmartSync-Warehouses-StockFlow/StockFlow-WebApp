// src/app/models/user.model.ts

export interface Order {
  id: number;
  name: string;
  orderValue: number;
  quantity: number;
  date: string;
  status: string;
}

export interface Product {
  id?: number;
  productName: string;
  productPrice: number;
  quantity: number;
  date: string;
  availability: string;
  productImageUrl: string;
}

export interface Store {
  id: number;
  name: string;
  direction: string;
  phone: string;
  supervisor: string;
}

export interface User {
  id?: number; // Opcional al crear un nuevo usuario
  username: string;
  phone: string;
  password: string;
  email: string;
  orders?: Order[];
  products?: Product[];
  stores?: Store[];
}
