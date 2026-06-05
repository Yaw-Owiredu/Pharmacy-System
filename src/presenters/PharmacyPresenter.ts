/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { PharmacyModel } from '../models/PharmacyModel';
import { Medicine, Sale, Supplier, DashboardStats, StockAdjustment, User } from '../types';

export function usePharmacyPresenter() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [adjustments, setAdjustments] = useState<StockAdjustment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(() => {
    setMedicines(PharmacyModel.getMedicines());
    setSales(PharmacyModel.getSales());
    setSuppliers(PharmacyModel.getSuppliers());
    setAdjustments(PharmacyModel.getAdjustments());
    setUsers(PharmacyModel.getUsers());
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // View Actions -> Model Updates
  const handleAddMedicine = (medicine: Omit<Medicine, 'id'>) => {
    PharmacyModel.addMedicine(medicine);
    refreshData();
  };

  const handleUpdateMedicine = (medicine: Medicine) => {
    PharmacyModel.updateMedicine(medicine);
    refreshData();
  };

  const handleUpdateMedicinesCategory = (ids: string[], category: string) => {
    PharmacyModel.updateMedicinesCategory(ids, category);
    refreshData();
  };

  const handleDeleteMedicine = (id: string) => {
    PharmacyModel.deleteMedicine(id);
    refreshData();
  };

  const handleImportMedicines = (imported: any[], mode: 'overwrite' | 'add') => {
    const res = PharmacyModel.importMedicines(imported, mode);
    refreshData();
    return res;
  };

  const handleProcessSale = (sale: Omit<Sale, 'id' | 'date'>) => {
    try {
      PharmacyModel.makeSale(sale);
      refreshData();
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  const handleAddSupplier = (supplier: Omit<Supplier, 'id'>) => {
    PharmacyModel.addSupplier(supplier);
    refreshData();
  };

  const handleUpdateSupplier = (supplier: Supplier) => {
    PharmacyModel.updateSupplier(supplier);
    refreshData();
  };

  const getStats = (): DashboardStats => {
    const revenue = sales.reduce((acc, s) => acc + s.total, 0);
    const today = new Date();
    const soon = new Date();
    soon.setMonth(today.getMonth() + 3);

    const expiredSoon = medicines.filter(m => {
      const exp = new Date(m.expiryDate);
      return exp <= soon;
    }).length;

    const criticalStock = medicines.filter(m => m.quantity < 10).length;

    return {
      totalMedicines: medicines.length,
      totalSales: sales.length,
      totalRevenue: revenue,
      expiredSoon,
      criticalStock
    };
  };

  const handleAddAdjustment = (adjustment: Omit<StockAdjustment, 'id' | 'date' | 'medicineName'>) => {
    PharmacyModel.addAdjustment(adjustment);
    refreshData();
  };

  const handleAddUser = (user: Omit<User, 'id'>) => {
    PharmacyModel.addUser(user);
    refreshData();
  };

  const handleUpdateUser = (user: User) => {
    PharmacyModel.updateUser(user);
    refreshData();
  };

  const handleUpdateUsersStatus = (ids: string[], status: 'Active' | 'Inactive') => {
    PharmacyModel.updateUsersStatus(ids, status);
    refreshData();
  };

  const handleDeleteUser = (id: string) => {
    PharmacyModel.deleteUser(id);
    refreshData();
  };

  const handleSetActiveFrontDesk = (id: string) => {
    PharmacyModel.setActiveFrontDesk(id);
    refreshData();
  };

  const handleClearSystemData = () => {
    PharmacyModel.clearAllData();
    refreshData();
  };

  return {
    medicines,
    sales,
    suppliers,
    adjustments,
    users,
    loading,
    stats: getStats(),
    actions: {
      addMedicine: handleAddMedicine,
      updateMedicine: handleUpdateMedicine,
      updateMedicinesCategory: handleUpdateMedicinesCategory,
      deleteMedicine: handleDeleteMedicine,
      importMedicines: handleImportMedicines,
      processSale: handleProcessSale,
      addSupplier: handleAddSupplier,
      updateSupplier: handleUpdateSupplier,
      addAdjustment: handleAddAdjustment,
      clearSystemData: handleClearSystemData,
      addUser: handleAddUser,
      updateUser: handleUpdateUser,
      updateUsersStatus: handleUpdateUsersStatus,
      deleteUser: handleDeleteUser,
      setActiveFrontDesk: handleSetActiveFrontDesk
    }
  };
}
