export type MangoVariety = 
  | 'Chaunsa' 
  | 'Sindhri' 
  | 'Anwar Ratol' 
  | 'Langra' 
  | 'Dussehri' 
  | 'Dusehri' 
  | 'White Chaunsa' 
  | 'Black Chaunsa' 
  | 'Fajri' 
  | 'Samar Bahisht' 
  | 'Neelum'
  | 'Gulab Khas'
  | 'Sensation'
  | 'Azeem Chaunsa'
  | 'Lal Badshah'
  | 'Banganpalli'
  | 'Totapuri'
  | 'Alphonso'
  | 'Kesar'
  | 'Amrapali'
  | 'Maldah';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  reply?: string;
}

export interface Product {
  id: string;
  name: string;
  variety: MangoVariety;
  price: number;
  originalPrice?: number;
  weightOptions: number[]; // in KG
  selectedWeight: number;
  image: string;
  description: string;
  fullDescription?: string;
  sweetness: number; // 1-5
  harvestDate: string;
  farmSource: string;
  category: 'Premium' | 'Seasonal' | 'Gift' | 'Bulk';
  isBestSeller?: boolean;
  stock?: number;
  nutrition?: {
    calories: number;
    vitaminC: string;
    fiber: string;
  };
  reviews?: Review[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'admin' | 'user';
  phone?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: any;
}

export interface Order {
  id?: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'failed';
  paymentMethod: string;
  receiptUrl?: string;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  createdAt: any;
}

export interface BulkInquiry {
  id?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  variety: string;
  quantity: number;
  contactMethod?: 'Email' | 'WhatsApp';
  message: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: any;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}
