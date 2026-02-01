
import { Order, OrderStatus } from './types';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2024-001',
    customerName: 'Global Design Inc.',
    productName: 'CLASSIC OAK',
    styleCode: 'CSL-DX-101',
    date: '2024-11-10',
    dimensions: '2100 x 900 x 45 MM',
    status: OrderStatus.PROCESSING,
    location: 'Warehouse A'
  },
  {
    id: 'ORD-2024-005',
    customerName: 'Modern Spaces Ltd.',
    productName: 'MODERN SLATE',
    styleCode: 'CSL-MD-202',
    date: '2024-11-12',
    dimensions: '2400 x 1200 x 55 MM',
    status: OrderStatus.READY_TO_PICK_UP,
    location: 'Loading Dock 4'
  },
  {
    id: 'ORD-2024-009',
    customerName: 'Secure Homes Co.',
    productName: 'FROSTED SECURITY',
    styleCode: 'CSL-GL-303',
    date: '2024-11-08',
    dimensions: '2050 x 850 x 40 MM',
    status: OrderStatus.DELIVERED,
    location: 'Customer Premise'
  },
  {
    id: 'ORD-2024-012',
    customerName: 'Aesthetic Arts',
    productName: 'WALNUT VENEEER',
    styleCode: 'CSL-WN-404',
    date: '2024-12-01',
    dimensions: '1800 x 700 x 30 MM',
    status: OrderStatus.PROCESSING,
    location: 'Factory Floor 2'
  }
];

export const THEME_COLORS = {
  bg: '#F2EBE1',
  accent: '#7C2D12',
  textMain: '#374151',
  textSecondary: '#6B7280',
  statusProcessing: '#B45309',
  statusReady: '#A16207',
  statusDelivered: '#15803D'
};
