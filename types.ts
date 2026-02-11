
export enum UserRole {
  ADMIN = 'ADMIN',
  VENDOR = 'VENDOR',
  USER = 'USER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  category?: string; // For Vendors: Catering, Florist, Decoration, Lighting
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  image: string;
  status: 'Available' | 'Request Sent' | 'Sold Out';
}

export interface Order {
  id: string;
  userId: string;
  vendorId: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  totalPrice: number;
  status: 'Received' | 'Ready for Shipping' | 'Out For Delivery' | 'Delivered';
  orderDate: string;
}

export interface Guest {
  id: string;
  userId: string;
  name: string;
  email: string;
}

export interface Membership {
  id: string;
  vendorId: string;
  duration: '6 Months' | '1 Year' | '2 Years';
  status: 'Active' | 'Expired';
}
