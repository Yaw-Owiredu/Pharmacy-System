/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Medicine, Sale, Supplier, Customer, StockAdjustment, User } from '../types';

export class PharmacyModel {
  private static STORAGE_KEY = 'pharmacy_data';

  static getData() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      const daysAgoString = (days: number) => {
        const d = new Date();
        d.setDate(d.getDate() - days);
        return d.toISOString();
      };

      const mIds = ['med-1', 'med-2', 'med-3', 'med-4', 'med-5'];
      const defaultMedicines: Medicine[] = [
        { id: mIds[0], name: 'Amoxicillin 500mg', category: 'Antibiotics', price: 12.50, quantity: 45, expiryDate: '2026-11-20' },
        { id: mIds[1], name: 'Ibuprofen 400mg', category: 'Pain Relief', price: 6.99, quantity: 8, expiryDate: '2026-06-12' },
        { id: mIds[2], name: 'Vitamin C 1000mg', category: 'Vitamins', price: 9.99, quantity: 120, expiryDate: '2027-04-10' },
        { id: mIds[3], name: 'Paracetamol 500mg', category: 'Pain Relief', price: 3.50, quantity: 60, expiryDate: '2026-06-25' },
        { id: mIds[4], name: 'Tamiflu 75mg', category: 'Antivirals', price: 34.99, quantity: 4, expiryDate: '2026-12-15' }
      ];

      const defaultSuppliers: Supplier[] = [
        { id: 'sup-1', name: 'Global Pharma Wholesale', contact: 'sales@globalpharma.com | Suite 400', category: 'Wholesale', phone: '+1-555-0100', email: 'sales@globalpharma.com', lastActivity: daysAgoString(3), performanceScore: 92 },
        { id: 'sup-2', name: 'Rx Distributor Ltd', contact: '+1-555-0199 | Head Office', category: 'Primary', phone: '+1-555-0199', email: 'orders@rxdistributors.net', lastActivity: daysAgoString(1), performanceScore: 96 },
        { id: 'sup-3', name: 'Apex Local Meds', contact: 'apexmeds.contact@gmail.com | Local Depot', category: 'Local', phone: '+1-555-0144', email: 'apexmeds.contact@gmail.com', lastActivity: daysAgoString(12), performanceScore: 84 }
      ];

      const defaultSales: Sale[] = [
        {
          id: 'sale-1',
          items: [{ medicineId: mIds[0], medicineName: 'Amoxicillin 500mg', quantity: 2, price: 12.50 }],
          total: 25.00,
          date: daysAgoString(5)
        },
        {
          id: 'sale-2',
          items: [{ medicineId: mIds[1], medicineName: 'Ibuprofen 400mg', quantity: 2, price: 6.99 }],
          total: 13.98,
          date: daysAgoString(4)
        },
        {
          id: 'sale-3',
          items: [{ medicineId: mIds[2], medicineName: 'Vitamin C 1000mg', quantity: 3, price: 9.99 }],
          total: 29.97,
          date: daysAgoString(3)
        },
        {
          id: 'sale-4',
          items: [
            { medicineId: mIds[3], medicineName: 'Paracetamol 500mg', quantity: 2, price: 3.50 },
            { medicineId: mIds[1], medicineName: 'Ibuprofen 400mg', quantity: 1, price: 6.99 }
          ],
          total: 13.99,
          date: daysAgoString(2)
        },
        {
          id: 'sale-5',
          items: [{ medicineId: mIds[4], medicineName: 'Tamiflu 75mg', quantity: 1, price: 34.99 }],
          total: 34.99,
          date: daysAgoString(1)
        },
        {
          id: 'sale-6',
          items: [
            { medicineId: mIds[2], medicineName: 'Vitamin C 1000mg', quantity: 2, price: 9.99 },
            { medicineId: mIds[0], medicineName: 'Amoxicillin 500mg', quantity: 1, price: 12.50 }
          ],
          total: 32.48,
          date: daysAgoString(0)
        }
      ];

      const defaultAdjustments: StockAdjustment[] = [
        { id: 'adj-1', medicineId: mIds[0], medicineName: 'Amoxicillin 500mg', type: 'restock', quantityDelta: 50, reason: 'Initial bulk supply delivery from Global Pharma Wholesale', date: daysAgoString(10), supplierId: 'sup-1', deliveryDays: 3, isLate: false },
        { id: 'adj-2', medicineId: mIds[1], medicineName: 'Ibuprofen 400mg', type: 'manual', quantityDelta: 15, reason: 'System onboarding adjustment', date: daysAgoString(8) },
        { id: 'adj-3', medicineId: mIds[1], medicineName: 'Ibuprofen 400mg', type: 'damage', quantityDelta: -5, reason: 'Damaged during shelf transit', date: daysAgoString(5) },
        { id: 'adj-4', medicineId: mIds[3], medicineName: 'Paracetamol 500mg', type: 'expired', quantityDelta: -2, reason: 'Batch expiry disposal', date: daysAgoString(2) }
      ];

