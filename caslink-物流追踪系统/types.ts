
export enum OrderStatus {
  PROCESSING = 'PROCESSING',
  READY_TO_PICK_UP = 'READY TO PICK UP',
  DELIVERED = 'DELIVERED',
  SHIPPED = 'SHIPPED'
}

export type Language = 'zh' | 'en' | 'ms';

export interface Order {
  id: string;
  customerName: string;
  productName: string;
  styleCode: string;
  date: string;
  dimensions: string;
  status: OrderStatus;
  location?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
