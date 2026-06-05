/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Medicine {
  id: string;
  name: string;
  price: number;
  quantity: number;
  expiryDate: string;
  category: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
}

export interface SaleItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  date: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  category: string;
  phone?: string;
  email?: string;
  lastActivity?: string; // ISO date string of last interaction
  performanceScore?: number; // 0-100 score of reliability/speed
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Front Desk' | 'Admin' | 'Pharmacist';
  username: string;
  phone: string;
  status: 'Active' | 'Inactive';
  shift: 'Morning' | 'Afternoon' | 'Night';
  assignedRegister?: string;
  activeAtFrontDesk?: boolean;
}

export type AppView = 'dashboard' | 'inventory' | 'sales' | 'suppliers' | 'reports' | 'users';

export interface StockAdjustment {
  id: string;
  medicineId: string;
  medicineName: string;
  type: 'restock' | 'damage' | 'expired' | 'manual';
  quantityDelta: number; // e.g., +20 for restock, -5 for damage
  reason?: string;
  date: string;
  supplierId?: string; // Links restock back to supplier
  deliveryDays?: number; // Simulated days taken for delivery
  isLate?: boolean; // Reliability flag
}

export interface DashboardStats {
  totalMedicines: number;
  totalSales: number;
  totalRevenue: number;
  expiredSoon: number;
  criticalStock: number;
}