      const defaultUsers: User[] = [
        { id: 'usr-1', name: 'John Doe', email: 'johndoe@pharmacy.com', role: 'Admin', username: 'johndoe', phone: '+1 (555) 012-3456', status: 'Active', shift: 'Morning', assignedRegister: 'Register #1', activeAtFrontDesk: false },
        { id: 'usr-2', name: 'Sarah Connor', email: 'sconnor@pharmacy.com', role: 'Front Desk', username: 'sconnor', phone: '+1 (555) 012-7890', status: 'Active', shift: 'Afternoon', assignedRegister: 'Front Counter A', activeAtFrontDesk: true },
        { id: 'usr-3', name: 'James Carter', email: 'jcarter@pharmacy.com', role: 'Front Desk', username: 'jcarter', phone: '+1 (555) 012-4321', status: 'Active', shift: 'Night', assignedRegister: 'Front Counter B', activeAtFrontDesk: false }
      ];

      const initialData = {
        medicines: defaultMedicines,
        sales: defaultSales,
        suppliers: defaultSuppliers,
        adjustments: defaultAdjustments,
        customers: [],
        users: defaultUsers
      };

      this.saveData(initialData);
      return initialData;
    }
    return JSON.parse(data);
  }

  static saveData(data: any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  // Medicine Operations
  static getMedicines(): Medicine[] {
    return this.getData().medicines;
  }

  static addMedicine(medicine: Omit<Medicine, 'id'>) {
    const data = this.getData();
    const newMedicine = { ...medicine, id: crypto.randomUUID() };
    data.medicines.push(newMedicine);
    this.saveData(data);
    return newMedicine;
  }

  static updateMedicine(medicine: Medicine) {
    const data = this.getData();
    data.medicines = data.medicines.map((m: Medicine) => m.id === medicine.id ? medicine : m);
    this.saveData(data);
  }

  static updateMedicinesCategory(ids: string[], category: string) {
    const data = this.getData();
    data.medicines = data.medicines.map((m: Medicine) => 
      ids.includes(m.id) ? { ...m, category } : m
    );
    this.saveData(data);
  }

  static deleteMedicine(id: string) {
    const data = this.getData();
    data.medicines = data.medicines.filter((m: Medicine) => m.id !== id);
    this.saveData(data);
  }

  static importMedicines(medicinesToImport: any[], mode: 'overwrite' | 'add') {
    const data = this.getData();
    let updatedCount = 0;
    let addedCount = 0;

    medicinesToImport.forEach(item => {
      let foundIndex = -1;
      if (item.matchedMedId) {
        foundIndex = data.medicines.findIndex((m: any) => m.id === item.matchedMedId);
      } else if (item.id) {
        foundIndex = data.medicines.findIndex((m: any) => m.id === item.id);
      } else {
        foundIndex = data.medicines.findIndex((m: any) => m.name.toLowerCase().trim() === item.name.toLowerCase().trim());
      }

      if (foundIndex !== -1) {
        const existing = data.medicines[foundIndex];
        const newQty = mode === 'add' ? existing.quantity + item.quantity : item.quantity;
        data.medicines[foundIndex] = {
          ...existing,
          name: item.name || existing.name,
          price: typeof item.price === 'number' ? item.price : existing.price,
          quantity: typeof newQty === 'number' && newQty >= 0 ? newQty : existing.quantity,
          expiryDate: item.expiryDate || existing.expiryDate,
          category: item.category || existing.category
        };
        updatedCount++;
      } else {
        const newMed = {
          id: item.id || crypto.randomUUID(),
          name: item.name,
          price: typeof item.price === 'number' ? item.price : 0,
          quantity: typeof item.quantity === 'number' ? item.quantity : 0,
          expiryDate: item.expiryDate || new Date().toISOString().split('T')[0],
          category: item.category || 'General'
        };
        data.medicines.push(newMed);
        addedCount++;
      }
    });

    this.saveData(data);
    return { addedCount, updatedCount };
  }

  // Sales Operations
  static getSales(): Sale[] {
    return this.getData().sales;
  }

  static makeSale(saleData: Omit<Sale, 'id' | 'date'>) {
    const data = this.getData();
    
    // Validate all items first
    for (const item of saleData.items) {
      const medicine = data.medicines.find((m: Medicine) => m.id === item.medicineId);
      if (!medicine || medicine.quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${item.medicineName || 'medicine'}`);
      }
    }

    // Process each item
    for (const item of saleData.items) {
      const medicine = data.medicines.find((m: Medicine) => m.id === item.medicineId);
      if (medicine) {
        medicine.quantity -= item.quantity;
      }
    }

    const newSale = {
      ...saleData,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };
    
    data.sales.push(newSale);
    this.saveData(data);
    return newSale;
  }

  // Supplier Operations
  static getSuppliers(): Supplier[] {
    return this.getData().suppliers;
  }

  static addSupplier(supplier: Omit<Supplier, 'id'>) {
    const data = this.getData();
    const newSupplier = { ...supplier, id: crypto.randomUUID() };
    data.suppliers.push(newSupplier);
    this.saveData(data);
    return newSupplier;
  }

  static updateSupplier(supplier: Supplier) {
    const data = this.getData();
    data.suppliers = data.suppliers.map((s: Supplier) => s.id === supplier.id ? supplier : s);
    this.saveData(data);
  }

  // Adjustment Operations
  static getAdjustments(): StockAdjustment[] {
    return this.getData().adjustments || [];
  }

  static addAdjustment(adjustment: Omit<StockAdjustment, 'id' | 'date' | 'medicineName'>) {
    const data = this.getData();
    if (!data.adjustments) {
      data.adjustments = [];
    }
    const medicine = data.medicines.find((m: Medicine) => m.id === adjustment.medicineId);
    if (!medicine) {
      throw new Error('Medicine not found');
    }

    const newAdjustment: StockAdjustment = {
      ...adjustment,
      medicineName: medicine.name,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };
    
    data.adjustments.push(newAdjustment);
    
    // Update the medicine quantity
    medicine.quantity += adjustment.quantityDelta;
    if (medicine.quantity < 0) {
      medicine.quantity = 0;
    }
    
    // Capture supplier activity if this is a restock from a supplier
    if (adjustment.type === 'restock' && adjustment.supplierId) {
      data.suppliers = data.suppliers.map((s: Supplier) => {
        if (s.id === adjustment.supplierId) {
          const currentScore = s.performanceScore || 90;
          const isLate = adjustment.isLate ?? false;
          const newScore = isLate 
            ? Math.max(40, currentScore - 5) 
            : Math.min(100, currentScore + 1);
          return {
            ...s,
            lastActivity: newAdjustment.date,
            performanceScore: newScore
          };
        }
        return s;
      });
    }
    
    this.saveData(data);
    return newAdjustment;
  }

  // User Operations
  static getUsers(): User[] {
    const data = this.getData();
    return data.users || [];
  }

  static addUser(user: Omit<User, 'id'>) {
    const data = this.getData();
    if (!data.users) data.users = [];
    
    // If setting activeAtFrontDesk: true, deactivate others
    if (user.activeAtFrontDesk) {
      data.users.forEach((u: User) => {
        if (u.role === 'Front Desk') {
          u.activeAtFrontDesk = false;
        }
      });
    }

    const newUser = { ...user, id: crypto.randomUUID() };
    data.users.push(newUser);
    this.saveData(data);
    return newUser;
  }

  static updateUser(user: User) {
    const data = this.getData();
    if (!data.users) data.users = [];
    
    // If setting activeAtFrontDesk: true, deactivate others
    if (user.activeAtFrontDesk) {
      data.users.forEach((u: User) => {
        if (u.id !== user.id && u.role === 'Front Desk') {
          u.activeAtFrontDesk = false;
        }
      });
    }

    data.users = data.users.map((u: User) => u.id === user.id ? user : u);
    this.saveData(data);
  }

  static updateUsersStatus(ids: string[], status: 'Active' | 'Inactive') {
    const data = this.getData();
    if (!data.users) data.users = [];
    data.users = data.users.map((u: User) => 
      ids.includes(u.id) ? { ...u, status } : u
    );
    this.saveData(data);
  }

  static deleteUser(id: string) {
    const data = this.getData();
    if (!data.users) data.users = [];
    data.users = data.users.filter((u: User) => u.id !== id);
    this.saveData(data);
  }

  static setActiveFrontDesk(userId: string) {
    const data = this.getData();
    if (!data.users) return;
    data.users = data.users.map((u: User) => {
      if (u.role === 'Front Desk') {
        return {
          ...u,
          activeAtFrontDesk: u.id === userId
        };
      }
      return u;
    });
    this.saveData(data);
  }

  // System Wide Operations
  static clearAllData() {
    const data = this.getData();
    // Clear all stock levels of existing medicines (set them to zero)
    data.medicines = data.medicines.map((m: Medicine) => ({
      ...m,
      quantity: 0
    }));
    // Clear sales history
    data.sales = [];
    // Clear other stock adjustments history
    data.adjustments = [];
    // Reset supplier activities and performance scores
    data.suppliers = data.suppliers.map((s: Supplier) => ({
      ...s,
      lastActivity: undefined,
      performanceScore: undefined
    }));
    // Clear any customer/other data
    data.customers = [];
    
    // Reset users to default
    const defaultUsers: User[] = [
      { id: 'usr-1', name: 'John Doe', email: 'johndoe@pharmacy.com', role: 'Admin', username: 'johndoe', phone: '+1 (555) 012-3456', status: 'Active', shift: 'Morning', assignedRegister: 'Register #1', activeAtFrontDesk: false },
      { id: 'usr-2', name: 'Sarah Connor', email: 'sconnor@pharmacy.com', role: 'Front Desk', username: 'sconnor', phone: '+1 (555) 012-7890', status: 'Active', shift: 'Afternoon', assignedRegister: 'Front Counter A', activeAtFrontDesk: true },
      { id: 'usr-3', name: 'James Carter', email: 'jcarter@pharmacy.com', role: 'Front Desk', username: 'jcarter', phone: '+1 (555) 012-4321', status: 'Active', shift: 'Night', assignedRegister: 'Front Counter B', activeAtFrontDesk: false }
    ];
    data.users = defaultUsers;

    this.saveData(data);
  }
}
