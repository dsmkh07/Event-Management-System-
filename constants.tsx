
import { UserRole, User, Product, Order } from './types';

export const HARDCODED_USERS: User[] = [
  { id: '1', name: 'System Admin', email: 'admin@abc.com', role: UserRole.ADMIN },
  { id: '2', name: 'Deluxe Catering', email: 'vendor@abc.com', role: UserRole.VENDOR, category: 'Catering' },
  { id: '3', name: 'John Doe', email: 'user@abc.com', role: UserRole.USER },
  { id: '4', name: 'Grace Flowers', email: 'florist@abc.com', role: UserRole.VENDOR, category: 'Florist' },
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', vendorId: '2', name: 'Royal Buffet Package', price: 1500, image: 'https://picsum.photos/400/300?random=1', status: 'Available' },
  { id: 'p2', vendorId: '2', name: 'Snack Box (Premium)', price: 200, image: 'https://picsum.photos/400/300?random=2', status: 'Available' },
  { id: 'p3', vendorId: '4', name: 'Wedding Rose Bouquet', price: 80, image: 'https://picsum.photos/400/300?random=3', status: 'Available' },
];

export const VENDOR_CATEGORIES = ['Catering', 'Florist', 'Decoration', 'Lighting'];
export const MEMBERSHIP_OPTIONS = ['6 Months', '1 Year', '2 Years'];

export const ORDER_STATUSES = ['Received', 'Ready for Shipping', 'Out For Delivery', 'Delivered'];
