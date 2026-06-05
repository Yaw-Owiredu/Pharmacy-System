/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutDashboard, Pill, ShoppingCart, Users, BarChart3, Menu, X, Plus, AlertTriangle, TrendingUp, Package, Calendar, Search, Edit2, Check, ExternalLink, Download, ArrowUp, ArrowDown, ArrowUpDown, Barcode, Mail, RefreshCw, QrCode, Trash2, UserCheck, UserX, Shield, Printer, Clock, LogOut, Phone, Copy, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { AppView, DashboardStats, Medicine, Sale, Supplier, StockAdjustment, User } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ComposedChart, Area, Legend } from 'recharts';
import { VoiceSearchButton } from '../components/VoiceSearchButton';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView, filter?: string | null) => void;
  criticalStockCount?: number;
  onClearAllData?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  sessionUser?: User | null;
  onLogout?: () => void;
}

const Sidebar = ({ 
  currentView, 
  setView, 
  criticalStockCount = 0, 
  onClearAllData, 
  isOpenMobile = false, 
  onCloseMobile,
  sessionUser,
  onLogout
}: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory Management', icon: Pill },
    { id: 'sales', label: 'Sales & Invoicing', icon: ShoppingCart },
    { id: 'suppliers', label: 'Suppliers', icon: Users },
    { id: 'reports', label: 'Financial Reports', icon: BarChart3 },
    { id: 'users', label: 'Staff & Front Desk', icon: UserCheck },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-30 lg:hidden cursor-pointer"
        />
      )}

      <aside className={`w-[240px] bg-[#0f172a] text-white h-screen fixed left-0 top-0 overflow-y-auto flex flex-col py-5 z-40 transition-transform duration-300 lg:translate-x-0 ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="px-6 mb-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-sky-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m2 9 3-3 3 3"/><path d="M13 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z"/><path d="M2 22h16"/><path d="M8 22V12a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v10"/></svg>
            </div>
            <h1 className="text-sm font-bold tracking-widest text-sky-500 uppercase">Pharma.MVP</h1>
          </div>
          {onCloseMobile && (
            <button 
              type="button" 
              onClick={onCloseMobile}
              className="lg:hidden p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id as AppView);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-6 py-3 text-[0.85rem] transition-all duration-200 border-l-4 cursor-pointer ${
                  active 
                    ? 'bg-white/5 border-sky-500 text-white' 
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.id === 'inventory' && criticalStockCount > 0 && (
                  <span className="bg-red-500 text-white text-[0.62rem] font-black px-1.5 py-0.5 rounded-full shadow-sm animate-pulse">
                    {criticalStockCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {sessionUser && (
          <div className="mx-4 mb-4 p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex items-center justify-between gap-2.5 text-left">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-sky-600 border border-sky-400/20 text-white flex items-center justify-center font-bold text-xs shrink-0 select-none">
                {sessionUser.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-100 truncate leading-tight select-none">{sessionUser.name}</p>
                <p className="text-[9px] text-sky-450 font-mono font-bold truncate uppercase select-none tracking-wider mt-0.5">{sessionUser.role}</p>
              </div>
            </div>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-rose-450 transition-colors cursor-pointer shrink-0"
                title="Log out from registry session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {onClearAllData && (
          <div className="mt-auto px-6 pt-4 border-t border-slate-800 text-[0.7rem] text-slate-500 font-mono">
            <button
              onClick={onClearAllData}
              className="w-full bg-rose-950/40 hover:bg-rose-950 border border-rose-800/60 hover:border-rose-600 text-rose-300 font-bold py-2 px-3 rounded text-[0.62rem] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all outline-none cursor-pointer"
              title="Reset Stock Levels and Clear Logs"
            >
              <Trash2 className="w-3.5 h-3.5 shrink-0" /> Zero & Reset Data
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

const Header = ({ 
  title, 
  currency, 
  setCurrency,
  syncStatus,
  triggerSync,
  lastSyncedString,
  isSyncing,
  onOpenMobileSidebar,
  isDarkMode = false,
  toggleDarkMode
}: { 
  title: string; 
  currency: string; 
  setCurrency: (c: '$' | '€' | '£' | '₵') => void;
  syncStatus: 'synced' | 'outdated';
  triggerSync: () => void;
  lastSyncedString: string;
  isSyncing: boolean;
  onOpenMobileSidebar?: () => void;
  isDarkMode?: boolean;
  toggleDarkMode: () => void;
}) => (
  <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center border-b border-slate-200 pb-4 mb-6 text-left">
    <div className="flex items-center gap-3">
      {onOpenMobileSidebar && (
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
        <p className="text-slate-500 text-[0.85rem] flex items-center gap-1.5 flex-wrap">
          <span>Pharmacy Operations Center</span>
        </p>
      </div>
    </div>
    
    <div className="flex flex-wrap items-center gap-3">
      {/* Sync Status Banner */}
      <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-xs select-none transition-all ${
        syncStatus === 'synced' 
          ? 'bg-emerald-50 text-emerald-850 border-emerald-200/50' 
          : 'bg-amber-50 text-amber-900 border-amber-200/80 animate-[pulse_2.5s_infinite]'
      }`}>
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${syncStatus === 'synced' ? 'bg-emerald-500 animate-[pulse_1.5s_infinite]' : 'bg-amber-500 animate-ping'}`} />
          <span className="text-[0.68rem] tracking-tight">
            {syncStatus === 'synced' ? 'Inventory Synced' : 'Inventory Outdated!'}
          </span>
        </div>
        <span className="text-slate-300">|</span>
        <button
          onClick={triggerSync}
          disabled={isSyncing}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded font-bold uppercase text-[0.62rem] transition-all hover:bg-white border ${
            syncStatus === 'synced'
              ? 'text-slate-500 border-transparent hover:border-slate-200 hover:text-slate-700'
              : 'text-amber-700 bg-white/40 border-amber-300 hover:bg-white hover:text-amber-800 shadow-3xs'
          }`}
          title={`Last check: ${lastSyncedString}`}
        >
          <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Aligning...' : syncStatus === 'synced' ? 'Sync' : 'Force Align'}</span>
        </button>
      </div>

      {/* Currency Segment Selector */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-2xs select-none">
        <span className="text-[0.62rem] font-bold text-slate-400 uppercase tracking-widest px-2 font-sans">Currency:</span>
        {(['$', '€', '£', '₵'] as const).map(sym => (
          <button
            key={sym}
            type="button"
            onClick={() => setCurrency(sym)}
            className={`w-7 h-7 flex items-center justify-center text-xs font-black rounded transition-all ${
              currency === sym 
                ? 'bg-sky-600 text-white shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {sym}
          </button>
        ))}
      </div>

      {/* Dark Mode Switcher Toggle */}
      <button
        onClick={toggleDarkMode}
        type="button"
        className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all cursor-pointer select-none shrink-0 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700 text-amber-450 hover:bg-slate-700 hover:border-slate-600' 
            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700'
        }`}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode (Low Light)"}
      >
        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </div>
  </header>
);

const AnimatedCounter = ({ value, duration = 800, prefix = '', suffix = '' }: { value: number, duration?: number, prefix?: string, suffix?: string }) => {
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setDisplayVal(end);
      return;
    }

    const startTime = performance.now();

    const updateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const current = start + easeProgress * (end - start);
      
      setDisplayVal(current);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        setDisplayVal(end);
      }
    };

    requestAnimationFrame(updateNumber);
  }, [value, duration]);

  const isWhole = Number.isInteger(value);
  const formatted = isWhole ? Math.round(displayVal).toLocaleString() : displayVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return <>{prefix}{formatted}{suffix}</>;
};

const Dashboard = ({ 
  stats, 
  sales, 
  setView, 
  currency,
  medicines = [],
  adjustments = [],
  isDarkMode = false
}: { 
  stats: DashboardStats, 
  sales: Sale[], 
  setView: (view: AppView, filter?: string | null) => void, 
  currency: string,
  medicines?: Medicine[],
  adjustments?: StockAdjustment[],
  isDarkMode?: boolean
}) => {
  const last7DaysData = useMemo(() => {
    const data = [];
    const today = new Date();
    
    // Sort/Generate the last 7 days from 6 days ago to today
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateLabel = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
      
      // Filter sales that fell in this local day
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);
      
      const daySales = sales.filter(s => {
        const saleDate = new Date(s.date);
        return saleDate >= dayStart && saleDate <= dayEnd;
      });
      
      const totalRevenue = daySales.reduce((sum, s) => sum + s.total, 0);
      data.push({
        date: dateLabel,
        revenue: parseFloat(totalRevenue.toFixed(2))
      });
    }
    return data;
  }, [sales]);

  const currentWeekDailySales = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday...
    const monday = new Date(today);
    const distanceToMonday = currentDay === 0 ? 6 : currentDay - 1;
    monday.setDate(today.getDate() - distanceToMonday);
    monday.setHours(0, 0, 0, 0);

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);

      const daySales = sales.filter(s => {
        const saleDate = new Date(s.date);
        return saleDate >= dayStart && saleDate <= dayEnd;
      });

      const revenue = daySales.reduce((sum, s) => sum + s.total, 0);
      const transactions = daySales.length;

      data.push({
        dayName: weekDays[i],
        dateStr: d.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        revenue: parseFloat(revenue.toFixed(2)),
        transactions,
        isToday: d.toDateString() === today.toDateString()
      });
    }
    return data;
  }, [sales]);

  const weeklyInventoryValueTrend = useMemo(() => {
    const meds = medicines || [];
    const adjs = adjustments || [];
    const sls = sales || [];

    // Snapshot of current quantities and prices
    const currentInventory = meds.reduce((acc, m) => {
      acc[m.id] = { quantity: m.quantity, price: m.price };
      return acc;
    }, {} as Record<string, { quantity: number; price: number }>);

    // Track deltas for each day in 14-day window (0 = today, 1 = yesterday, ... 13 = 13 days ago)
    const dailyDeltas = Array.from({ length: 14 }, () => ({} as Record<string, number>));

    const parseDaysAgo = (dateStr: string) => {
      const d = new Date(dateStr);
      const today = new Date();
      const tEnd = new Date(today);
      tEnd.setHours(23, 59, 59, 999);
      const diffTime = tEnd.getTime() - d.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    // Account for adjustments in delta map
    adjs.forEach(adj => {
      const idx = parseDaysAgo(adj.date);
      if (idx >= 0 && idx < 14) {
        if (!dailyDeltas[idx][adj.medicineId]) {
          dailyDeltas[idx][adj.medicineId] = 0;
        }
        dailyDeltas[idx][adj.medicineId] += adj.quantityDelta;
      }
    });

    // Account for sales in delta map
    sls.forEach(sale => {
      const idx = parseDaysAgo(sale.date);
      if (idx >= 0 && idx < 14) {
        sale.items.forEach(item => {
          if (!dailyDeltas[idx][item.medicineId]) {
            dailyDeltas[idx][item.medicineId] = 0;
          }
          // Sale decreases stock, so delta when going forward was negative
          dailyDeltas[idx][item.medicineId] -= item.quantity;
        });
      }
    });

    // Backtrack daily valuations
    const valuesByDay = new Array(14).fill(0);
    const tempQuantities = meds.reduce((acc, m) => {
      acc[m.id] = m.quantity;
      return acc;
    }, {} as Record<string, number>);

    for (let d = 0; d < 14; d++) {
      let totalValue = 0;
      meds.forEach(m => {
        const qty = tempQuantities[m.id] ?? 0;
        totalValue += Math.max(0, qty) * m.price;
      });
      valuesByDay[d] = totalValue;

      // Reverse deltas
      const deltas = dailyDeltas[d];
      Object.keys(deltas).forEach(mId => {
        if (tempQuantities[mId] !== undefined) {
          tempQuantities[mId] -= deltas[mId];
        }
      });
    }

    // Build comparative dataset for chart
    const chartData = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const weekdayLabel = d.toLocaleDateString([], { weekday: 'short' });

      chartData.push({
        day: weekdayLabel,
        thisWeek: parseFloat(valuesByDay[i].toFixed(2)),
        prevWeek: parseFloat(valuesByDay[i + 7].toFixed(2))
      });
    }

    const currentVal = valuesByDay[0];
    const prevVal = valuesByDay[7];
    const diff = currentVal - prevVal;
    const pct = prevVal > 0 ? (diff / prevVal) * 100 : 0;

    return {
      chartData,
      currentVal,
      prevVal,
      pct,
      isUp: diff >= 0
    };
  }, [medicines, sales, adjustments]);

  const monthlyData = useMemo(() => {
    const months = [
      { name: 'Jan', monthIndex: 0, baseRevenue: 3400, baseQty: 190, baseFulfillment: 94 },
      { name: 'Feb', monthIndex: 1, baseRevenue: 3900, baseQty: 215, baseFulfillment: 95 },
      { name: 'Mar', monthIndex: 2, baseRevenue: 4650, baseQty: 260, baseFulfillment: 97 },
      { name: 'Apr', monthIndex: 3, baseRevenue: 4100, baseQty: 230, baseFulfillment: 96 },
      { name: 'May', monthIndex: 4, baseRevenue: 5250, baseQty: 295, baseFulfillment: 98 },
      { name: 'Jun', monthIndex: 5, baseRevenue: 1500, baseQty: 110, baseFulfillment: 99 },
    ];

    return months.map(m => {
      const monthSales = sales.filter(s => {
        const d = new Date(s.date);
        return d.getFullYear() === 2026 && d.getMonth() === m.monthIndex;
      });

      const actualRevenue = monthSales.reduce((sum, s) => sum + s.total, 0);
      const actualQty = monthSales.reduce((sum, s) => sum + s.items.reduce((iSum, item) => iSum + item.quantity, 0), 0);

      const totalRevenue = m.baseRevenue + actualRevenue;
      const totalVolume = m.baseQty + actualQty;

      const salesCount = monthSales.length;
      const totalSalesCount = 30 + (m.monthIndex * 5) + salesCount;
      const avgOrderValue = parseFloat((totalRevenue / totalSalesCount).toFixed(2));

      const monthAdjustments = (adjustments || []).filter(adj => {
        const d = new Date(adj.date);
        return d.getFullYear() === 2026 && d.getMonth() === m.monthIndex;
      });
      const lateRestocks = monthAdjustments.filter(adj => adj.isLate).length;
      const totalRestocks = monthAdjustments.filter(adj => adj.type === 'restock').length;
      const fulfillmentRate = totalRestocks > 0
        ? Math.max(85, Math.min(100, Math.round(((totalRestocks - lateRestocks) / totalRestocks) * 100)))
        : m.baseFulfillment;

      return {
        month: m.name,
        Revenue: parseFloat(totalRevenue.toFixed(2)),
        Volume: totalVolume,
        Fulfillment: fulfillmentRate,
        AverageOrder: avgOrderValue
      };
    });
  }, [sales, adjustments]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm"
        >
          <p className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider">Daily Revenue</p>
          <h3 className="text-xl font-bold mt-1 text-slate-800">
            <AnimatedCounter value={stats.totalRevenue} prefix={currency} />
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm"
        >
          <p className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider">Sales Today</p>
          <h3 className="text-xl font-bold mt-1 text-slate-800">
            <AnimatedCounter value={stats.totalSales} />
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setView('inventory', 'expiring')}
          className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:border-red-300 transition-colors relative group"
        >
          <p className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider">Expired Soon</p>
          <h3 className="text-xl font-bold mt-1 text-red-500">
            <AnimatedCounter value={stats.expiredSoon} suffix=" Items" />
          </h3>
          <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-3 h-3 text-red-400" />
          </div>
          <p className="text-[0.6rem] text-slate-400 mt-1">Expiring within 30 days. Click to view.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => setView('inventory', 'low-stock')}
          className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:border-amber-300 transition-colors relative group"
        >
          <p className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider">Stock Alerts</p>
          <h3 className="text-xl font-bold mt-1 text-amber-600">
            <AnimatedCounter value={stats.criticalStock} suffix=" Low Stock" />
          </h3>
          <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
          </div>
          <p className="text-[0.6rem] text-slate-400 mt-1">Quantity below 10. Click to view.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <div>
              <span className="font-semibold text-[0.9rem] text-slate-800">Recent Sales Activity</span>
              <p className="text-[0.65rem] text-slate-400">Total daily revenue trend over the last 7 days</p>
            </div>
            <span className="text-sky-600 text-xs font-semibold cursor-pointer hover:underline" onClick={() => setView('reports')}>Manage Logs</span>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-center min-h-[240px]">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last7DaysData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                  <XAxis 
                    dataKey="date" 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 10, fontWeight: 500 }} 
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 10, fontWeight: 500 }}
                    tickFormatter={(value) => `${currency}${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '6px', border: 'none', color: '#fff' }}
                    labelStyle={{ fontWeight: 'bold', fontSize: '10px', color: '#38bdf8' }}
                    itemStyle={{ fontSize: '11px', color: '#fff', padding: '0px' }}
                    formatter={(value) => [`${currency}${value}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0284c7" 
                    strokeWidth={2.5} 
                    dot={{ r: 3.5, stroke: '#0284c7', strokeWidth: 2, fill: '#fff' }} 
                    activeDot={{ r: 5, stroke: '#0284c7', strokeWidth: 1 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          {/* Inventory Valuation Sparkline Card */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col">
            <div className="flex justify-between items-start mb-2 pb-2 border-b border-slate-100">
              <div>
                <span className="font-semibold text-[0.85rem] text-slate-800">Inventory Valuation</span>
                <p className="text-[0.62rem] text-slate-400">Weekly trend vs. previous week</p>
              </div>
              <div className="text-right">
                <span className="text-[0.85rem] font-bold text-slate-900 block">
                  {currency}{weeklyInventoryValueTrend.currentVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`inline-flex items-center gap-0.5 text-[0.65rem] font-extrabold ${
                  weeklyInventoryValueTrend.isUp ? 'text-emerald-650' : 'text-rose-650'
                }`}>
                  {weeklyInventoryValueTrend.isUp ? '▲' : '▼'} {Math.abs(weeklyInventoryValueTrend.pct).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Recharts Sparkline Line chart */}
            <div className="h-[95px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyInventoryValueTrend.chartData} margin={{ top: 5, right: 5, left: -25, bottom: -5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f8fafc'} />
                  <XAxis 
                    dataKey="day" 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 8, fontWeight: 550 }} 
                  />
                  <YAxis 
                    hide={true}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '6px', border: 'none', color: '#fff' }}
                    labelStyle={{ fontWeight: 'bold', fontSize: '9px', color: '#38bdf8' }}
                    itemStyle={{ fontSize: '10px', color: '#fff', padding: '0px' }}
                    formatter={(value) => [`${currency}${parseFloat(String(value)).toFixed(2)}`]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="thisWeek" 
                    name="This Week"
                    stroke="#0284c7" 
                    strokeWidth={2} 
                    dot={{ r: 2, fill: '#0284c7' }} 
                    activeDot={{ r: 4 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="prevWeek" 
                    name="Prev Week"
                    stroke="#94a3b8" 
                    strokeWidth={1.5} 
                    strokeDasharray="3 3"
                    dot={false}
                    activeDot={{ r: 3 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-between items-center text-[0.62rem] text-slate-400 mt-2 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0284c7] inline-block"></span>
                This Week ({currency}{weeklyInventoryValueTrend.currentVal.toFixed(0)})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#94a3b8] inline-block"></span>
                Prev Week ({currency}{weeklyInventoryValueTrend.prevVal.toFixed(0)})
              </span>
            </div>
          </div>

          {/* Operational Pulse Card */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <span className="font-semibold text-[0.9rem]">Operational Pulse</span>
            </div>
            <div className="p-4 space-y-4">
               <div className="space-y-1">
                 <div className="flex justify-between text-[0.7rem] font-bold text-slate-500 uppercase tracking-tighter">
                   <span>Invoicing Accuracy</span>
                   <span>98%</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-sky-500 w-[98%]"></div>
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="flex justify-between text-[0.7rem] font-bold text-slate-500 uppercase tracking-tighter">
                   <span>Inventory Turnover</span>
                   <span>72%</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[72%]"></div>
                 </div>
               </div>
               <p className="text-[0.75rem] text-slate-400 font-medium leading-tight pt-2">System heart rate is normal. No critical software alerts detected.</p>
            </div>
            <div className="mt-auto p-4 bg-slate-50/50 border-t border-slate-200 text-center">
              <span className="text-sky-600 text-xs font-bold cursor-pointer hover:underline">Download Health Audit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Week Daily Sales Trends */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="bg-white dark:bg-[#0f172a] p-5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col text-left font-sans"
      >
        <div className="mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h4 className="font-bold text-[0.85rem] text-slate-800 dark:text-slate-100 flex items-center gap-1.5 leading-none uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-sky-600 animate-pulse" />
              Current Week Daily Sales Trends
            </h4>
            <p className="text-[0.65rem] text-slate-400 mt-1 uppercase tracking-wider">Daily sales performance & volume for the current calendar week</p>
          </div>
          <div className="flex gap-1.5 flex-wrap items-center">
            <span className="text-[0.62rem] font-bold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded uppercase tracking-tighter shrink-0 select-none">
              Daily Trends (Mon - Sun)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={currentWeekDailySales} margin={{ top: 10, right: 5, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeekRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                <XAxis 
                  dataKey="dayName" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: 10, fontWeight: 550 }} 
                />
                <YAxis 
                  yAxisId="left"
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: isDarkMode ? '#cbd5e1' : '#475569', fontSize: 10, fontWeight: 555 }}
                  tickFormatter={(value) => `${currency}${value}`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: isDarkMode ? '#c084fc' : '#8b5cf6', fontSize: 10, fontWeight: 500 }}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff' }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '10px', color: '#38bdf8' }}
                  itemStyle={{ fontSize: '11px', color: '#fff', padding: '1px' }}
                  formatter={(value, name) => {
                    if (name === 'Revenue') return [`${currency}${parseFloat(String(value)).toFixed(2)}`, 'Revenue'];
                    return [`${value} transactions`, 'Transaction Volume'];
                  }}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue" 
                  fill="url(#colorWeekRev)" 
                  stroke="#0ea5e9" 
                  strokeWidth={2.5} 
                />
                <Bar 
                  yAxisId="right"
                  dataKey="transactions" 
                  name="Transactions" 
                  fill="#c084fc" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={15} 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col justify-between border-t lg:border-t-0 p-4 lg:border-l border-slate-100 dark:border-slate-800 font-mono text-[0.68rem] space-y-3">
            <div className="space-y-2 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Week Statistics</span>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 dark:border-slate-800/60">
                <span className="text-slate-500 font-medium">Total Rev:</span>
                <span className="font-bold text-sky-650 dark:text-sky-400">{currency}{currentWeekDailySales.reduce((acc, d) => acc + d.revenue, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 dark:border-slate-800/60">
                <span className="text-slate-500 font-medium">Avg Daily Rev:</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">{currency}{(currentWeekDailySales.reduce((acc, d) => acc + d.revenue, 0) / 7).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-500 font-medium">Total Sales tx:</span>
                <span className="font-bold text-violet-600 dark:text-violet-400">{currentWeekDailySales.reduce((acc, d) => acc + d.transactions, 0)} items</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-3 space-y-1 border border-slate-100 dark:border-slate-800 text-left">
              <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider">Dynamic Legend</span>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 mt-1">
                <span className="w-2.5 h-2.5 bg-[#0ea5e9] rounded-2xs inline-block"></span>
                <span>Area gradient: Sales Volume</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="w-2.5 h-2.5 bg-[#c084fc] rounded-2xs inline-block"></span>
                <span>Bar lines: Checkout count</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Monthly Performance Analytics Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Monthly Sales & Revenue Trends Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col text-left font-sans"
        >
          <div className="mb-4 pb-3 border-b border-slate-100 flex justify-between items-center bg-transparent">
            <div>
              <h4 className="font-bold text-[0.85rem] text-slate-800 flex items-center gap-1.5 leading-none uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-sky-600" />
                Monthly Sales & Volume Trends
              </h4>
              <p className="text-[0.65rem] text-slate-400 mt-1 uppercase tracking-wider">Revenue and Medicine Dispensed Counts</p>
            </div>
            <span className="text-[0.62rem] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded uppercase tracking-tighter shrink-0 select-none">
              Recharts Analytics
            </span>
          </div>

          <div className="h-[250px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyData} margin={{ top: 10, right: -5, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 10, fontWeight: 550 }} 
                />
                <YAxis 
                  yAxisId="left"
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: isDarkMode ? '#cbd5e1' : '#475569', fontSize: 10, fontWeight: 555 }}
                  tickFormatter={(value) => `${currency}${value.toLocaleString()}`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 10, fontWeight: 500 }}
                  tickFormatter={(value) => `${value} units`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff' }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '10px', color: '#38bdf8' }}
                  itemStyle={{ fontSize: '11px', color: '#fff', padding: '1px' }}
                  formatter={(value, name) => {
                    if (name === 'Revenue') return [`${currency}${parseFloat(String(value)).toFixed(2)}`, 'Revenue'];
                    return [`${value} units`, 'Volume Sold'];
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '10px', fontWeight: 650, paddingTop: '10px' }} 
                  verticalAlign="bottom" 
                  height={36} 
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="Revenue" 
                  name="Revenue"
                  fill="url(#colorRevenue)" 
                  stroke="#0284c7" 
                  strokeWidth={2.5} 
                  activeDot={{ r: 6 }}
                />
                <Bar 
                  yAxisId="right"
                  dataKey="Volume" 
                  name="Dispensed Volume"
                  fill="#cbd5e1" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={30}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Strategic Operational Performance Metrics Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col text-left font-sans"
        >
          <div className="mb-4 pb-3 border-b border-slate-100 flex justify-between items-center bg-transparent">
            <div>
              <h4 className="font-bold text-[0.85rem] text-slate-800 flex items-center gap-1.5 leading-none uppercase tracking-wider">
                <BarChart3 className="w-4 h-4 text-emerald-650" />
                Operational Performance Metrics
              </h4>
              <p className="text-[0.65rem] text-slate-400 mt-1 uppercase tracking-wider">Average Transaction Size and Fulfillment Efficiency</p>
            </div>
            <span className="text-[0.62rem] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-tighter shrink-0 select-none">
              Performance KPIs
            </span>
          </div>

          <div className="h-[250px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyData} margin={{ top: 10, right: -5, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOrder" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 10, fontWeight: 555 }} 
                />
                <YAxis 
                  yAxisId="left"
                  tickLine={false} 
                  axisLine={false} 
                  domain={[80, 100]}
                  tick={{ fill: isDarkMode ? '#34d399' : '#10b981', fontSize: 10, fontWeight: 555 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: isDarkMode ? '#c084fc' : '#8b5cf6', fontSize: 10, fontWeight: 555 }}
                  tickFormatter={(value) => `${currency}${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff' }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '10px', color: '#a78bfa' }}
                  itemStyle={{ fontSize: '11px', color: '#fff', padding: '1px' }}
                  formatter={(value, name) => {
                    if (name === 'Fulfillment') return [`${value}%`, 'Supply Fulfillment Rate'];
                    return [`${currency}${parseFloat(String(value)).toFixed(2)}`, 'Avg Transaction Value'];
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '10px', fontWeight: 650, paddingTop: '10px' }} 
                  verticalAlign="bottom" 
                  height={36} 
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="AverageOrder" 
                  name="Avg Transaction Size"
                  fill="url(#colorOrder)" 
                  stroke="#8b5cf6" 
                  strokeWidth={2.5} 
                  activeDot={{ r: 6 }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="Fulfillment" 
                  name="Supply Fulfillment %"
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const BarcodeSVG = ({ val }: { val: string }) => {
  const pattern = useMemo(() => {
    const id = val || "123456789";
    let bin = "101100101"; // start
    for (let i = 0; i < id.length; i++) {
      const charVal = id.charCodeAt(i);
      const patternChoice = [
        "110010", "101100", "110100", "100110", "101001",
        "1100110", "1101101", "1001101", "1011011"
      ];
      bin += patternChoice[charVal % patternChoice.length];
    }
    bin += "101100101"; // stop
    return bin;
  }, [val]);

  return (
    <div className="flex flex-col items-center p-4 bg-white border border-slate-100 rounded-lg shadow-sm select-none">
      <div className="flex items-stretch h-14 bg-black" style={{ width: `${pattern.length * 2.5}px` }}>
        {Array.from(pattern).map((bit, idx) => (
          <div
            key={idx}
            className={`h-full ${bit === '1' ? 'bg-black' : 'bg-white'}`}
            style={{ width: '2.5px' }}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-slate-700 mt-2.5">
        *{val.toUpperCase()}*
      </span>
    </div>
  );
};

const printBarcodeInIframe = (medicineId: string, medicineName: string) => {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.width = '0px';
  iframe.style.height = '0px';
  iframe.style.border = 'none';
  iframe.style.left = '-9999px';
  
  document.body.appendChild(iframe);
  
  const iframeDoc = iframe.contentWindow || iframe.contentDocument;
  const doc = (iframeDoc as any).document || iframeDoc;

  const id = medicineId || "med-unknown";
  let bin = "101100101"; // start
  for (let i = 0; i < id.length; i++) {
    const charVal = id.charCodeAt(i);
    const patternChoice = [
      "110010", "101100", "110100", "100110", "101001",
      "1100110", "1101101", "1001101", "1011011"
    ];
    bin += patternChoice[charVal % patternChoice.length];
  }
  bin += "101100101"; // stop

  const html = `
    <html>
      <head>
        <title>Barcode Label - ${id}</title>
        <style>
          @page { size: auto; margin: 0; }
          body { 
            font-family: system-ui, -apple-system, sans-serif; 
            margin: 0; 
            padding: 15px; 
            text-align: center; 
            background: #fff; 
            color: #000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .title { font-size: 14px; font-weight: bold; margin-bottom: 2px; text-transform: uppercase; }
          .subtitle { font-size: 10px; color: #555; margin-bottom: 12px; }
          .barcode { display: flex; align-items: stretch; height: 50px; margin-bottom: 6px; }
          .bar { float: left; height: 100%; }
          .text { font-family: monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; }
        </style>
      </head>
      <body>
        <div class="title">${medicineName}</div>
        <div class="subtitle">Rx Pharmacy Product Label</div>
        <div class="barcode">
          ${Array.from(bin).map(bit => `
            <div class="bar" style="width: 2.5px; background: ${bit === '1' ? '#000' : '#fff'}; height: 100%;"></div>
          `).join('')}
        </div>
        <div class="text">*${id.toUpperCase()}*</div>
      </body>
    </html>
  `;
  
  doc.write(html);
  doc.close();
  
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 500);
};

const InventoryView = ({ 
  medicines, 
  adjustments = [], 
  actions, 
  filter, 
  setFilter,
  currency,
  suppliers = [],
  onSimulateScanToSale
}: { 
  medicines: Medicine[], 
  adjustments?: StockAdjustment[], 
  actions: any, 
  filter: string | null, 
  setFilter: (f: string | null) => void,
  currency: string,
  suppliers?: Supplier[],
  onSimulateScanToSale?: (medicineId: string) => void
}) => {
  const [activeTab, setActiveTab] = useState<'items' | 'adjustments'>('items');
  const [isBarcodeSimulatorOpen, setIsBarcodeSimulatorOpen] = useState(false);
  const [simulatorSelectedMedId, setSimulatorSelectedMedId] = useState('');

  // CSV Bulk Import states
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importMode, setImportMode] = useState<'overwrite' | 'add'>('overwrite');
  const [importedRows, setImportedRows] = useState<any[]>([]);
  const [importStats, setImportStats] = useState({ total: 0, newCount: 0, updateCount: 0, invalidCount: 0 });
  const [importFileName, setImportFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: 0, quantity: 0, expiryDate: '', category: 'General' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'price' | 'quantity' | 'expiryDate' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [medicineToArchive, setMedicineToArchive] = useState<Medicine | null>(null);

  // Selection states for bulk archive
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkArchiveModal, setShowBulkArchiveModal] = useState(false);
  const [barcodeMedicine, setBarcodeMedicine] = useState<Medicine | null>(null);
  const [showBulkCategoryModal, setShowBulkCategoryModal] = useState(false);
  const [bulkCategory, setBulkCategory] = useState('General');
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  // Camera QR/Barcode Scanner States for Inventory View
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraStream(stream);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 150);
    } catch (err: any) {
      console.error("Camera access failed in inventory scanner", err);
      setCameraError("Camera access denied or unavailable. Please ensure camera permissions are active.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const openQrScanner = () => {
    setIsQrScannerOpen(true);
    startCamera();
  };

  const closeQrScanner = () => {
    stopCamera();
    setIsQrScannerOpen(false);
  };

  const [barcodeDetectorSupported, setBarcodeDetectorSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      setBarcodeDetectorSupported(true);
    }
  }, []);

  useEffect(() => {
    let active = true;
    let frameId: number;

    const detectLoop = async () => {
      if (!active || !isQrScannerOpen || !videoRef.current) return;
      const BarcodeDetectorClass = (window as any).BarcodeDetector;
      if (BarcodeDetectorClass && videoRef.current.readyState >= 2) {
        try {
          const detector = new BarcodeDetectorClass({
            formats: ['qr_code', 'ean_13', 'code_128', 'code_39', 'upc_a', 'upc_e']
          });
          const barcodes = await detector.detect(videoRef.current);
          if (barcodes.length > 0 && active) {
            const rawCode = barcodes[0].rawValue;
            const findMatch = medicines.find(m => 
              m.id.toLowerCase() === rawCode.trim().toLowerCase() ||
              m.name.toLowerCase().includes(rawCode.trim().toLowerCase())
            );
            if (findMatch) {
              setSearchQuery(findMatch.id);
              setBarcodeMedicine(findMatch);
              setExportSuccess(`Barcode scanned: Detected "${findMatch.name}"!`);
              setTimeout(() => setExportSuccess(null), 3000);
              closeQrScanner();
              return;
            }
          }
        } catch (error) {
          console.warn("Standard barcode detection frame failed: ", error);
        }
      }
      if (active) {
        frameId = requestAnimationFrame(detectLoop);
      }
    };

    if (isQrScannerOpen) {
      frameId = requestAnimationFrame(detectLoop);
    }

    return () => {
      active = false;
      cancelAnimationFrame(frameId);
    };
  }, [isQrScannerOpen, medicines]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Reorder flow states
  const [reorderMedicine, setReorderMedicine] = useState<Medicine | null>(null);
  const [reorderQty, setReorderQty] = useState<number>(100);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('');
  const [reorderTemplateSubject, setReorderTemplateSubject] = useState<string>('');
  const [reorderTemplateBody, setReorderTemplateBody] = useState<string>('');
  const [showReorderModal, setShowReorderModal] = useState<boolean>(false);
  const [reorderSuccessMsg, setReorderSuccessMsg] = useState<string>('');

  // Automatically update the email inquiry template when medicine, supplier or qty changes
  useEffect(() => {
    if (!reorderMedicine) return;
    
    const activeSupplier = suppliers.find(s => s.id === selectedSupplierId) || suppliers.find(s => s.category?.toLowerCase() === 'primary') || suppliers[0] || {
      name: 'Rx Distributor Ltd',
      contact: 'sales@rxdistributor.com',
      category: 'Primary'
    };

    const subject = `Urgent Reorder Stock Inquiry: ${reorderMedicine.name} (Code: ${reorderMedicine.id})`;
    const body = `Dear ${activeSupplier.name} Sales Team,

We would like to request an official wholesale reservation and price quotation for a reorder of the following critical inventory item for our pharmacy depot:

- Product Name: ${reorderMedicine.name}
- Reference ID/SKU: ${reorderMedicine.id}
- Target Reorder Quantity: ${reorderQty} Units
- Reference Retail Value: ${currency}${reorderMedicine.price.toFixed(2)} / Unit
- Current On-Hand Stock: ${reorderMedicine.quantity} Units (Triggers Stock Reorder Warning)

Please verify current wholesale block-rates, applicable lot discounts, and the earliest estimated shipment delivery dates. 

A prompt reply ensures seamless delivery. Thank you!

Best regards,
Pharmacy Procurement & Inventory Office
Local Care Pharmacy Depot`;

    setReorderTemplateSubject(subject);
    setReorderTemplateBody(body);
  }, [reorderMedicine, reorderQty, selectedSupplierId, suppliers, currency]);

  const initiateReorder = (m: Medicine) => {
    const primarySup = suppliers.find(s => s.category?.toLowerCase() === 'primary') || suppliers[0] || { id: 'default' };
    setSelectedSupplierId(primarySup.id);
    setReorderQty(100);
    setReorderMedicine(m);
    setShowReorderModal(true);
    setReorderSuccessMsg('');
  };

  const handleSendReorderInquiry = () => {
    if (!reorderMedicine) return;
    const activeSupplier = suppliers.find(s => s.id === selectedSupplierId) || suppliers.find(s => s.category?.toLowerCase() === 'primary') || suppliers[0] || {
      name: 'Rx Distributor Ltd'
    };
    
    const fullText = `Subject: ${reorderTemplateSubject}\n\n${reorderTemplateBody}`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    
    // Simulate successful inquiry transmission & copy confirmation
    setReorderSuccessMsg(`Reorder inquiry successfully populated! Requisition details have been copied to your clipboard.`);
    
    // Automatically dismiss modal after successful simulation feedback
    setTimeout(() => {
      setShowReorderModal(false);
      setReorderSuccessMsg('');
      setReorderMedicine(null);
    }, 4500);
  };

  // States for stock adjustments
  const [showAdjustmentForm, setShowAdjustmentForm] = useState(false);
  const [adjustmentQuery, setAdjustmentQuery] = useState('');
  const [adjustmentTypeFilter, setAdjustmentTypeFilter] = useState<string>('all');
  const [adjustmentFormData, setAdjustmentFormData] = useState({
    medicineId: '',
    type: 'restock' as 'restock' | 'damage' | 'expired' | 'manual',
    manualDirection: 'add' as 'add' | 'remove',
    quantity: 0,
    reason: ''
  });
  const [adjustmentErrors, setAdjustmentErrors] = useState<Record<string, string>>({});



  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Required';
    if (formData.price <= 0) newErrors.price = '> 0';
    if (formData.quantity < 0) newErrors.quantity = '≥ 0';
    if (!formData.expiryDate) newErrors.expiryDate = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      actions.addMedicine(formData);
      setShowForm(false);
      setFormData({ name: '', price: 0, quantity: 0, expiryDate: '', category: 'General' });
      setErrors({});
    }
  };

  const toggleSort = (field: 'name' | 'price' | 'quantity' | 'expiryDate') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredMedicines = useMemo(() => {
    let result = medicines;
    if (filter === 'expiring') {
      const soon = new Date();
      soon.setDate(soon.getDate() + 30);
      result = result.filter(m => new Date(m.expiryDate) <= soon);
    } else if (filter === 'expired') {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      result = result.filter(m => new Date(m.expiryDate) < today);
    } else if (filter === 'expiring-soon') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const soon = new Date();
      soon.setDate(soon.getDate() + 30);
      result = result.filter(m => {
        const exp = new Date(m.expiryDate);
        return exp >= today && exp <= soon;
      });
    } else if (filter === 'low-stock') {
      result = result.filter(m => m.quantity < 10);
    } else if (filter && filter.startsWith('category:')) {
      const cat = filter.split(':')[1];
      result = result.filter(m => m.category === cat);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.id.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    }

    if (sortField) {
      result = [...result].sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortDirection === 'asc' 
            ? valA.localeCompare(valB) 
            : valB.localeCompare(valA);
        } else {
          const numA = (valA as number) || 0;
          const numB = (valB as number) || 0;
          return sortDirection === 'asc' ? numA - numB : numB - numA;
        }
      });
    }

    return result;
  }, [medicines, filter, searchQuery, sortField, sortDirection]);

  // Bulk Selection Helpers
  const isAllSelected = filteredMedicines.length > 0 && filteredMedicines.every(m => selectedIds.includes(m.id));
  const someSelected = filteredMedicines.some(m => selectedIds.includes(m.id)) && !isAllSelected;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(prev => prev.filter(id => !filteredMedicines.some(m => m.id === id)));
    } else {
      const visibleIds = filteredMedicines.map(m => m.id);
      setSelectedIds(prev => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const matchExisting = (idVal?: string, nameVal?: string) => {
    if (idVal) {
      const found = medicines.find(m => m.id === idVal);
      if (found) return found;
    }
    if (nameVal) {
      const trimmedUpper = nameVal.trim().toUpperCase();
      const found = medicines.find(m => m.name.trim().toUpperCase() === trimmedUpper);
      if (found) return found;
    }
    return null;
  };

  const parseCSV = (text: string): string[][] => {
    const lines: string[][] = [];
    let row: string[] = [];
    let inQuotes = false;
    let currentValue = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentValue += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(currentValue);
        currentValue = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        row.push(currentValue);
        lines.push(row);
        row = [];
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    if (currentValue || row.length > 0) {
      row.push(currentValue);
      lines.push(row);
    }
    return lines.filter(l => l.some(cell => cell.trim() !== ''));
  };

  const handleFileParse = (file: File) => {
    if (!file) return;
    setImportFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;
      const rawLines = parseCSV(text);
      if (rawLines.length <= 1) {
        setImportedRows([]);
        setImportStats({ total: 0, newCount: 0, updateCount: 0, invalidCount: 0 });
        return;
      }

      const rawHeaders = rawLines[0];
      const headers = rawHeaders.map(h => h.trim().toLowerCase());
      
      const findIndex = (aliases: string[]) => {
        return headers.findIndex(h => aliases.includes(h));
      };

      const idIndex = findIndex(['id', 'sku', 'code', 'reference id/sku', 'medicine id', 'item id']);
      const nameIndex = findIndex(['medicine name', 'name', 'product name', 'medicine_name', 'product_name', 'item name']);
      const categoryIndex = findIndex(['category', 'category name', 'type']);
      const quantityIndex = findIndex(['quantity in stock', 'quantity', 'qty', 'in stock', 'stock', 'quantity_in_stock']);
      const priceIndex = findIndex(['unit price', 'price', 'unit_price', 'cost', 'rate']);
      const expiryIndex = findIndex(['expiry date', 'expiry_date', 'expiry', 'expirydate', 'expiry_date_yyyy_mm_dd']);

      const parsed: any[] = [];
      let newCount = 0;
      let updateCount = 0;
      let invalidCount = 0;

      for (let i = 1; i < rawLines.length; i++) {
        const row = rawLines[i];
        if (row.length === 0 || row.every(cell => cell.trim() === '')) continue;

        const getCell = (idx: number) => {
          if (idx < 0 || idx >= row.length) return '';
          return row[idx].trim();
        };

        const parsedId = idIndex !== -1 ? getCell(idIndex) : '';
        const parsedName = nameIndex !== -1 ? getCell(nameIndex) : '';
        const parsedCategory = categoryIndex !== -1 ? getCell(categoryIndex) : 'General';
        const parsedQtyStr = quantityIndex !== -1 ? getCell(quantityIndex) : '0';
        const parsedPriceStr = priceIndex !== -1 ? getCell(priceIndex) : '0.00';
        const parsedExpiry = expiryIndex !== -1 ? getCell(expiryIndex) : '';

        const cleanedPriceStr = parsedPriceStr.replace(/[^0-9.]/g, '');
        const cleanedQtyStr = parsedQtyStr.replace(/[^0-9\-]/g, '');

        const price = parseFloat(cleanedPriceStr);
        const qty = parseInt(cleanedQtyStr, 10);

        let error = '';
        if (!parsedName) {
          error = 'Required: Name';
        } else if (isNaN(price) || price < 0) {
          error = 'Invalid Price';
        } else if (isNaN(qty) || qty < 0) {
          error = 'Invalid Quantity';
        }

        let isNew = true;
        let matchedMed: Medicine | null = null;
        let originalQty = 0;

        if (!error) {
          matchedMed = matchExisting(parsedId, parsedName);
          if (matchedMed) {
            isNew = false;
            originalQty = matchedMed.quantity;
            updateCount++;
          } else {
            newCount++;
          }
        } else {
          invalidCount++;
        }

        let expiryDate = parsedExpiry;
        if (!expiryDate && !error) {
          const d = new Date();
          d.setFullYear(d.getFullYear() + 2);
          expiryDate = d.toISOString().split('T')[0];
        } else if (expiryDate) {
          const parsedD = new Date(expiryDate);
          if (!isNaN(parsedD.getTime())) {
            expiryDate = parsedD.toISOString().split('T')[0];
          }
        }

        parsed.push({
          id: parsedId && parsedId.toLowerCase() !== 'ok' && parsedId.toLowerCase() !== 'expired' && parsedId.toLowerCase() !== 'expiring soon' && parsedId.toLowerCase() !== 'low stock' ? parsedId : '',
          name: parsedName,
          category: parsedCategory || 'General',
          price: isNaN(price) ? 0 : price,
          quantity: isNaN(qty) ? 0 : qty,
          originalQty,
          expiryDate,
          isNew,
          error,
          matchedMedId: matchedMed?.id || null
        });
      }

      setImportedRows(parsed);
      setImportStats({
        total: parsed.length,
        newCount,
        updateCount,
        invalidCount
      });
    };
    reader.readAsText(file);
  };

  const downloadImportTemplate = () => {
    const headers = ['ID', 'Medicine Name', 'Category', 'Quantity in Stock', 'Unit Price', 'Expiry Date'];
    const sampleRows = [
      ['', 'Paracetamol 500mg', 'Analgesics', '150', '2.50', '2028-12-31'],
      ['', 'Amoxicillin 250mg', 'Antibiotics', '80', '14.99', '2027-06-30'],
      ['', 'Ibuprofen 400mg', 'Analgesics', '120', '3.75', '2027-11-15']
    ];
    if (medicines.length > 0) {
      const first = medicines[0];
      sampleRows.push([first.id, first.name, first.category, String(first.quantity), first.price.toFixed(2), first.expiryDate]);
    }

    const csvContent = [
      headers.join(','),
      ...sampleRows.map(r => r.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pharmacy_import_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportCSV = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const soon = new Date();
    soon.setDate(soon.getDate() + 30);

    const headers = [
      'ID', 
      'Medicine Name', 
      'Category', 
      'Quantity in Stock', 
      'Unit Price', 
      'Total Stock Value', 
      'Expiry Date', 
      'Audit Status'
    ];

    const rows = filteredMedicines.map(m => {
      const expDate = new Date(m.expiryDate);
      let status = 'OK';
      if (expDate < today) {
        status = 'EXPIRED';
      } else if (expDate <= soon) {
        status = 'EXPIRING SOON';
      } else if (m.quantity < 10) {
        status = 'LOW STOCK';
      }

      return [
        m.id,
        m.name,
        m.category,
        m.quantity,
        m.price.toFixed(2),
        (m.quantity * m.price).toFixed(2),
        m.expiryDate,
        status
      ];
    });

    const csvContent = [
      headers.join(','), 
      ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pharmacy_inventory_audit_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportSuccess(`Successfully exported ${filteredMedicines.length} inventory records for external auditing!`);
    setTimeout(() => {
      setExportSuccess(null);
    }, 4500);
  };

  const handleBulkCategoryUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) return;
    actions.updateMedicinesCategory(selectedIds, bulkCategory);
    setShowBulkCategoryModal(false);
    setSelectedIds([]);
  };

  // Stock Adjustment Submission Handler
  const handleAdjustmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!adjustmentFormData.medicineId) newErrors.medicineId = 'Required';
    if (adjustmentFormData.quantity <= 0) newErrors.quantity = 'Must be > 0';
    if (!adjustmentFormData.reason.trim()) newErrors.reason = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setAdjustmentErrors(newErrors);
      return;
    }

    let delta = adjustmentFormData.quantity;
    if (adjustmentFormData.type === 'damage' || adjustmentFormData.type === 'expired') {
      delta = -Math.abs(adjustmentFormData.quantity);
    } else if (adjustmentFormData.type === 'manual') {
      if (adjustmentFormData.manualDirection === 'remove') {
        delta = -Math.abs(adjustmentFormData.quantity);
      } else {
        delta = Math.abs(adjustmentFormData.quantity);
      }
    }

    actions.addAdjustment({
      medicineId: adjustmentFormData.medicineId,
      type: adjustmentFormData.type,
      quantityDelta: delta,
      reason: adjustmentFormData.reason
    });

    setAdjustmentFormData({
      medicineId: '',
      type: 'restock',
      manualDirection: 'add',
      quantity: 0,
      reason: ''
    });
    setAdjustmentErrors({});
    setShowAdjustmentForm(false);
  };

  const filteredAdjustments = useMemo(() => {
    let result = adjustments || [];
    
    if (adjustmentTypeFilter !== 'all') {
      result = result.filter(a => a.type === adjustmentTypeFilter);
    }
    
    if (adjustmentQuery.trim()) {
      const q = adjustmentQuery.toLowerCase().trim();
      result = result.filter(a => 
        a.medicineName.toLowerCase().includes(q) || 
        (a.reason && a.reason.toLowerCase().includes(q))
      );
    }
    
    return [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [adjustments, adjustmentQuery, adjustmentTypeFilter]);

  const categories = ['Pain Relief', 'Antibiotics', 'Vitamins', 'Supplements', 'Antivirals', 'General'];

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {exportSuccess && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-xs font-medium flex items-center justify-between shadow-xs transition-all overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <span className="p-0.5 rounded-full bg-emerald-500 text-white font-extrabold flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </span>
              <span>{exportSuccess}</span>
            </div>
            <button 
              onClick={() => setExportSuccess(null)}
              className="text-emerald-500 hover:text-emerald-700 font-extrabold select-none cursor-pointer ml-2 p-1"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Switcher Bar */}
      <div className="flex bg-slate-100 p-1 rounded-xl shadow-xs border border-slate-200 max-w-md">
        <button
          onClick={() => setActiveTab('items')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1.5 ${
            activeTab === 'items'
              ? 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Package className="w-3.5 h-3.5" /> Medicines Stock
        </button>
        <button
          onClick={() => setActiveTab('adjustments')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1.5 ${
            activeTab === 'adjustments'
              ? 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" /> Stock Adjustments
        </button>
      </div>

      {activeTab === 'items' ? (
        <>
          {/* Medicines Controls Bar with Camera and Quick-Action Filter Badges */}
          <div className="space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                <div className="relative flex items-center flex-1 lg:w-72 max-w-sm">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search medicines, IDs, or categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-18 py-2 bg-white hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-sky-500 rounded-lg text-xs font-semibold outline-none transition-all shadow-sm"
                  />
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                        title="Clear Search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <VoiceSearchButton 
                      onTranscript={(text) => {
                        const cleaned = text.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
                        setSearchQuery(cleaned);
                      }}
                      tooltipAlign="left"
                    />
                  </div>
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <select 
                    className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 outline-none focus:ring-1 ring-sky-500 hover:bg-slate-50 shadow-sm cursor-pointer"
                    value={filter?.startsWith('category:') ? filter.split(':')[1] : ''}
                    onChange={(e) => setFilter(e.target.value ? `category:${e.target.value}` : null)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>

                  <button
                    type="button"
                    onClick={openQrScanner}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white border border-transparent rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer select-none"
                    title="Open live camera lens overlay to scan QR or Barcode"
                  >
                    <QrCode className="w-3.5 h-3.5 animate-pulse text-emerald-100" /> Camera Scan
                  </button>

                  {filter && (
                    <button 
                      type="button"
                      onClick={() => setFilter(null)}
                      className="px-3 py-2 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      Clear Filter <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {selectedIds.length > 0 ? (
                    <>
                      <button
                        onClick={() => {
                          setBulkCategory('General');
                          setShowBulkCategoryModal(true);
                        }}
                        className="bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-100 px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-bold uppercase transition-all shadow-xs cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-amber-600 animate-bounce" /> Bulk Category ({selectedIds.length})
                      </button>
                      <button
                        onClick={() => setShowBulkArchiveModal(true)}
                        className="bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-bold uppercase transition-all shadow-xs cursor-pointer"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Archive ({selectedIds.length})
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={downloadImportTemplate}
                        className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer select-none m-0"
                        title="Download sample CSV template for inventory imports"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-400" /> Template CSV
                      </button>
                      <button
                        onClick={() => {
                          setImportedRows([]);
                          setImportFileName('');
                          setImportStats({ total: 0, newCount: 0, updateCount: 0, invalidCount: 0 });
                          setIsImportModalOpen(true);
                        }}
                        className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer select-none m-0"
                        title="Bulk import/update inventory levels from CSV"
                      >
                        <Plus className="w-3.5 h-3.5 text-emerald-600" /> Bulk Import
                      </button>
                      <button
                        onClick={handleExportCSV}
                        className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer select-none m-0"
                        title="Export currently filtered list to a CSV file"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" /> Export CSV
                      </button>
                      <button
                        onClick={() => {
                          if (medicines && medicines.length > 0) {
                            setSimulatorSelectedMedId(medicines[0].id);
                          }
                          setIsBarcodeSimulatorOpen(true);
                        }}
                        className="px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-100 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer select-none m-0"
                        title="Simulate scanning a barcode to find item or add to active sale"
                      >
                        <Barcode className="w-3.5 h-3.5 text-sky-600" /> Simulate Scan
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setShowForm(!showForm)}
                  className="bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-[0.85rem] font-semibold hover:bg-sky-700 transition-colors w-full lg:w-auto justify-center shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Stock Entry
                </button>
              </div>
            </div>

            {/* Quick-action Filter Badges specifically for Expired and Expiring Soon categories */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
              <span className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400 mr-1.5 select-none text-left">Quick Filters:</span>
              <button
                type="button"
                onClick={() => setFilter(filter === 'expired' ? null : 'expired')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                  filter === 'expired'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/40'
                }`}
                title="Filter by expired medicines only"
              >
                <AlertTriangle className="w-3 h-3 text-rose-500" /> Expired Only ({
                  medicines.filter(m => {
                    const today = new Date();
                    today.setHours(23, 59, 59, 999);
                    return new Date(m.expiryDate) < today;
                  }).length
                })
              </button>
              <button
                type="button"
                onClick={() => setFilter(filter === 'expiring-soon' ? null : 'expiring-soon')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                  filter === 'expiring-soon'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/40'
                }`}
                title="Filter by products expiring in less than 30 days"
              >
                <Clock className="w-3 h-3 text-amber-600" /> Expiring Soon ({
                  medicines.filter(m => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const soon = new Date();
                    soon.setDate(soon.getDate() + 30);
                    const exp = new Date(m.expiryDate);
                    return exp >= today && exp <= soon;
                  }).length
                })
              </button>
              <button
                type="button"
                onClick={() => setFilter(filter === 'low-stock' ? null : 'low-stock')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                  filter === 'low-stock'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-250/50'
                }`}
                title="Filter by products with less than 10 units"
              >
                <TrendingUp className="w-3 h-3" /> Low Stock ({
                  medicines.filter(m => m.quantity < 10).length
                })
              </button>
              {filter && (
                <button
                  type="button"
                  onClick={() => setFilter(null)}
                  className="px-2 py-1 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer select-none"
                >
                  Clear Active Filters
                </button>
              )}
            </div>
          </div>

          {/* Camera Viewfinder Modal for Inventory Stock-check / Print integration */}
          <AnimatePresence>
            {isQrScannerOpen && (
              <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-sm w-full overflow-hidden flex flex-col no-print"
                >
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <QrCode className="w-4 h-4 text-emerald-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Inventory Camera Code Lens</h4>
                    </div>
                    <button
                      type="button"
                      onClick={closeQrScanner}
                      className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-4 flex-1">
                    <p className="text-xs text-slate-500 leading-relaxed text-left">
                      Activate the green camera focus reticle to point at standard medicine boxes, barcodes, or QR-coded capsules.
                    </p>

                    {/* Camera viewport frame and guide lines */}
                    <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-inner flex items-center justify-center select-none">
                      {cameraError ? (
                        <div className="p-4 text-center text-rose-500 text-xs font-medium max-w-xs leading-normal">
                          <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-rose-500" />
                          {cameraError}
                        </div>
                      ) : (
                        <>
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {/* Visual guide crosshairs */}
                          <div className="absolute inset-0 border border-dashed border-emerald-450/40 m-6 rounded-md pointer-events-none flex items-center justify-center">
                            <span className="absolute w-3 h-3 border-t-2 border-l-2 border-emerald-500 top-0 left-0" />
                            <span className="absolute w-3 h-3 border-t-2 border-r-2 border-emerald-500 top-0 right-0" />
                            <span className="absolute w-3 h-3 border-b-2 border-l-2 border-emerald-500 bottom-0 left-0" />
                            <span className="absolute w-3 h-3 border-b-2 border-r-2 border-emerald-500 bottom-0 right-0" />
                            <div className="w-full h-0.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-[bounce_1.5s_infinite] pointer-events-none" />
                          </div>
                          {!cameraStream && (
                            <div className="absolute inset-0 bg-slate-905 flex items-center justify-center text-slate-400 text-xs font-semibold">
                              Spinning up camera lens...
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Live Detection API Info banner */}
                    <div className="flex items-center justify-between text-[10px] px-2.5 py-1.5 bg-slate-50 border border-slate-150 rounded-lg">
                      <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                        <div className={`w-1.5 h-1.5 rounded-full ${cameraStream ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                        <span>Status: {cameraStream ? 'Lens Stream Active' : 'Off'}</span>
                      </div>
                      <div className="text-emerald-700 font-mono font-bold tracking-tight">
                        {barcodeDetectorSupported ? '🖥️ DETECTOR ACTIVE' : '📱 LENS EMULATOR'}
                      </div>
                    </div>

                    {/* Simulation Picker Menu for touchscreens or workspace preview compatibility */}
                    <div className="space-y-1.5 text-left pt-2">
                      <label className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest block">
                        Focus simulation target
                      </label>
                      <div className="flex gap-2">
                        <select
                          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-1 ring-sky-550 focus:outline-none hover:bg-slate-100 cursor-pointer text-slate-705"
                          defaultValue=""
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val) {
                              const matchMed = medicines.find(m => m.id === val);
                              if (matchMed) {
                                setSearchQuery(matchMed.id);
                                closeQrScanner();
                              }
                            }
                          }}
                        >
                          <option value="" disabled>--- Align item to lens ---</option>
                          {medicines.map(m => (
                            <option key={`qr-inv-selector-med-${m.id}`} value={m.id}>
                              {m.name} [qty: {m.quantity} / code: {m.id}]
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            if (medicines.length > 0) {
                              const rand = medicines[Math.floor(Math.random() * medicines.length)];
                              setSearchQuery(rand.id);
                              // Auto highlight and load existing barcode printer utility integration!
                              setBarcodeMedicine(rand);
                              closeQrScanner();
                            }
                          }}
                          className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100/70 text-emerald-650 hover:text-emerald-700 rounded-lg text-[10px] uppercase font-extrabold tracking-wide transition-colors shrink-0 cursor-pointer"
                        >
                          Quick Scan & Print
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 px-4 py-3 flex justify-end gap-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={closeQrScanner}
                      className="px-3 py-1.5 border border-slate-250/70 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-500 uppercase cursor-pointer"
                    >
                      Close Viewfinder
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showForm && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm overflow-hidden"
              >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4">
                  <div className="space-y-1">
                    <label className="text-[0.6rem] font-bold text-slate-400 uppercase ml-1">Name</label>
                    <input 
                      id="inventory-name-input"
                      type="text" placeholder="Medicine Name" 
                      className={`w-full px-3 py-2 bg-slate-50 border ${errors.name ? 'border-red-400' : 'border-slate-200'} rounded-md text-[0.85rem] focus:ring-1 ring-sky-500`}
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    {errors.name && <p className="text-[0.6rem] text-red-500 font-bold ml-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[0.6rem] font-bold text-slate-400 uppercase ml-1">Unit Price ({currency})</label>
                    <input 
                      type="number" placeholder="Price" step="0.01"
                      className={`w-full px-3 py-2 bg-slate-50 border ${errors.price ? 'border-red-400' : 'border-slate-200'} rounded-md text-[0.85rem] focus:ring-1 ring-sky-500`}
                      value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    />
                    {errors.price && <p className="text-[0.6rem] text-red-500 font-bold ml-1">{errors.price}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[0.6rem] font-bold text-slate-400 uppercase ml-1">Quantity</label>
                    <input 
                      type="number" placeholder="Qty" 
                      className={`w-full px-3 py-2 bg-slate-50 border ${errors.quantity ? 'border-red-400' : 'border-slate-200'} rounded-md text-[0.85rem] focus:ring-1 ring-sky-500`}
                      value={formData.quantity || ''} onChange={e => setFormData({...formData, quantity: Number(e.target.value)})}
                    />
                    {errors.quantity && <p className="text-[0.6rem] text-red-500 font-bold ml-1">{errors.quantity}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[0.6rem] font-bold text-slate-400 uppercase ml-1">Expiry Date</label>
                    <input 
                      type="date" 
                      className={`w-full px-3 py-2 bg-slate-50 border ${errors.expiryDate ? 'border-red-400' : 'border-slate-200'} rounded-md text-[0.85rem] focus:ring-1 ring-sky-500`}
                      value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                    />
                    {errors.expiryDate && <p className="text-[0.6rem] text-red-500 font-bold ml-1">{errors.expiryDate}</p>}
                  </div>

                  <div className="space-y-1 lg:col-span-2">
                    <label className="text-[0.6rem] font-bold text-slate-400 uppercase ml-1">Category</label>
                    <select 
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-[0.85rem] focus:ring-1 ring-sky-500"
                      value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option>General</option>
                      <option>Pain Relief</option>
                      <option>Antibiotics</option>
                      <option>Vitamins</option>
                      <option>Supplements</option>
                      <option>Antivirals</option>
                    </select>
                  </div>

                  <div className="lg:col-span-2 flex items-end">
                    <button type="submit" className="w-full h-10 bg-slate-900 text-white font-bold rounded-md text-[0.85rem] hover:bg-slate-800 transition-colors">Confirm Add</button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Medicines Table */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-[0.85rem]">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[0.7rem] tracking-widest border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input 
                      type="checkbox" 
                      checked={isAllSelected}
                      ref={el => {
                        if (el) el.indeterminate = someSelected;
                      }}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                  </th>
                  <th 
                    className="px-4 py-3 cursor-pointer select-none hover:bg-slate-100 transition-colors group"
                    onClick={() => toggleSort('name')}
                  >
                    <div className="flex items-center gap-1.5">
                      Medicine Name
                      {sortField === 'name' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-sky-600" /> : <ArrowDown className="w-3.5 h-3.5 text-sky-600" />
                      ) : (
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 transition-colors" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3">Category</th>
                  <th 
                    className="px-4 py-3 cursor-pointer select-none hover:bg-slate-100 transition-colors group"
                    onClick={() => toggleSort('quantity')}
                  >
                    <div className="flex items-center gap-1.5">
                      In Stock
                      {sortField === 'quantity' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-sky-600" /> : <ArrowDown className="w-3.5 h-3.5 text-sky-600" />
                      ) : (
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 transition-colors" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 cursor-pointer select-none hover:bg-slate-100 transition-colors group"
                    onClick={() => toggleSort('price')}
                  >
                    <div className="flex items-center gap-1.5">
                      Unit Price
                      {sortField === 'price' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-sky-600" /> : <ArrowDown className="w-3.5 h-3.5 text-sky-600" />
                      ) : (
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 transition-colors" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 cursor-pointer select-none hover:bg-slate-100 transition-colors group"
                    onClick={() => toggleSort('expiryDate')}
                  >
                    <div className="flex items-center gap-1.5">
                      Expiry Date
                      {sortField === 'expiryDate' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-sky-600" /> : <ArrowDown className="w-3.5 h-3.5 text-sky-600" />
                      ) : (
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 transition-colors" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMedicines.map(m => {
                  const isSelected = selectedIds.includes(m.id);
                  return (
                    <motion.tr 
                      key={m.id} 
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ x: 3, backgroundColor: 'rgba(241, 245, 249, 0.45)' }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      className={`transition-colors ${isSelected ? 'bg-sky-50/20' : m.quantity < 10 ? 'bg-red-50/40 text-slate-900 font-medium' : 'hover:bg-slate-50/50'}`}
                    >
                      <td className="px-4 py-2.5">
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => toggleSelect(m.id)}
                          className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-2.5 font-medium">{m.name}</td>
                      <td className="px-4 py-2.5">
                        <span className="text-[0.7rem] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">{m.category}</span>
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[0.7rem] font-bold uppercase ${m.quantity < 10 ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-emerald-50 text-emerald-700'}`}>
                          {m.quantity} Units
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[0.8rem]">{currency}{m.price.toFixed(2)}</td>
                      <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {(() => {
                            const exp = new Date(m.expiryDate);
                            const today = new Date();
                            const thirtyDaysFromNow = new Date();
                            thirtyDaysFromNow.setDate(today.getDate() + 30);
                            const isCritical = exp <= thirtyDaysFromNow;
                            if (isCritical) {
                              return (
                                <span className="inline-flex items-center gap-1 text-red-600 font-bold" title="Expiring within 30 days!">
                                  <AlertTriangle className="w-3.5 h-3.5 animate-pulse text-red-500 shrink-0" />
                                  <span className="underline decoration-red-400 decoration-dotted">{m.expiryDate}</span>
                                </span>
                              );
                            }
                            return m.expiryDate;
                          })()}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <button
                            onClick={() => setBarcodeMedicine(m)}
                            className="p-1 px-1.5 rounded text-slate-450 hover:text-sky-600 hover:bg-sky-50 border border-transparent hover:border-sky-100 transition-all select-none cursor-pointer flex items-center justify-center gap-1 shrink-0 text-[0.68rem] font-bold uppercase"
                            title="Generate and print barcode label"
                          >
                            <Barcode className="w-3.5 h-3.5" /> Barcode
                          </button>
                          {m.quantity < 10 && (
                            <button 
                              onClick={() => initiateReorder(m)} 
                              className="px-2 py-1 bg-amber-500 hover:bg-amber-600 focus:outline-none text-white rounded font-bold text-[0.62rem] uppercase tracking-wide transition-all shadow-3xs flex items-center gap-1 shrink-0 cursor-pointer"
                              title="Reorder this item from supplier"
                            >
                              <Mail className="w-3 h-3 text-white" /> reorder
                            </button>
                          )}
                          <button onClick={() => setMedicineToArchive(m)} className="text-red-500 hover:text-red-700 font-bold text-[0.7rem] uppercase shrink-0 cursor-pointer p-0.5">Archive</button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
                {filteredMedicines.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-slate-400 italic font-medium">No results found for current filter</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {/* Stock Adjustments Tab Content */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              <div className="relative flex items-center flex-1 lg:w-72 max-w-sm">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search adjustment history..."
                  value={adjustmentQuery}
                  onChange={(e) => setAdjustmentQuery(e.target.value)}
                  className="w-full pl-9 pr-18 py-2 bg-white hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-sky-500 rounded-lg text-xs font-semibold outline-none transition-all shadow-sm"
                />
                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {adjustmentQuery && (
                    <button 
                      onClick={() => setAdjustmentQuery('')}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                      title="Clear Search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <VoiceSearchButton 
                    onTranscript={(text) => {
                      const cleaned = text.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
                      setAdjustmentQuery(cleaned);
                    }}
                    tooltipAlign="left"
                  />
                </div>
              </div>
              <div>
                <select 
                  className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 outline-none focus:ring-1 ring-sky-500 hover:bg-slate-50 shadow-sm"
                  value={adjustmentTypeFilter}
                  onChange={(e) => setAdjustmentTypeFilter(e.target.value)}
                >
                  <option value="all">All Adjustments</option>
                  <option value="restock">Restocks (+)</option>
                  <option value="damage">Damages (-)</option>
                  <option value="expired">Expired batch disposals (-)</option>
                  <option value="manual">Manual Adjustments</option>
                </select>
              </div>
            </div>
            <button 
              onClick={() => setShowAdjustmentForm(!showAdjustmentForm)}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-[0.85rem] font-semibold hover:bg-slate-800 transition-colors w-full lg:w-auto justify-center shadow-sm"
            >
              <TrendingUp className="w-4 h-4" /> Record Adjustment
            </button>
          </div>

          <AnimatePresence>
            {showAdjustmentForm && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm overflow-hidden"
              >
                <form onSubmit={handleAdjustmentSubmit} className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-2">Log Stock Adjustment Level</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[0.6rem] font-bold text-slate-400 uppercase ml-1">Select Medicine</label>
                      <select
                        className={`w-full px-3 py-2 bg-slate-50 border ${adjustmentErrors.medicineId ? 'border-red-400' : 'border-slate-200'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none`}
                        value={adjustmentFormData.medicineId}
                        onChange={e => setAdjustmentFormData({...adjustmentFormData, medicineId: e.target.value})}
                      >
                        <option value="">-- Choose Medicine --</option>
                        {medicines.map(m => (
                          <option key={m.id} value={m.id}>{m.name} (In stock: {m.quantity})</option>
                        ))}
                      </select>
                      {adjustmentErrors.medicineId && <p className="text-[0.6rem] text-red-500 font-bold ml-1">{adjustmentErrors.medicineId}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[0.6rem] font-bold text-slate-400 uppercase ml-1">Type of Adjustment</label>
                      <select
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none"
                        value={adjustmentFormData.type}
                        onChange={e => setAdjustmentFormData({...adjustmentFormData, type: e.target.value as any})}
                      >
                        <option value="restock">Restock (+)</option>
                        <option value="damage">Damage (-)</option>
                        <option value="expired">Expired batch disposal (-)</option>
                        <option value="manual">Manual Corrections</option>
                      </select>
                    </div>

                    {adjustmentFormData.type === 'manual' && (
                      <div className="space-y-1">
                        <label className="text-[0.6rem] font-bold text-slate-400 uppercase ml-1">Direction</label>
                        <select
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none"
                          value={adjustmentFormData.manualDirection}
                          onChange={e => setAdjustmentFormData({...adjustmentFormData, manualDirection: e.target.value as any})}
                        >
                          <option value="add">Increase (+)</option>
                          <option value="remove">Decrease (-)</option>
                        </select>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[0.6rem] font-bold text-slate-400 uppercase ml-1">Quantity (Units)</label>
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        className={`w-full px-3 py-2 bg-slate-50 border ${adjustmentErrors.quantity ? 'border-red-400' : 'border-slate-200'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none`}
                        value={adjustmentFormData.quantity || ''}
                        onChange={e => setAdjustmentFormData({...adjustmentFormData, quantity: Math.abs(parseInt(e.target.value) || 0)})}
                      />
                      {adjustmentErrors.quantity && <p className="text-[0.6rem] text-red-500 font-bold ml-1">{adjustmentErrors.quantity}</p>}
                    </div>

                    <div className="space-y-1 lg:col-span-2">
                      <label className="text-[0.6rem] font-bold text-slate-400 uppercase ml-1">Reason / Notes</label>
                      <input
                        type="text"
                        placeholder="Why is this stock adjustment level changing?"
                        className={`w-full px-3 py-2 bg-slate-50 border ${adjustmentErrors.reason ? 'border-red-400' : 'border-slate-200'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none`}
                        value={adjustmentFormData.reason}
                        onChange={e => setAdjustmentFormData({...adjustmentFormData, reason: e.target.value})}
                      />
                      {adjustmentErrors.reason && <p className="text-[0.6rem] text-red-500 font-bold ml-1">{adjustmentErrors.reason}</p>}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 border-t pt-3">
                    <button 
                      type="button" 
                      onClick={() => {
                        setShowAdjustmentForm(false);
                        setAdjustmentErrors({});
                      }}
                      className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 uppercase"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-slate-800 transition-colors"
                    >
                      Record Adjustment
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stock Adjustments Table */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-[0.85rem]">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[0.7rem] tracking-widest border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Medicine</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Quantity Delta</th>
                  <th className="px-4 py-3">Reason / Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAdjustments.map(a => {
                  const isPositive = a.quantityDelta > 0;
                  return (
                    <motion.tr 
                      key={a.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-slate-50/50"
                    >
                      <td className="px-4 py-2.5 text-slate-400 text-xs">
                        {new Date(a.date).toLocaleDateString()} at {new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-2.5 font-bold text-slate-800">{a.medicineName}</td>
                      <td className="px-4 py-2.5">
                        <span className={`text-[0.65rem] px-2 py-0.5 rounded font-black uppercase ${
                          a.type === 'restock' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' :
                          a.type === 'damage' ? 'bg-red-50 text-red-700 border border-red-200/50' :
                          a.type === 'expired' ? 'bg-amber-50 text-amber-700 border border-amber-200/50' :
                          'bg-slate-100 text-slate-700 border border-slate-200/50'
                        }`}>
                          {a.type}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-bold">
                        <span className={isPositive ? 'text-emerald-700' : 'text-red-700'}>
                          {isPositive ? '+' : ''}{a.quantityDelta} Units
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-500 italic max-w-xs truncate" title={a.reason}>
                        {a.reason}
                      </td>
                    </motion.tr>
                  );
                })}
                {filteredAdjustments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-slate-400 italic font-medium">No stock adjustment entries found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Confirmation Modals */}
      <AnimatePresence>
        {medicineToArchive && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-sm w-full overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center gap-3 text-red-600 mb-3">
                  <div className="p-2 bg-red-50 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">Confirm Archive</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Are you sure you want to archive <strong className="text-slate-800 font-bold">"{medicineToArchive.name}"</strong>? This will remove the medicine from active stock levels.
                </p>
              </div>
              <div className="bg-slate-50 px-5 py-3 flex justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setMedicineToArchive(null)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 uppercase"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    actions.deleteMedicine(medicineToArchive.id);
                    setSelectedIds(prev => prev.filter(id => id !== medicineToArchive.id));
                    setMedicineToArchive(null);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors"
                >
                  Confirm Archive
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBulkArchiveModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-sm w-full overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center gap-3 text-red-600 mb-3">
                  <div className="p-2 bg-red-50 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">Confirm Bulk Archive</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Are you sure you want to archive <strong className="text-slate-800 font-bold">{selectedIds.length}</strong> selected medicines? This will remove them all from active stock levels.
                </p>
              </div>
              <div className="bg-slate-50 px-5 py-3 flex justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setShowBulkArchiveModal(false)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 uppercase"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    selectedIds.forEach(id => actions.deleteMedicine(id));
                    setSelectedIds([]);
                    setShowBulkArchiveModal(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors"
                >
                  Confirm Archive All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBarcodeSimulatorOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4 text-left font-sans text-slate-850 dark:text-slate-100"
            >
              <div className="flex items-center gap-3 text-sky-600 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="bg-sky-50 dark:bg-sky-950 p-2.5 rounded-xl border border-sky-100/60 flex items-center justify-center">
                  <Barcode className="w-6 h-6 text-sky-500 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">Barcode Input Simulator</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Model a physical hardware scan event</p>
                </div>
              </div>

              <div className="space-y-3.5">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Select a registered medication item from the system catalog list to simulate scanning its barcode.
                </p>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Select Medication Item</label>
                  <select
                    value={simulatorSelectedMedId}
                    onChange={(e) => setSimulatorSelectedMedId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none transition-all cursor-pointer border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 hover:bg-slate-50/80 text-slate-800 dark:text-slate-200"
                  >
                    {medicines.map(m => (
                      <option key={`sim-selector-opt-${m.id}`} value={m.id}>
                        {m.name} (SKU/Code: {m.id}) — {currency}{m.price.toFixed(2)} (Stock: {m.quantity})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sample quick tags for first 4 medicines */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Quick Pick presets</span>
                  <div className="grid grid-cols-2 gap-2">
                    {medicines.slice(0, 4).map(m => (
                      <button
                        key={`sim-quick-${m.id}`}
                        type="button"
                        onClick={() => setSimulatorSelectedMedId(m.id)}
                        className={`text-left p-2 rounded-lg border text-[11px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                          simulatorSelectedMedId === m.id
                            ? 'bg-sky-50 dark:bg-sky-950 border-sky-400 dark:border-sky-705 text-sky-700 dark:text-sky-350 font-extrabold'
                            : 'bg-slate-50/50 dark:bg-slate-900 border-slate-100 hover:bg-slate-50 text-slate-600 dark:text-slate-400 hover:text-slate-850 cursor-pointer'
                        }`}
                      >
                        <span className="truncate pr-1">{m.name}</span>
                        <span className="text-[9px] font-mono shrink-0 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-500">{m.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsBarcodeSimulatorOpen(false)}
                  className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 order-last sm:order-first cursor-pointer"
                >
                  Cancel / Close
                </button>
                <div className="flex flex-1 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!simulatorSelectedMedId) return;
                      setSearchQuery(simulatorSelectedMedId);
                      setIsBarcodeSimulatorOpen(false);
                      setExportSuccess(`Simulated input: Searched for item "${medicines.find(m => m.id === simulatorSelectedMedId)?.name || 'Medicine'}"!`);
                      setTimeout(() => setExportSuccess(null), 3500);
                    }}
                    className="flex-1 px-3 py-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all select-none cursor-pointer border border-transparent flex items-center justify-center gap-1 hover:shadow-xs"
                    title="Filter search to this medicine in inventory list"
                  >
                    <Search className="w-3.5 h-3.5" /> Find Item
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!simulatorSelectedMedId) return;
                      setIsBarcodeSimulatorOpen(false);
                      if (onSimulateScanToSale) {
                        onSimulateScanToSale(simulatorSelectedMedId);
                      }
                    }}
                    className="flex-1 px-3 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all select-none cursor-pointer border border-transparent shadow-sm flex items-center justify-center gap-1 hover:shadow-md"
                    title="Switch to sales tab and push item to invoice cart"
                  >
                    <Plus className="w-3.5 h-3.5" /> Push To Sale
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isImportModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-2xl w-full shadow-2xl space-y-4 text-left font-sans text-slate-850 dark:text-slate-100 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-100/60 flex items-center justify-center">
                    <Download className="w-5 h-5 text-emerald-600 rotate-180" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">CSV Bulk Inventory Import</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Add new medicines and update stock levels in batch</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-650 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body Content */}
              <div className="space-y-4 overflow-y-auto flex-1 pr-1">
                {/* Drag and Drop Zone */}
                {!importFileName ? (
                  <div
                    onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFileParse(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => document.getElementById('csv-import-file-input-id')?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                      dragActive 
                        ? 'border-emerald-550 bg-emerald-50/40 dark:bg-emerald-950/20' 
                        : 'border-slate-200 hover:border-emerald-400 dark:border-slate-800 dark:hover:border-emerald-500/60 bg-slate-50/50 hover:bg-slate-50/80 dark:bg-slate-900/40'
                    }`}
                  >
                    <input 
                      type="file" 
                      id="csv-import-file-input-id" 
                      accept=".csv" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileParse(e.target.files[0]);
                        }
                      }}
                    />
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                      <Download className="w-6 h-6 rotate-180 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Drag and drop your spreadsheet (.csv) here
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        or click to browse local files
                      </p>
                    </div>
                    <div className="text-[9px] text-slate-450 dark:text-slate-400 border border-slate-100 dark:border-slate-850 px-2 py-1 rounded-md bg-white dark:bg-slate-900/60 flex items-center gap-1 mt-1">
                      <span>Supports columns:</span>
                      <strong className="text-slate-600 dark:text-slate-300">ID (Optional), Medicine Name, Category, Stock Level, Price, Expiry Date</strong>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-3.5 border border-slate-150 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg text-emerald-700 dark:text-emerald-400 font-mono text-[9px] font-black tracking-wider">
                        CSV SOURCE
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-sm">{importFileName}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Parsed {importedRows.length} catalog positions successfully</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImportedRows([]);
                        setImportFileName('');
                        setImportStats({ total: 0, newCount: 0, updateCount: 0, invalidCount: 0 });
                      }}
                      className="text-[10px] font-bold text-red-650 hover:text-red-700 bg-red-50 hover:bg-red-100/60 px-2.5 py-1.5 rounded-lg border border-red-100 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Clear File
                    </button>
                  </div>
                )}

                {/* Adjustment Mode Controls */}
                <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Inventory Sync Rule Mode</h5>
                      <p className="text-[10px] text-slate-450 dark:text-slate-400">Choose how current system quantities are integrated</p>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg self-start sm:self-center">
                      <button
                        type="button"
                        onClick={() => setImportMode('overwrite')}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer ${
                          importMode === 'overwrite'
                            ? 'bg-slate-950 dark:bg-slate-700 text-white shadow-sm'
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-355 hover:bg-slate-200/40 dark:hover:bg-slate-850/40'
                        }`}
                      >
                        Overwrite Stock Balance
                      </button>
                      <button
                        type="button"
                        onClick={() => setImportMode('add')}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer ${
                          importMode === 'add'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-355 hover:bg-slate-200/40 dark:hover:bg-slate-850/40'
                        }`}
                      >
                        Add to Stock (Restock)
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-850/60 text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-medium text-left">
                    {importMode === 'overwrite' ? (
                      <p>
                        ⚠️ <strong className="text-slate-700 dark:text-slate-300">Overwrite Mode</strong>: This maps your system stock direct to values written in CSV. Recommended for regular absolute audits.
                      </p>
                    ) : (
                      <p>
                        📈 <strong className="text-emerald-700 dark:text-emerald-400">Restock Mode (+)</strong>: Adds imported quantities directly onto on-hand balances. Keeps present stock safe, ideal for delivery arrivals.
                      </p>
                    )}
                  </div>
                </div>

                {/* Import Statistics Grid if file parsed */}
                {importedRows.length > 0 && (
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-150 dark:border-slate-800 text-center">
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Total Rows</span>
                      <span className="text-base font-black text-slate-800 dark:text-slate-10 block mt-0.5 font-mono">{importStats.total}</span>
                    </div>
                    <div className="bg-sky-50/50 dark:bg-sky-950/20 p-2.5 rounded-xl border border-sky-100/40 text-center">
                      <span className="text-[8px] font-bold text-sky-500 dark:text-sky-450 uppercase tracking-widest block">New Records</span>
                      <span className="text-base font-black text-sky-700 dark:text-sky-400 block mt-0.5 font-mono">+{importStats.newCount}</span>
                    </div>
                    <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-100/40 text-center">
                      <span className="text-[8px] font-bold text-emerald-500 dark:text-emerald-450 uppercase tracking-widest block">Updates</span>
                      <span className="text-base font-black text-emerald-700 dark:text-emerald-400 block mt-0.5 font-mono">~{importStats.updateCount}</span>
                    </div>
                    <div className="bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-xl border border-amber-100/40 text-center">
                      <span className="text-[8px] font-bold text-amber-500 dark:text-amber-450 uppercase tracking-widest block">Skipped Actions</span>
                      <span className="text-base font-black text-amber-600 dark:text-amber-400 block mt-0.5 font-mono">{importStats.invalidCount}</span>
                    </div>
                  </div>
                )}

                {/* Preview Table */}
                {importedRows.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Parsed Records Preview</h5>
                      <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">Only row items without skip markers will merge</span>
                    </div>

                    <div className="border border-slate-150 dark:border-slate-800 rounded-xl overflow-hidden max-h-[200px] overflow-y-auto bg-slate-50/50 dark:bg-slate-900/20">
                      <table className="w-full text-left text-[11px] font-sans">
                        <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-bold uppercase text-[8px] tracking-wider border-b border-slate-150 dark:border-slate-800 sticky top-0">
                          <tr>
                            <th className="px-3 py-2 shrink-0">Action Type</th>
                            <th className="px-3 py-2 text-left">Medicine Title</th>
                            <th className="px-3 py-2">Category</th>
                            <th className="px-3 py-2 text-right">Price</th>
                            <th className="px-3 py-2 text-right text-purple-750 dark:text-purple-300">Sync Inventory</th>
                            <th className="px-3 py-2 text-right shrink-0">Expiry</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-[#0f172a]">
                          {importedRows.map((row, idx) => (
                            <tr key={`imp-row-${idx}`} className={`hover:bg-slate-50/50 dark:hover:bg-slate-900/40 ${row.error ? 'bg-amber-50/10 text-slate-400 dark:text-slate-550' : ''}`}>
                              <td className="px-3 py-2">
                                {row.error ? (
                                  <span className="inline-flex items-center gap-0.5 text-[8px] font-black uppercase text-amber-650 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200/20" title={row.error}>
                                    <AlertTriangle className="w-2.5 h-2.5 shrink-0" /> Skip: {row.error}
                                  </span>
                                ) : row.isNew ? (
                                  <span className="text-[8px] font-black uppercase text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-1.5 py-0.5 rounded border border-sky-200/20">
                                    + Add New
                                  </span>
                                ) : (
                                  <span className="text-[8px] font-black uppercase text-emerald-705 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200/20">
                                    ✓ Update
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2 font-bold max-w-[150px] truncate">
                                <span className={row.error ? 'line-through' : 'text-slate-800 dark:text-slate-100'}>{row.name || 'empty'}</span>
                                {row.id && <span className="block text-[8px] text-slate-400 dark:text-slate-500 font-mono mt-0.5 truncate">ID: {row.id}</span>}
                              </td>
                              <td className="px-3 py-2 text-slate-500 dark:text-slate-400 font-medium truncate">{row.category}</td>
                              <td className="px-3 py-2 text-right font-mono font-bold text-slate-600 dark:text-slate-350">
                                {currency}{row.price.toFixed(2)}
                              </td>
                              <td className="px-3 py-2 text-right font-mono font-black">
                                {row.error ? (
                                  <span className="text-slate-300 dark:text-slate-700">—</span>
                                ) : row.isNew ? (
                                  <span className="text-sky-600 dark:text-sky-455 font-black">0 → {row.quantity} (+{row.quantity})</span>
                                ) : importMode === 'add' ? (
                                  <span className="text-emerald-600 dark:text-emerald-400">
                                    {row.originalQty} → {row.originalQty + row.quantity} (+{row.quantity})
                                  </span>
                                ) : (
                                  <span className="text-slate-700 dark:text-slate-300">
                                    {row.originalQty} → {row.quantity}
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2 text-right font-mono text-[9px] text-slate-400 truncate">{row.expiryDate || 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons footer */}
              <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-slate-150 dark:border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={downloadImportTemplate}
                  className="px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-750 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Download standard CSV spreadsheet template outline"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" /> Download Template CSV
                </button>
                <div className="flex-1"></div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={importedRows.filter(r => !r.error).length === 0}
                    onClick={() => {
                      const validItems = importedRows.filter(r => !r.error);
                      if (validItems.length === 0) return;
                      
                      const res = actions.importMedicines(validItems, importMode);
                      setIsImportModalOpen(false);
                      setExportSuccess(`Successfully parsed file and processed bulk update! Added ${res.addedCount} new stock entry profiles & matching updated ${res.updatedCount} medicine balances.`);
                      setTimeout(() => setExportSuccess(null), 5000);
                      setImportedRows([]);
                      setImportFileName('');
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white border border-transparent rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-100" /> Confirm Import {importStats.total > 0 ? `(${importStats.total - importStats.invalidCount} Mapped)` : ''}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReorderModal && reorderMedicine && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2 text-amber-655 font-bold">
                  <Mail className="w-5 h-5 text-amber-550 shrink-0" />
                  <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">Construct Reorder Requisition</h4>
                </div>
                <button 
                  onClick={() => setShowReorderModal(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {reorderSuccessMsg ? (
                <div className="p-6 text-center space-y-4 flex-1 overflow-y-auto">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Check className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Inquiry Auto-Generated!</h5>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                    {reorderSuccessMsg}
                  </p>
                  <span className="text-[10px] text-sky-600 font-bold bg-sky-50 py-1.5 px-3 rounded-md inline-block animate-pulse">
                    Simulating Supplier Email Draft Sync...
                  </span>
                </div>
              ) : (
                <div className="p-5 space-y-4 overflow-y-auto flex-1 text-slate-700">
                  <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200/50 flex gap-2.5 items-start">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-[0.7rem] font-bold text-amber-805 uppercase tracking-wider">Critical Stock Alert</p>
                      <p className="text-[11px] text-amber-700 leading-normal">
                        <strong>{reorderMedicine.name}</strong> has dropped to <strong>{reorderMedicine.quantity} units</strong> on-hand, which is below the threshold.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Supplier dropdown */}
                    <div className="space-y-1">
                      <label className="text-[0.62rem] font-bold text-slate-400 uppercase tracking-wider block text-left">Recipient Supplier</label>
                      <select
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none hover:bg-slate-100/50 cursor-pointer"
                        value={selectedSupplierId}
                        onChange={(e) => setSelectedSupplierId(e.target.value)}
                      >
                        {suppliers.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.category || 'General'})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quantity field */}
                    <div className="space-y-1">
                      <label className="text-[0.62rem] font-bold text-slate-400 uppercase tracking-wider block text-left">Quantity to Reorder</label>
                      <input
                        type="number"
                        min="1"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none"
                        value={reorderQty}
                        onChange={(e) => setReorderQty(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                    </div>
                  </div>

                  {/* Mail fields */}
                  <div className="space-y-2 text-left bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <div>
                      <span className="text-[0.55rem] font-bold text-slate-400 uppercase block">Subject Line</span>
                      <input
                        type="text"
                        className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 outline-none focus:ring-1 ring-sky-505 mt-1"
                        value={reorderTemplateSubject}
                        onChange={(e) => setReorderTemplateSubject(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <span className="text-[0.55rem] font-bold text-slate-400 uppercase block">Inquiry Content</span>
                      <textarea
                        rows={8}
                        className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs font-medium text-slate-700 outline-none focus:ring-1 ring-sky-505 font-sans mt-1 resize-none"
                        value={reorderTemplateBody}
                        onChange={(e) => setReorderTemplateBody(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-slate-50 px-5 py-3.5 flex justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setShowReorderModal(false)}
                  disabled={!!reorderSuccessMsg}
                  className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 uppercase disabled:opacity-50 cursor-pointer"
                >
                  Close
                </button>
                {!reorderSuccessMsg && (
                  <button 
                    type="button"
                    onClick={handleSendReorderInquiry}
                    className="bg-amber-650 hover:bg-amber-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" /> Construct Inquiry Template
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Print Barcode Modal */}
      <AnimatePresence>
        {barcodeMedicine && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-sm w-full overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-slate-800">
                    <Barcode className="w-5 h-5 text-sky-600 shrink-0" />
                    <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">Print Product Barcode</h4>
                  </div>
                  <button 
                    onClick={() => setBarcodeMedicine(null)}
                    className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-colors pointer-events-auto cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-xs text-slate-500 mb-4 text-left leading-relaxed">
                  Generated Code 128 barcode format for the item code <code className="bg-slate-100 text-slate-850 px-1 py-0.5 rounded font-mono font-bold text-[11px]">{barcodeMedicine.id}</code>.
                </p>

                <div className="py-2.5 bg-slate-50 border border-slate-100 rounded-lg flex flex-col items-center justify-center">
                  <BarcodeSVG val={barcodeMedicine.id} />
                  <div className="text-center mt-3 text-slate-800">
                    <p className="text-xs font-bold">{barcodeMedicine.name}</p>
                    <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider mt-0.5">{barcodeMedicine.category}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-5 py-3.5 flex justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setBarcodeMedicine(null)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-705 uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    printBarcodeInIframe(barcodeMedicine.id, barcodeMedicine.name);
                    setBarcodeMedicine(null);
                  }}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Label
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bulk Category Management Modal */}
      <AnimatePresence>
        {showBulkCategoryModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-sm w-full overflow-hidden"
            >
              <form onSubmit={handleBulkCategoryUpdate}>
                <div className="p-5 text-slate-800">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Edit2 className="w-5 h-5 text-amber-500 shrink-0" />
                      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">Bulk Category Change</h4>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setShowBulkCategoryModal(false)}
                      className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-colors pointer-events-auto cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4 text-left">
                    You have selected <strong className="text-slate-850 font-bold">{selectedIds.length}</strong> medicines. Choose a category to update them all in a single batch update:
                  </p>

                  <div className="space-y-1 block text-left">
                    <label className="text-[0.62rem] font-bold text-slate-405 uppercase tracking-wider block">Target Category</label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none hover:bg-slate-100/50 cursor-pointer text-slate-705"
                      value={bulkCategory}
                      onChange={(e) => setBulkCategory(e.target.value)}
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="bg-slate-50 px-5 py-3.5 flex justify-end gap-2 border-t border-slate-100">
                  <button 
                    type="button"
                    onClick={() => setShowBulkCategoryModal(false)}
                    className="px-3 py-1.5 text-xs font-bold text-slate-505 hover:text-slate-705 uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors shadow-sm cursor-pointer"
                  >
                    Update Category
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EmptyState = ({ type }: { type: 'cart' | 'reports' }) => {
  if (type === 'cart') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <svg className="w-12 h-12 text-slate-500 mb-3 opacity-60" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="14" y="22" width="36" height="30" rx="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 22V16C22 11.58 25.58 8 30 8H34C38.42 8 42 11.58 42 16V22" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="26" cy="34" r="2" fill="currentColor" />
          <circle cx="38" cy="34" r="2" fill="currentColor" />
          <path d="M28 42C28 42 30 44 32 44C34 44 36 42 36 42" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest">Basket is Empty</p>
        <p className="text-[0.65rem] text-slate-500 mt-1 max-w-[200px]">Add catalogue products to checkout here and emit active receipts.</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-lg border border-slate-200/50 shadow-sm">
      <svg className="w-16 h-16 text-slate-300 mb-3" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="22" y="16" width="36" height="48" rx="3" strokeDasharray="3 3" />
        <line x1="32" y1="28" x2="48" y2="28" />
        <line x1="32" y1="38" x2="44" y2="38" strokeDasharray="2 2" />
        <line x1="32" y1="48" x2="48" y2="48" />
        <circle cx="44" cy="44" r="10" fill="#fff" stroke="currentColor" strokeWidth="1.2" />
        <path d="M41 44L43 46L47 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest">No Sales Found</p>
      <p className="text-[0.7rem] text-slate-400 mt-1 max-w-[320px]">We couldn't find any transactions fitting the active search keywords or date segmentation rules.</p>
    </div>
  );
};

const printReceiptInIframe = (
  items: { medicineName: string, quantity: number, price: number }[], 
  total: number, 
  currency: string,
  dateString?: string,
  transactionId?: string
) => {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.width = '0px';
  iframe.style.height = '0px';
  iframe.style.border = 'none';
  iframe.style.left = '-9999px';
  
  document.body.appendChild(iframe);
  
  const iframeDoc = iframe.contentWindow || iframe.contentDocument;
  const doc = (iframeDoc as any).document || iframeDoc;
  
  const displayDate = dateString ? new Date(dateString).toLocaleString() : new Date().toLocaleString();
  const displayTxnId = transactionId ? `#${transactionId.slice(0, 12).toUpperCase()}` : 'N/A';
  
  const receiptHtml = `
    <html>
      <head>
        <title>Receipt - Pharma.MVP</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #1e293b; }
          h1 { font-size: 20px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px; color: #0f172a; margin-top: 0; }
          .meta { font-size: 12px; color: #64748b; margin-bottom: 30px; line-height: 1.6; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { text-align: left; padding: 10px 0; border-bottom: 2px solid #e2e8f0; font-size: 11px; text-transform: uppercase; color: #64748b; }
          td { padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .total-row td { border-bottom: none; font-weight: bold; font-size: 16px; padding-top: 20px; }
          .footer { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 50px; border-top: 1px dashed #e2e8f0; padding-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Receipt</h1>
        <div class="meta">
          <div><strong>Transaction ID:</strong> ${displayTxnId}</div>
          <div><strong>Date:</strong> ${displayDate}</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>${item.medicineName}</td>
                <td>${item.quantity}</td>
                <td>${currency}${item.price.toFixed(2)}</td>
                <td style="text-align: right;">${currency}${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            `).join('')}
            <tr class="total-row">
              <td colspan="2"></td>
              <td>Total Paid:</td>
              <td style="text-align: right;">${currency}${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div class="footer">
          Thank you for your purchase!<br/>Pharma.MVP System
        </div>
      </body>
    </html>
  `;
  
  doc.write(receiptHtml);
  doc.close();
  
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 500);
};

const SalesView = ({ 
  medicines, 
  actions, 
  currency, 
  users = [],
  externalCart,
  setExternalCart
}: { 
  medicines: Medicine[], 
  actions: any, 
  currency: string, 
  users?: User[],
  externalCart?: any[],
  setExternalCart?: React.Dispatch<React.SetStateAction<any[]>>
}) => {
  const onDutyStaff = users.find(u => u.role === 'Front Desk' && u.activeAtFrontDesk);
  const [localCart, setLocalCart] = useState<{ medicineId: string, medicineName: string, quantity: number, price: number }[]>([]);
  const cart = externalCart !== undefined ? externalCart : localCart;
  const setCart = setExternalCart !== undefined ? setExternalCart : setLocalCart;
  const [saleData, setSaleData] = useState({ medicineId: '', quantity: 1 });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [scannedCode, setScannedCode] = useState('');
  const [scanFeedback, setScanFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [autoAddOnScan, setAutoAddOnScan] = useState(true);
  const [lastCompletedSale, setLastCompletedSale] = useState<{ medicineId: string, medicineName: string, quantity: number, price: number }[] | null>(null);
  const [lastCompletedTotal, setLastCompletedTotal] = useState<number>(0);

  // Camera QR scanner state variables
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraStream(stream);
      // Wait a tiny frame for ref binding to resolve
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err: any) {
      console.error("Camera access failed", err);
      setCameraError("Camera access denied or unavailable. Please ensure camera permissions are active.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const openQrScanner = () => {
    setIsQrScannerOpen(true);
    startCamera();
  };

  const closeQrScanner = () => {
    stopCamera();
    setIsQrScannerOpen(false);
  };

  const [barcodeDetectorSupported, setBarcodeDetectorSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      setBarcodeDetectorSupported(true);
    }
  }, []);

  useEffect(() => {
    let active = true;
    let frameId: number;

    const detectLoop = async () => {
      if (!active || !isQrScannerOpen || !videoRef.current) return;
      const BarcodeDetectorClass = (window as any).BarcodeDetector;
      if (BarcodeDetectorClass && videoRef.current.readyState >= 2) {
        try {
          const detector = new BarcodeDetectorClass({
            formats: ['qr_code', 'ean_13', 'code_128', 'code_39', 'upc_a', 'upc_e']
          });
          const barcodes = await detector.detect(videoRef.current);
          if (barcodes.length > 0 && active) {
            const rawCode = barcodes[0].rawValue;
            handleBarcodeScan(rawCode);
            closeQrScanner();
            return;
          }
        } catch (error) {
          console.warn("Standard barcode detection frame failed in SalesView: ", error);
        }
      }
      if (active) {
        frameId = requestAnimationFrame(detectLoop);
      }
    };

    if (isQrScannerOpen) {
      frameId = requestAnimationFrame(detectLoop);
    }

    return () => {
      active = false;
      cancelAnimationFrame(frameId);
    };
  }, [isQrScannerOpen, medicines]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Catalogue edit, add, delete modal states
  const [showCatAddModal, setShowCatAddModal] = useState(false);
  const [showCatEditModal, setShowCatEditModal] = useState(false);
  const [showCatDeleteConfirm, setShowCatDeleteConfirm] = useState(false);
  const [catFormData, setCatFormData] = useState({ id: '', name: '', category: 'General', price: 9.99, quantity: 50, expiryDate: '' });
  const [catErrors, setCatErrors] = useState<Record<string, string>>({});

  const getFutureDate = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  };

  const openCatAdd = () => {
    setCatFormData({
      id: '',
      name: '',
      category: 'General',
      price: 10.00,
      quantity: 50,
      expiryDate: getFutureDate()
    });
    setCatErrors({});
    setShowCatAddModal(true);
  };

  const openCatEdit = () => {
    if (!saleData.medicineId) return;
    const selected = medicines.find(m => m.id === saleData.medicineId);
    if (!selected) return;
    
    setCatFormData({
      id: selected.id,
      name: selected.name,
      category: selected.category,
      price: selected.price,
      quantity: selected.quantity,
      expiryDate: selected.expiryDate
    });
    setCatErrors({});
    setShowCatEditModal(true);
  };

  const validateCatForm = () => {
    const errs: Record<string, string> = {};
    if (!catFormData.name.trim()) errs.name = 'Item name is required';
    if (!catFormData.category.trim()) errs.category = 'Category is required';
    if (catFormData.price <= 0) errs.price = 'Price must be greater than 0';
    if (catFormData.quantity < 0) errs.quantity = 'Quantity cannot be negative';
    if (!catFormData.expiryDate) errs.expiryDate = 'Expiry date is required';
    setCatErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCatAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCatForm()) return;
    
    actions.addMedicine({
      name: catFormData.name.trim(),
      category: catFormData.category.trim(),
      price: Number(catFormData.price),
      quantity: Number(catFormData.quantity),
      expiryDate: catFormData.expiryDate
    });
    
    setShowCatAddModal(false);
    setScanFeedback({ message: `Successfully added "${catFormData.name}" to Catalogue!`, isError: false });
    setTimeout(() => setScanFeedback(null), 3000);
  };

  const handleCatEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCatForm()) return;
    if (!catFormData.id) return;
    
    const updated = {
      id: catFormData.id,
      name: catFormData.name.trim(),
      category: catFormData.category.trim(),
      price: Number(catFormData.price),
      quantity: Number(catFormData.quantity),
      expiryDate: catFormData.expiryDate
    };
    
    actions.updateMedicine(updated);
    
    // Update matching items inside the current sale cart if they exist
    setCart(prev => prev.map(item => {
      if (item.medicineId === updated.id) {
        return {
          ...item,
          medicineName: updated.name,
          price: updated.price,
          quantity: Math.min(item.quantity, updated.quantity)
        };
      }
      return item;
    }).filter(item => item.quantity > 0)); 
    
    setShowCatEditModal(false);
    setScanFeedback({ message: `Successfully updated item "${updated.name}"!`, isError: false });
    setTimeout(() => setScanFeedback(null), 3500);
  };

  const handleCatDelete = () => {
    if (!saleData.medicineId) return;
    const medId = saleData.medicineId;
    const matchedName = medicines.find(m => m.id === medId)?.name || 'Medicine element';
    
    actions.deleteMedicine(medId);
    
    // Remove from cart if present
    setCart(prev => prev.filter(item => item.medicineId !== medId));
    
    // Reset selection
    setSaleData({ medicineId: '', quantity: 1 });
    setShowCatDeleteConfirm(false);
    
    setScanFeedback({ message: `Permanently removed "${matchedName}" from catalogue.`, isError: false });
    setTimeout(() => setScanFeedback(null), 3500);
  };

  const updateCartQuantity = (medId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(medId);
      return;
    }
    
    const med = medicines.find(m => m.id === medId);
    if (!med) return;
    
    if (newQty > med.quantity) {
      setScanFeedback({ message: `Cannot exceed available stock of ${med.quantity} Units for ${med.name}.`, isError: true });
      setTimeout(() => setScanFeedback(null), 3500);
      return;
    }
    
    setCart(prev => prev.map(item => 
      item.medicineId === medId ? { ...item, quantity: newQty } : item
    ));
  };

  const validateItem = () => {
    const newErrors: Record<string, string> = {};
    if (!saleData.medicineId) newErrors.medicine = 'Select a medicine';
    if (saleData.quantity <= 0) newErrors.quantity = 'Must be > 0';
    
    const med = medicines.find(m => m.id === saleData.medicineId);
    if (med) {
      const alreadyInCart = cart.find(item => item.medicineId === saleData.medicineId);
      const totalRequested = (alreadyInCart?.quantity || 0) + saleData.quantity;
      if (med.quantity < totalRequested) {
        newErrors.quantity = `Low stock (Available: ${med.quantity})`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBarcodeScan = (code: string) => {
    const trimmedCode = code.trim();
    if (!trimmedCode) return;

    let targetId = trimmedCode;
    let formatType = 'Barcode';

    // 1. Check if JSON (likely interactive QR code)
    if (trimmedCode.startsWith('{') && trimmedCode.endsWith('}')) {
      try {
        const parsed = JSON.parse(trimmedCode);
        const resolvedId = parsed.id || parsed.medicineId || parsed.medId;
        if (resolvedId) {
          targetId = resolvedId;
          formatType = 'QR Code (JSON)';
        }
      } catch (e) {
        // Fallback
      }
    }
    // 2. Check if URL (likely decoded QR code pointing to item profile)
    else if (trimmedCode.startsWith('http://') || trimmedCode.startsWith('https://')) {
      try {
        const urlObj = new URL(trimmedCode);
        const paramId = urlObj.searchParams.get('id') || urlObj.searchParams.get('medicineId') || urlObj.searchParams.get('medId');
        if (paramId) {
          targetId = paramId;
          formatType = 'QR Code (URL Match)';
        } else {
          const segments = urlObj.pathname.split('/').filter(Boolean);
          if (segments.length > 0) {
            targetId = segments[segments.length - 1];
            formatType = 'QR Code (URL Segment)';
          }
        }
      } catch (e) {
        // Fallback
      }
    }
    // 3. Check for specific common prefixes e.g. qr-med-1, qr:med-1, med-id:med-1
    else {
      const prefixRegex = /^(qr|qr-code|med|medicine|id)[:\-]/i;
      if (prefixRegex.test(trimmedCode)) {
        targetId = trimmedCode.replace(prefixRegex, '');
        formatType = 'QR Code (Prefixed)';
      }
    }

    const matched = medicines.find(
      m => m.id.toLowerCase() === targetId.toLowerCase()
    );

    if (matched) {
      if (matched.quantity === 0) {
        setScanFeedback({ message: `[${formatType}] "${matched.name}" is out of stock!`, isError: true });
        setTimeout(() => setScanFeedback(null), 3000);
        setScannedCode('');
        return;
      }

      setSaleData({ medicineId: matched.id, quantity: saleData.quantity || 1 });
      
      if (autoAddOnScan) {
        const qtyToAdd = saleData.quantity || 1;
        const alreadyInCart = cart.find(item => item.medicineId === matched.id);
        const totalRequested = (alreadyInCart?.quantity || 0) + qtyToAdd;

        if (matched.quantity < totalRequested) {
          setScanFeedback({ 
            message: `[${formatType}] Selected "${matched.name}", but only ${matched.quantity} Units in stock.`, 
            isError: true 
          });
        } else {
          const existing = cart.find(i => i.medicineId === matched.id);
          if (existing) {
            setCart(cart.map(item => item.medicineId === matched.id ? { ...item, quantity: item.quantity + qtyToAdd } : item));
          } else {
            setCart([...cart, { medicineId: matched.id, medicineName: matched.name, quantity: qtyToAdd, price: matched.price }]);
          }
          setScanFeedback({ message: `[${formatType}] Scanned & Added: ${matched.name}!`, isError: false });
        }
      } else {
        setScanFeedback({ message: `[${formatType}] Scanned & Selected: ${matched.name}`, isError: false });
      }

      setTimeout(() => setScanFeedback(null), 3500);
      setScannedCode('');
    } else {
      setScanFeedback({ message: `No medicine found matching code "${targetId}" [${formatType}]`, isError: true });
      setTimeout(() => setScanFeedback(null), 3500);
    }
  };

  const addToCart = () => {
    if (validateItem()) {
      const med = medicines.find(m => m.id === saleData.medicineId)!;
      const existing = cart.find(i => i.medicineId === med.id);
      
      if (existing) {
        setCart(cart.map(item => item.medicineId === med.id ? { ...item, quantity: item.quantity + saleData.quantity } : item));
      } else {
        setCart([...cart, { medicineId: med.id, medicineName: med.name, quantity: saleData.quantity, price: med.price }]);
      }
      
      setSaleData({ medicineId: '', quantity: 1 });
      setErrors({});
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.medicineId !== id));
  };

  const handleFinalize = useCallback(() => {
    if (cart.length === 0) return;
    
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    actions.processSale({
      items: cart,
      total
    });
    
    setLastCompletedSale([...cart]);
    setLastCompletedTotal(total);
    
    printReceiptInIframe(cart, total, currency);
    
    setCart([]);
  }, [cart, actions, currency]);



  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="max-w-4xl mx-auto py-4 flex flex-col md:flex-row gap-6">
      <div className="flex-1 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-100 pb-4 text-left">
          <h3 className="text-lg font-bold text-slate-800">Point of Sale Terminal</h3>
          {onDutyStaff ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-150 rounded-full text-xs font-bold text-emerald-700 shadow-xs shrink-0 self-start sm:self-auto select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-555 animate-pulse"></span>
              <span>Front Desk Operator on Duty: {onDutyStaff.name}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-xs font-bold text-amber-650 shrink-0 self-start sm:self-auto select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>No active Front Desk operator</span>
            </div>
          )}
        </div>
        
        {/* Checked Out / Print Receipt Success Box */}
        <AnimatePresence>
          {lastCompletedSale && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 rounded-full text-emerald-600 shrink-0 mt-0.5 sm:mt-0">
                  <Printer className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-850 uppercase tracking-wide">Purchase Completed</h4>
                  <p className="text-[11px] text-emerald-700 leading-normal mt-0.5">
                    Transaction of <strong>{lastCompletedSale.length} items</strong> (Total Paid: <strong>{currency}{lastCompletedTotal.toFixed(2)}</strong>) has been processed.
                  </p>
                </div>
              </div>
              <div className="flex gap-2.5 shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => printReceiptInIframe(lastCompletedSale, lastCompletedTotal, currency)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Receipt
                </button>
                <button
                  onClick={() => setLastCompletedSale(null)}
                  className="px-2.5 py-1.5 text-slate-500 hover:text-slate-700 border border-transparent text-xs font-bold uppercase cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Simulated Barcode Scanner Box */}
        <div className="bg-slate-50 border border-slate-200/70 p-4 rounded-xl mb-6 relative overflow-hidden shadow-xs">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500/30 animate-[pulse_1.5s_infinite]"></div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Barcode className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="text-[0.7rem] font-bold uppercase tracking-wider">Simulated Barcode Scanner</span>
            </div>
            
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={autoAddOnScan}
                onChange={e => setAutoAddOnScan(e.target.checked)}
                className="w-3.5 h-3.5 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
              />
              <span className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-widest">Auto-add to Sale</span>
            </label>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleBarcodeScan(scannedCode);
            }}
            className="flex gap-2"
          >
            <div className="relative flex items-center flex-1">
              <input 
                type="text"
                placeholder="Type or scan medicine ID (e.g. med-1)..."
                value={scannedCode}
                onChange={e => {
                  const val = e.target.value;
                  setScannedCode(val);
                  const matched = medicines.find(m => m.id.toLowerCase() === val.trim().toLowerCase());
                  if (matched) {
                    handleBarcodeScan(val);
                  }
                }}
                className="w-full pl-9 pr-18 py-2.5 bg-white border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 rounded-lg text-xs font-semibold outline-none transition-all"
              />
              <Barcode className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {scannedCode && (
                  <button 
                    type="button"
                    onClick={() => setScannedCode('')}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                    title="Clear"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <VoiceSearchButton 
                  onTranscript={(text) => {
                    const cleaned = text.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
                    setScannedCode(cleaned);
                    
                    const term = cleaned.toUpperCase();
                    const matched = medicines.find(
                      m => m.id.toLowerCase() === term.toLowerCase() ||
                           m.name.toUpperCase().includes(term) ||
                           term.includes(m.name.toUpperCase())
                    );
                    if (matched) {
                      setScannedCode(matched.id);
                      setSaleData(prev => ({ ...prev, medicineId: matched.id }));
                      handleBarcodeScan(matched.id);
                    }
                  }}
                  tooltipAlign="left"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2 text-xs rounded-lg uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              Scan
            </button>
            <button
              type="button"
              onClick={openQrScanner}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 text-xs rounded-lg uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              title="Scan code using live camera stream"
            >
              <QrCode className="w-3.5 h-3.5 animate-pulse" />
              <span>Scan QR</span>
            </button>
          </form>

          {/* QR Scanner live viewfinder dialog modal */}
          <AnimatePresence>
            {isQrScannerOpen && (
              <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-sm w-full overflow-hidden flex flex-col"
                >
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-2 text-sky-700">
                      <QrCode className="w-4 h-4 text-sky-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Camera QR Scanner</h4>
                    </div>
                    <button
                      type="button"
                      onClick={closeQrScanner}
                      className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-4 flex-1">
                    <p className="text-xs text-slate-500 leading-relaxed text-left">
                      Activate the camera lens overlay to decode and add medicines via JSON payloads, URLs or prefixes.
                    </p>

                    {/* Camera view screen */}
                    <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-inner flex items-center justify-center select-none">
                      {cameraError ? (
                        <div className="p-4 text-center text-rose-500 text-xs font-medium max-w-xs leading-normal">
                          <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-rose-550" />
                          {cameraError}
                        </div>
                      ) : (
                        <>
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {/* Visual guide crosshairs */}
                          <div className="absolute inset-0 border border-dashed border-sky-450/40 m-6 rounded-md pointer-events-none flex items-center justify-center">
                            <span className="absolute w-3 h-3 border-t-2 border-l-2 border-sky-500 top-0 left-0" />
                            <span className="absolute w-3 h-3 border-t-2 border-r-2 border-sky-500 top-0 right-0" />
                            <span className="absolute w-3 h-3 border-b-2 border-l-2 border-sky-500 bottom-0 left-0" />
                            <span className="absolute w-3 h-3 border-b-2 border-r-2 border-sky-500 bottom-0 right-0" />
                            <div className="w-full h-0.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-[bounce_1.5s_infinite] pointer-events-none" />
                          </div>
                          {!cameraStream && (
                            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-slate-400 text-xs font-semibold">
                              Spinning up camera lens...
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Live Detection API Info banner */}
                    <div className="flex items-center justify-between text-[10px] px-2.5 py-1.5 bg-slate-50 border border-slate-150 rounded-lg">
                      <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                        <div className={`w-1.5 h-1.5 rounded-full ${cameraStream ? 'bg-sky-500 animate-pulse' : 'bg-slate-300'}`} />
                        <span>Status: {cameraStream ? 'Lens Stream Active' : 'Off'}</span>
                      </div>
                      <div className="text-sky-700 font-mono font-bold tracking-tight">
                        {barcodeDetectorSupported ? '🖥️ DETECTOR ACTIVE' : '📱 LENS EMULATOR'}
                      </div>
                    </div>

                    {/* Simul selection targeting fallback menu */}
                    <div className="space-y-1.5 text-left pt-2">
                      <label className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest block">
                        Focus simulation target
                      </label>
                      <div className="flex gap-2">
                        <select
                          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-1 ring-sky-550 focus:outline-none hover:bg-slate-100 cursor-pointer text-slate-705"
                          defaultValue=""
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val) {
                              handleBarcodeScan(val);
                              closeQrScanner();
                            }
                          }}
                        >
                          <option value="" disabled>--- Align item to lens ---</option>
                          {medicines.map(m => (
                            <option key={`qr-selector-med-${m.id}`} value={m.id}>
                              {m.name} ({m.id})
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            const inStock = medicines.filter(m => m.quantity > 0);
                            if (inStock.length > 0) {
                              const rand = inStock[Math.floor(Math.random() * inStock.length)];
                              handleBarcodeScan(rand.id);
                              closeQrScanner();
                            }
                          }}
                          className="px-3 py-1.5 bg-sky-50 border border-sky-100 hover:bg-sky-100/70 text-sky-650 hover:text-sky-700 rounded-lg text-[10px] uppercase font-extrabold tracking-wide transition-colors shrink-0 cursor-pointer"
                        >
                          Quick Scan
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 px-4 py-3 flex justify-end gap-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={closeQrScanner}
                      className="px-3 py-1.5 border border-slate-250/70 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-500 uppercase cursor-pointer"
                    >
                      Close Viewfinder
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Feedback Label */}
          <AnimatePresence>
            {scanFeedback && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -5 }}
                className={`mt-2.5 text-[0.7rem] font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                  scanFeedback.isError ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-850 border border-emerald-100'
                }`}
              >
                {scanFeedback.isError ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                ) : (
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                )}
                <span>{scanFeedback.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Micro Presets Grid */}
          <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-3">
            <div>
              <span className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Simulation: Click to trigger Scans / QR Codes:</span>
              
              <div className="space-y-2">
                {/* Barcode section */}
                <div>
                  <span className="text-[0.55rem] font-bold text-slate-400 block mb-1 uppercase">1D Barcodes (ID):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {medicines.slice(0, 3).map(m => (
                      <button
                        key={`bar-${m.id}`}
                        type="button"
                        onClick={() => handleBarcodeScan(m.id)}
                        disabled={m.quantity === 0}
                        className="px-2 py-1 rounded bg-slate-50 border border-slate-200 hover:border-sky-300 text-[0.62rem] font-semibold flex items-center gap-1 transition-all text-slate-600 hover:text-sky-600 disabled:opacity-45"
                        title={`${m.name} barcode scan`}
                      >
                        <Barcode className="w-3 h-3 text-slate-400" />
                        <span>{m.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* QR Code Prefixed section */}
                <div>
                  <span className="text-[0.55rem] font-bold text-slate-400 block mb-1 uppercase">QR Codes (Prefixed - e.g. qr-med):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {medicines.slice(0, 3).map(m => (
                      <button
                        key={`qr-pref-${m.id}`}
                        type="button"
                        onClick={() => handleBarcodeScan(`qr-${m.id}`)}
                        disabled={m.quantity === 0}
                        className="px-2 py-1 rounded bg-slate-50 border border-slate-400/20 hover:border-emerald-355 text-[0.62rem] font-semibold flex items-center gap-1 transition-all text-slate-650 hover:text-emerald-600 disabled:opacity-45"
                        title={`${m.name} QR prefixed`}
                      >
                        <QrCode className="w-3 h-3 text-emerald-500" />
                        <span>qr-{m.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* QR Code JSON section */}
                <div>
                  <span className="text-[0.55rem] font-bold text-slate-400 block mb-1 uppercase">QR Codes (JSON Payload):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {medicines.slice(0, 2).map(m => {
                      const jsonPayload = JSON.stringify({ id: m.id });
                      return (
                        <button
                          key={`qr-json-${m.id}`}
                          type="button"
                          onClick={() => handleBarcodeScan(jsonPayload)}
                          disabled={m.quantity === 0}
                          className="px-2 py-1 rounded bg-slate-50 border border-slate-400/20 hover:border-violet-355 text-[0.62rem] font-semibold flex items-center gap-1 transition-all text-slate-650 hover:text-violet-600 disabled:opacity-45"
                          title={`Click to scan QR payload: ${jsonPayload}`}
                        >
                          <QrCode className="w-3 h-3 text-violet-500" />
                          <span>{"{"} id: "{m.id}" {"}"}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* QR Code URL section */}
                <div>
                  <span className="text-[0.55rem] font-bold text-slate-400 block mb-1 uppercase">QR Codes (URL Segment):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {medicines.slice(0, 2).map(m => {
                      const urlPayload = `https://pharmacy.mvp/inventory/${m.id}`;
                      return (
                        <button
                          key={`qr-url-${m.id}`}
                          type="button"
                          onClick={() => handleBarcodeScan(urlPayload)}
                          disabled={m.quantity === 0}
                          className="px-2 py-1 rounded bg-slate-50 border border-slate-400/20 hover:border-pink-355 text-[0.62rem] font-semibold flex items-center gap-1 transition-all text-slate-650 hover:text-pink-600 disabled:opacity-45"
                          title={`Click to scan QR URL: ${urlPayload}`}
                        >
                          <QrCode className="w-3 h-3 text-pink-500" />
                          <span>../{m.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <label className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest block">Select Catalogue Item</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openCatAdd}
                  className="px-2 py-0.5 text-[0.6rem] font-bold bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 rounded transition-all uppercase tracking-wide cursor-pointer flex items-center gap-0.5"
                  title="Add new item to catalogue"
                >
                  <Plus className="w-3 h-3 text-sky-600" /> New Item
                </button>
                {saleData.medicineId && (
                  <>
                    <button
                      type="button"
                      onClick={openCatEdit}
                      className="px-2 py-0.5 text-[0.6rem] font-bold bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 rounded transition-all uppercase tracking-wide cursor-pointer flex items-center gap-0.5"
                      title="Edit selected item"
                    >
                      <Edit2 className="w-2.5 h-2.5 text-amber-600" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCatDeleteConfirm(true)}
                      className="px-2 py-0.5 text-[0.6rem] font-bold bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded transition-all uppercase tracking-wide cursor-pointer flex items-center gap-0.5"
                      title="Delete selected item from catalogue"
                    >
                      <Trash2 className="w-2.5 h-2.5 text-rose-600" /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
            <select 
              className={`w-full px-3 py-3 bg-slate-50 border ${errors.medicine ? 'border-red-400' : 'border-slate-200'} rounded-md text-[0.85rem] focus:outline-none focus:ring-1 ring-sky-500 transition-all`}
              value={saleData.medicineId} 
              onChange={e => setSaleData({...saleData, medicineId: e.target.value})}
            >
              <option value="">Catalogue Lookup...</option>
              {medicines.map(m => (
                <option key={m.id} value={m.id} disabled={m.quantity === 0}>
                  {m.name} // Available: {m.quantity} Units
                </option>
              ))}
            </select>
            {errors.medicine && <p className="text-[0.65rem] text-red-500 font-bold ml-1">{errors.medicine}</p>}
          </div>
 
          <div className="space-y-2">
            <label className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest block ml-1">Order Quantity</label>
            <input 
              type="number" min="1"
              className={`w-full px-3 py-3 bg-slate-50 border ${errors.quantity ? 'border-red-400' : 'border-slate-200'} rounded-md text-[0.85rem] focus:outline-none focus:ring-1 ring-sky-500 transition-all`}
              value={saleData.quantity}
              onChange={e => setSaleData({...saleData, quantity: Number(e.target.value)})}
            />
            {errors.quantity && <p className="text-[0.65rem] text-red-500 font-bold ml-1">{errors.quantity}</p>}
          </div>
 
          <button 
            type="button"
            onClick={addToCart}
            className="w-full bg-sky-50 text-sky-600 font-bold py-3 rounded-lg hover:bg-sky-100 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add to Sale
          </button>
        </div>
      </div>
 
      <div className="w-full md:w-[350px] bg-slate-900 text-white rounded-lg p-6 shadow-xl flex flex-col">
        <div className="flex items-center gap-2 mb-6 text-sky-400">
          <ShoppingCart className="w-5 h-5" />
          <h4 className="font-bold uppercase tracking-widest text-[0.8rem]">Current Order</h4>
        </div>
 
        <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] mb-6 scrollbar-hide">
          {cart.map(item => (
            <div key={item.medicineId} className="flex justify-between items-center border-b border-white/10 pb-3 group gap-2 text-left">
              <div className="flex-1 min-w-0 pr-1">
                <p className="text-[0.85rem] font-bold text-slate-200 truncate">{item.medicineName}</p>
                <div className="flex items-center gap-1.5 mt-1 bg-slate-800/60 rounded px-1.5 py-0.5 w-max border border-slate-700/50">
                  <button 
                    type="button"
                    onClick={() => updateCartQuantity(item.medicineId, item.quantity - 1)}
                    className="w-4 h-4 text-xs font-bold hover:text-sky-400 focus:outline-none flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-350 cursor-pointer"
                    title="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-[0.72rem] font-mono font-bold text-slate-200 select-none min-w-[14px] text-center">{item.quantity}</span>
                  <button 
                    type="button"
                    onClick={() => updateCartQuantity(item.medicineId, item.quantity + 1)}
                    className="w-4 h-4 text-xs font-bold hover:text-sky-400 focus:outline-none flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-350 cursor-pointer"
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[0.85rem] font-bold text-white leading-none">{currency}{(item.quantity * item.price).toFixed(2)}</p>
                <span className="text-[0.62rem] text-slate-400 block mt-0.5">{item.quantity} x {currency}{item.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.medicineId)} className="text-[0.65rem] text-rose-400 uppercase font-black hover:text-rose-305 opacity-0 group-hover:opacity-100 transition-opacity ml-auto block mt-1 cursor-pointer">Remove</button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <EmptyState type="cart" />
          )}
        </div>
 
        <div className="space-y-4 border-t border-white/20 pt-6">
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-slate-400 text-sm uppercase tracking-widest">Total</span>
            <span className="text-emerald-400 tracking-tight">{currency}{cartTotal.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleFinalize}
            disabled={cart.length === 0}
            className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${cart.length > 0 ? 'bg-sky-500 hover:bg-sky-400 text-white cursor-pointer shadow-md' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
          >
            Finalize <Check className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* -------------------- BRAND DIALOGS & OVERLAYS -------------------- */}
      <AnimatePresence>
        {/* ADD MEDICINE CATALOGUE DIALOG */}
        {showCatAddModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2 font-bold text-sky-700">
                  <Plus className="w-5 h-5" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Add Item to Catalogue</h4>
                </div>
                <button 
                  onClick={() => setShowCatAddModal(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCatAddSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 text-slate-705">
                <div className="space-y-1.5 text-left">
                  <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Medicine Name</label>
                  <input
                    type="text"
                    required
                    className={`w-full px-3 py-2 bg-slate-50 border ${catErrors.name ? 'border-red-400' : 'border-slate-250/70'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none`}
                    value={catFormData.name}
                    onChange={e => setCatFormData({ ...catFormData, name: e.target.value })}
                    placeholder="e.g. Lipitor 20mg"
                  />
                  {catErrors.name && <p className="text-[0.6rem] text-red-500 font-bold">{catErrors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Category</label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-250/70 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none cursor-pointer"
                      value={catFormData.category}
                      onChange={e => setCatFormData({ ...catFormData, category: e.target.value })}
                    >
                      <option value="Antibiotics">Antibiotics</option>
                      <option value="Analgesics">Analgesics</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Antivirals">Antivirals</option>
                      <option value="Pain Relief">Pain Relief</option>
                      <option value="Vitamins">Vitamins</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">W/S Price ({currency})</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-250/70 rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none"
                      value={catFormData.price}
                      onChange={e => setCatFormData({ ...catFormData, price: Number(e.target.value) })}
                    />
                    {catErrors.price && <p className="text-[0.6rem] text-red-500 font-bold">{catErrors.price}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Quantity In Stock</label>
                    <input
                      type="number"
                      min="0"
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-250/70 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none"
                      value={catFormData.quantity}
                      onChange={e => setCatFormData({ ...catFormData, quantity: Number(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Expiry Date</label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-250/70 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none"
                      value={catFormData.expiryDate}
                      onChange={e => setCatFormData({ ...catFormData, expiryDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-2.5 pt-3 border-t border-slate-100">
                  <button
                    type="submit"
                    className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-3 rounded text-[0.7rem] uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Add to Register
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCatAddModal(false)}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-500 rounded text-[0.7rem] font-bold uppercase tracking-wider hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* EDIT MEDICINE CATALOGUE DIALOG */}
        {showCatEditModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2 font-bold text-amber-700">
                  <Edit2 className="w-5 h-5 text-amber-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-805">Modify Catalogue Record</h4>
                </div>
                <button 
                  onClick={() => setShowCatEditModal(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCatEditSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 text-slate-705">
                <div className="space-y-1.5 text-left">
                  <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">ID/SKU Code</label>
                  <input
                    type="text"
                    disabled
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-md text-xs font-mono font-bold text-slate-500 outline-none"
                    value={catFormData.id}
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Medicine Name</label>
                  <input
                    type="text"
                    required
                    className={`w-full px-3 py-2 bg-slate-50 border ${catErrors.name ? 'border-red-400' : 'border-slate-250/70'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none`}
                    value={catFormData.name}
                    onChange={e => setCatFormData({ ...catFormData, name: e.target.value })}
                  />
                  {catErrors.name && <p className="text-[0.6rem] text-red-500 font-bold">{catErrors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Category</label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-230 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none cursor-pointer"
                      value={catFormData.category}
                      onChange={e => setCatFormData({ ...catFormData, category: e.target.value })}
                    >
                      <option value="Antibiotics">Antibiotics</option>
                      <option value="Analgesics">Analgesics</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Antivirals">Antivirals</option>
                      <option value="Pain Relief">Pain Relief</option>
                      <option value="Vitamins">Vitamins</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Price ({currency})</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-250/70 rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none"
                      value={catFormData.price}
                      onChange={e => setCatFormData({ ...catFormData, price: Number(e.target.value) })}
                    />
                    {catErrors.price && <p className="text-[0.6rem] text-red-500 font-bold">{catErrors.price}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Quantity In Stock</label>
                    <input
                      type="number"
                      min="0"
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-250/70 rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none"
                      value={catFormData.quantity}
                      onChange={e => setCatFormData({ ...catFormData, quantity: Number(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Expiry Date</label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-255 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none"
                      value={catFormData.expiryDate}
                      onChange={e => setCatFormData({ ...catFormData, expiryDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-2.5 pt-3 border-t border-slate-100">
                  <button
                    type="submit"
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-3 rounded text-[0.7rem] uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCatEditModal(false)}
                    className="px-4 py-2 bg-slate-50 border border-slate-205 text-slate-500 rounded text-[0.7rem] font-bold uppercase tracking-wider hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* CATALOGUE ITEM DELETE PERMANENT CONFIRM */}
        {showCatDeleteConfirm && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl border border-rose-100 p-5 max-w-sm w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-2.5 text-rose-600">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Delete Catalogue Item?</h3>
              </div>
              
              <p className="text-[11px] text-slate-500 leading-relaxed text-left">
                Are you sure you want to permanently delete <strong className="text-slate-800">"{medicines.find(m => m.id === saleData.medicineId)?.name}"</strong> from the pharmacy catalogue? This item will also be removed from your current pending sale.
              </p>
              
              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  className="flex-1 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold py-2 px-3 rounded text-[0.7rem] uppercase tracking-wider transition-all cursor-pointer border border-transparent"
                  onClick={handleCatDelete}
                >
                  Delete Item
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 rounded text-[0.7rem] font-bold uppercase tracking-wider transition-all cursor-pointer"
                  onClick={() => setShowCatDeleteConfirm(false)}
                >
                  Keep Item
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const getSupplierMetrics = (supplierId: string, adjustments: StockAdjustment[] = []) => {
  const restocks = adjustments.filter(a => a.type === 'restock' && a.supplierId === supplierId);
  
  if (restocks.length === 0) {
    const defaultScores: Record<string, number> = {
      'sup-1': 92,
      'sup-2': 96,
      'sup-3': 84
    };
    return {
      avgDeliveryDays: null,
      onTimeRate: null,
      score: defaultScores[supplierId] || 100, // baseline for pristine starts
      ratingLabel: 'Highly Reliable',
      totalDeliveries: 0
    };
  }
  
  const totalDeliveries = restocks.length;
  let sumDeliveryDays = 0;
  let onTimeCount = 0;
  let validDeliveryCount = 0;
  
  restocks.forEach(r => {
    if (r.deliveryDays !== undefined) {
      sumDeliveryDays += r.deliveryDays;
      validDeliveryCount++;
    }
    if (r.isLate === false) {
      onTimeCount++;
    }
  });
  
  const avgDeliveryDays = validDeliveryCount > 0 ? (sumDeliveryDays / validDeliveryCount) : 2.5;
  const onTimeRate = (onTimeCount / totalDeliveries) * 100;
  
  // Speed component: if delivery <= 2 days, full speed points (50/50). If more, lose 5 pts per day.
  const speedScore = Math.max(20, 50 - Math.max(0, avgDeliveryDays - 2) * 5);
  // Reliability component: onTimeRate% of 50 points
  const relScore = (onTimeRate / 100) * 50;
  const score = Math.round(speedScore + relScore);
  
  let ratingLabel = 'Excellent';
  if (score < 60) ratingLabel = 'Critical Concern';
  else if (score < 80) ratingLabel = 'Needs Improvement';
  else if (score < 90) ratingLabel = 'Good';

  return {
    avgDeliveryDays,
    onTimeRate,
    score,
    ratingLabel,
    totalDeliveries
  };
};

const formatLastActivity = (dateStr?: string) => {
  if (!dateStr) return { label: 'Never Active', isInactive: true, color: 'text-rose-600 bg-rose-50 border-rose-100' };
  const d = new Date(dateStr);
  const today = new Date();
  const diffTime = today.getTime() - d.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (isNaN(diffDays)) {
    return { label: 'Never Active', isInactive: true, color: 'text-rose-600 bg-rose-50 border-rose-100' };
  }
  
  const formattedDate = d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  
  if (diffDays === 0) return { label: `Active Today`, isInactive: false, color: 'text-emerald-700 bg-emerald-50 border-emerald-100' };
  if (diffDays === 1) return { label: `Active Yesterday`, isInactive: false, color: 'text-emerald-700 bg-emerald-50 border-emerald-100' };
  if (diffDays <= 7) return { label: `Active ${diffDays}d ago`, isInactive: false, color: 'text-sky-700 bg-sky-50 border-sky-100' };
  
  return { 
    label: `Inactive (${diffDays}d ago - ${formattedDate})`, 
    isInactive: true, 
    color: 'text-amber-700 bg-amber-50 border-amber-250' 
  };
};

const SuppliersView = ({ suppliers, actions, adjustments = [], medicines = [] }: { suppliers: Supplier[], actions: any, adjustments?: StockAdjustment[], medicines?: Medicine[] }) => {
  const [activeTab, setActiveTab] = useState<'profiles' | 'contacts_reorder'>('profiles');
  const [formData, setFormData] = useState({ name: '', contact: '', category: 'Wholesale', phone: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Supplier | null>(null);
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name_asc' | 'name_desc' | 'performance_desc' | 'category'>('name_asc');
  
  // Reorder tab state variables
  const [reorderSearch, setReorderSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [reorderQuantities, setReorderQuantities] = useState<Record<string, number>>({});
  const [reorderSuppliers, setReorderSuppliers] = useState<Record<string, string>>({});
  const [successLogs, setSuccessLogs] = useState<Record<string, boolean>>({});

  const lowStockMedicines = useMemo(() => {
    return medicines.filter(m => m.quantity < 10);
  }, [medicines]);

  const parseContactDetails = (s: Supplier) => {
    let email = s.email || '';
    let phone = s.phone || '';
    let notes = s.contact || '';

    // Attempt parsing if they look like they hold formatted combo contact details
    if (!email || !phone) {
      const parts = s.contact.split('|');
      parts.forEach(part => {
        const p = part.trim();
        if (p.includes('@')) {
          if (!email) email = p;
        } else if (/^\+?[0-9\s\-()]{7,18}$/.test(p) || p.startsWith('+') || (p.replace(/[-\s()]/g, '').length >= 10 && /^[0-9-\s()]+$/.test(p))) {
          if (!phone) phone = p;
        }
      });
    }

    // High quality fallbacks if empty so no vendor looks completely broken
    if (!email) {
      const cleanName = s.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      email = `orders@${cleanName || 'supplier'}.com`;
    }
    if (!phone) {
      phone = `+1 (555) 019-${s.id.replace(/[^0-9]/g, '') || '4560'}`;
      if (phone.length < 13) {
        phone = '+1 (555) 012-3211';
      }
    }

    return { email, phone, notes };
  };

  const validate = (data: any, isEdit = false) => {
    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = 'Supplier name is required';
    
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        newErrors.email = 'Invalid email address format';
      }
    }
    if (data.phone) {
      const phoneRegex = /^\+?[0-9\s\-()]{7,18}$/;
      if (!phoneRegex.test(data.phone.trim())) {
        newErrors.phone = 'Invalid phone number format';
      }
    }
    
    if (isEdit) {
      setEditErrors(newErrors);
    } else {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(formData)) {
      actions.addSupplier(formData);
      setFormData({ name: '', contact: '', category: 'Wholesale', phone: '', email: '' });
      setErrors({});
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editForm && validate(editForm, true)) {
      actions.updateSupplier(editForm);
      setEditingId(null);
      setEditForm(null);
      setEditErrors({});
    }
  };

  const filteredSuppliers = categoryFilter === 'All' 
    ? suppliers 
    : suppliers.filter(s => s.category === categoryFilter);

  const categories = ['Wholesale', 'Primary', 'Local', 'International'];

  const sortedSuppliers = useMemo(() => {
    let result = [...filteredSuppliers];
    if (sortBy === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name_desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'performance_desc') {
      result.sort((a, b) => {
        const scoreA = getSupplierMetrics(a.id, adjustments).score;
        const scoreB = getSupplierMetrics(b.id, adjustments).score;
        return scoreB - scoreA;
      });
    }
    return result;
  }, [filteredSuppliers, sortBy, adjustments]);

  const groupedSuppliers = useMemo(() => {
    const groups: Record<string, Supplier[]> = {};
    filteredSuppliers.forEach(s => {
      const cat = s.category;
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(s);
    });
    // Alpha sort inside each group
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => a.name.localeCompare(b.name));
    });
    return groups;
  }, [filteredSuppliers]);

  const exportSuppliersToCSV = () => {
    if (filteredSuppliers.length === 0) return;
    
    let csvContent = 'Vendor ID,Name,Category,Phone,Email,Office Notes\n';
    
    filteredSuppliers.forEach(supplier => {
      const parsed = parseContactDetails(supplier);
      const id = supplier.id;
      const nameEscaped = `"${supplier.name.replace(/"/g, '""')}"`;
      const categoryEscaped = `"${supplier.category.replace(/"/g, '""')}"`;
      const phoneEscaped = `"${parsed.phone.replace(/"/g, '""')}"`;
      const emailEscaped = `"${parsed.email.replace(/"/g, '""')}"`;
      const notesEscaped = `"${parsed.notes.replace(/"/g, '""')}"`;
      
      csvContent += `${id},${nameEscaped},${categoryEscaped},${phoneEscaped},${emailEscaped},${notesEscaped}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pharmacy_suppliers_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDirectRestock = (med: Medicine, supplierId: string, quantity: number) => {
    const targetSupplier = suppliers.find(s => s.id === supplierId) || suppliers[0];
    const parsed = parseContactDetails(targetSupplier);
    
    actions.addAdjustment({
      medicineId: med.id,
      type: 'restock',
      quantityDelta: quantity,
      reason: `Direct Restock via supplier contact portal (${parsed.email})`,
      supplierId: supplierId,
      deliveryDays: 2
    });

    const successKey = `${med.id}-${supplierId}`;
    setSuccessLogs(prev => ({ ...prev, [successKey]: true }));
    setTimeout(() => {
      setSuccessLogs(prev => ({ ...prev, [successKey]: false }));
    }, 4000);
  };

  const renderSupplierCard = (s: Supplier) => {
    const parsed = parseContactDetails(s);
    return (
      <motion.div 
        layout
        key={s.id} 
        className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-sky-305 transition-colors flex flex-col group text-left"
      >
        {editingId === s.id ? (
          <form onSubmit={handleUpdate} className="space-y-3 text-left">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Vendor Entity Name</label>
              <input 
                autoFocus
                placeholder="Supplier Name"
                className={`w-full px-2 py-1.5 text-[0.85rem] border ${editErrors.name ? 'border-red-400' : 'border-sky-300'} rounded outline-none ring-1 ring-sky-500/20 bg-slate-50`}
                value={editForm?.name || ''} 
                onChange={e => setEditForm({...editForm!, name: e.target.value})}
              />
              {editErrors.name && <p className="text-[0.6rem] text-red-500 font-bold ml-1 uppercase">{editErrors.name}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Phone Number</label>
                <input 
                  placeholder="e.g. +1-555-0199"
                  className={`w-full px-2 py-1.5 text-[0.82rem] border ${editErrors.phone ? 'border-red-400' : 'border-sky-300'} rounded outline-none ring-1 ring-sky-500/20 bg-slate-50`}
                  value={editForm?.phone || ''} 
                  onChange={e => setEditForm({...editForm!, phone: e.target.value})}
                />
                {editErrors.phone && <p className="text-[0.6rem] text-red-500 font-bold ml-1 uppercase">{editErrors.phone}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                <input 
                  placeholder="e.g. orders@dist.com"
                  className={`w-full px-2 py-1.5 text-[0.82rem] border ${editErrors.email ? 'border-red-400' : 'border-sky-300'} rounded outline-none ring-1 ring-sky-500/20 bg-slate-50`}
                  value={editForm?.email || ''} 
                  onChange={e => setEditForm({...editForm!, email: e.target.value})}
                />
                {editErrors.email && <p className="text-[0.6rem] text-red-500 font-bold ml-1 uppercase">{editErrors.email}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Address / General notes</label>
              <input 
                placeholder="Notes / Office Address"
                className="w-full px-2 py-1.5 text-[0.85rem] border border-sky-303 rounded outline-none ring-1 ring-sky-500/20 bg-slate-50"
                value={editForm?.contact || ''} 
                onChange={e => setEditForm({...editForm!, contact: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Operational Category</label>
              <select 
                className="w-full px-2 py-1.5 text-[0.85rem] border border-sky-303 rounded outline-none ring-1 ring-sky-500/20 bg-slate-50"
                value={editForm?.category || 'Wholesale'} 
                onChange={e => setEditForm({...editForm!, category: e.target.value})}
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button type="submit" className="flex-1 bg-emerald-500 text-white font-extrabold py-1.5 rounded text-[0.7rem] hover:bg-emerald-600 uppercase tracking-tighter w-full cursor-pointer">Save Changes</button>
              <button 
                type="button" 
                onClick={() => { setEditingId(null); setEditErrors({}); }} 
                className="px-3 py-1.5 border border-slate-200 rounded text-[0.7rem] font-bold text-slate-400 uppercase tracking-tighter hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-slate-800 text-[0.95rem] tracking-tight">{s.name}</h4>
              <span className="text-[0.6rem] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">{s.category}</span>
            </div>
            
            {/* Split Phone & Email Directory Block */}
            <div className="mt-3 space-y-1.5 text-left border-t border-slate-50 pt-3">
              <div className="flex items-center justify-between gap-1 group/item">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider shrink-0 w-12 text-left">Phone:</span>
                <a href={`tel:${parsed.phone}`} className="text-[0.75rem] font-mono text-slate-600 hover:text-sky-655 truncate underline decoration-dotted transition-colors flex-1" title="Click to call number">
                  {parsed.phone}
                </a>
                <button 
                  onClick={() => handleCopy(parsed.phone, `${s.id}-phone`)} 
                  className="p-1 rounded hover:bg-slate-105 text-slate-400 hover:text-slate-600 text-[10px] cursor-pointer bg-transparent border-none font-sans"
                  title="Copy Phone to clipboard"
                >
                  {copiedId === `${s.id}-phone` ? <Check className="w-3 h-3 text-emerald-555" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex items-center justify-between gap-1 group/item">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider shrink-0 w-12 text-left">Email:</span>
                <a href={`mailto:${parsed.email}`} className="text-[0.75rem] font-mono text-slate-600 hover:text-sky-655 truncate underline decoration-dotted transition-colors flex-1" title="Click to draft email">
                  {parsed.email}
                </a>
                <button 
                  onClick={() => handleCopy(parsed.email, `${s.id}-email`)} 
                  className="p-1 rounded hover:bg-slate-105 text-slate-400 hover:text-slate-600 text-[10px] cursor-pointer bg-transparent border-none font-sans"
                  title="Copy Email to clipboard"
                >
                  {copiedId === `${s.id}-email` ? <Check className="w-3 h-3 text-emerald-555" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <p className="text-[10px] text-slate-400 truncate italic text-left pb-1" title={parsed.notes}>
                {parsed.notes ? `Location: ${parsed.notes}` : 'No location notes.'}
              </p>
            </div>

            {/* Performance and Activity Indicators */}
            {(() => {
              const act = formatLastActivity(s.lastActivity);
              const m = getSupplierMetrics(s.id, adjustments);
              return (
                <div className="mt-2.5 py-2 border-t border-b border-dashed border-slate-100 space-y-2 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-widest block font-sans">Operational Status</span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-left">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${act.isInactive ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                      <span className={`text-[0.62rem] font-extrabold px-1.5 py-0.5 rounded border leading-none ${act.color}`}>
                        {act.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-left bg-slate-50 border border-slate-100 rounded-lg p-2">
                    <div className="flex justify-between items-center bg-transparent">
                      <span className="text-[0.55rem] font-bold text-slate-455 uppercase tracking-widest block font-sans">Reliability Score</span>
                      <span className={`text-[0.62rem] font-black px-1.5 py-0.5 rounded-full ${
                        m.score >= 90 ? 'text-emerald-700 bg-emerald-50' : m.score >= 75 ? 'text-sky-700 bg-sky-50' : 'text-amber-700 bg-amber-50'
                      }`}>
                        {m.score}%
                      </span>
                    </div>

                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          m.score >= 90 ? 'bg-emerald-500' : m.score >= 75 ? 'bg-sky-505' : 'bg-amber-400'
                        }`}
                        style={{ width: `${m.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}
            
            {(() => {
              const mailtoUrl = `mailto:${parsed.email}?subject=Inquiry%20to%20${encodeURIComponent(s.name)}&body=Dear%20${encodeURIComponent(s.name)}%20Team%2C%0A%0AWe%20are%20reaching%20out%20to%2520inquire%2520about%2520supplier%2520listings%2520and%2520replenishment.%0A%0ABest%20regards%2C%0APharmacy%2520Inventory%2520Management`;
              return (
                <div className="mt-2.5 flex items-center justify-between gap-2 text-left">
                  <a
                    href={mailtoUrl}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[0.68rem] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-150 hover:border-sky-200 rounded-md transition-colors w-full select-none"
                    title="Draft an inquiry template"
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>Quick Email</span>
                  </a>
                  <a
                    href={`tel:${parsed.phone}`}
                    className="inline-flex items-center justify-center p-1.5 text-[0.68rem] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors select-none"
                    title="Call supplier phone"
                  >
                    <Phone className="w-4 h-4 text-slate-500" />
                  </a>
                </div>
              );
            })()}
            <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[0.65rem] font-bold text-emerald-600 flex items-center gap-1 uppercase tracking-tighter"><Check className="w-3 h-3" /> Accredited</span>
              <button 
                type="button"
                onClick={() => {
                  setEditingId(s.id);
                  setEditForm({
                    ...s,
                    phone: parsed.phone,
                    email: parsed.email
                  });
                }}
                className="text-[0.7rem] font-bold text-slate-400 hover:text-sky-600 uppercase flex items-center gap-1 transition-colors cursor-pointer"
              >
                Edit Vendor <Edit2 className="w-3 h-3" />
              </button>
            </div>
          </>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
       <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-[0.8rem] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1">New Supplier Entry</h3>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-start">
          <div className="flex-1 min-w-[200px] space-y-1">
            <input 
              type="text" placeholder="Vendor Entity Name" 
              className={`w-full px-3 py-2 bg-slate-50 border ${errors.name ? 'border-red-400' : 'border-slate-200'} rounded-md text-[0.85rem] focus:ring-1 ring-sky-500 transition-all outline-none`}
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <p className="text-[0.6rem] text-red-500 font-bold ml-1 uppercase tracking-tighter">{errors.name}</p>}
          </div>
          <div className="flex-1 min-w-[200px] space-y-1">
            <input 
              type="text" placeholder="Access / Contact Details (Email or Phone)" 
              className={`w-full px-3 py-2 bg-slate-50 border ${errors.contact ? 'border-red-400' : 'border-slate-200'} rounded-md text-[0.85rem] focus:ring-1 ring-sky-500 transition-all outline-none`}
              value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})}
            />
            {errors.contact && <p className="text-[0.6rem] text-red-500 font-bold ml-1 uppercase tracking-tighter">{errors.contact}</p>}
          </div>
          <div className="min-w-[150px]">
            <select 
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-[0.85rem] focus:ring-1 ring-sky-500 outline-none"
              value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
            >
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" className="bg-sky-600 text-white font-bold px-6 py-2 rounded-md text-[0.85rem] hover:bg-sky-700 transition-colors shadow-sm">Authorize Vendor</button>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter block */}
          <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-[0.65rem] font-extrabold text-slate-450 uppercase tracking-widest px-1 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" /> Filter:
            </span>
            <div className="flex gap-1">
              {['All', ...categories].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded text-[0.7rem] font-bold uppercase transition-all ${categoryFilter === cat ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-450 hover:text-slate-600 hover:bg-slate-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort segment buttons */}
          <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-[0.65rem] font-extrabold text-slate-450 uppercase tracking-widest px-1">
              Sort & Group:
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setSortBy('name_asc')}
                className={`px-3 py-1 rounded text-[0.7rem] font-bold uppercase transition-all ${sortBy === 'name_asc' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-450 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                Name (A-Z)
              </button>
              <button
                type="button"
                onClick={() => setSortBy('name_desc')}
                className={`px-3 py-1 rounded text-[0.7rem] font-bold uppercase transition-all ${sortBy === 'name_desc' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-450 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                Name (Z-A)
              </button>
              <button
                type="button"
                onClick={() => setSortBy('performance_desc')}
                className={`px-3 py-1 rounded text-[0.7rem] font-bold uppercase transition-all ${sortBy === 'performance_desc' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-450 hover:text-emerald-700 hover:bg-emerald-50/50'}`}
                title="Sort vendors prioritizing reliability scoring"
              >
                Performance Score
              </button>
              <button
                type="button"
                onClick={() => setSortBy('category')}
                className={`px-3 py-1 rounded text-[0.7rem] font-bold uppercase transition-all ${sortBy === 'category' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-450 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                Category Grouping
              </button>
            </div>
          </div>
        </div>

        <button 
          type="button"
          onClick={exportSuppliersToCSV}
          disabled={filteredSuppliers.length === 0}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 ${
            filteredSuppliers.length > 0
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 cursor-pointer shadow-sm'
              : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
          }`}
        >
          <Download className="w-3.5 h-3.5" /> Export Suppliers CSV
        </button>
      </div>

      {sortBy === 'category' ? (
        <div className="space-y-8">
          {(Object.entries(groupedSuppliers) as [string, Supplier[]][]).map(([groupName, items]) => {
            if (items.length === 0) return null;
            return (
              <div key={groupName} className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-150 pb-2 ml-1">
                   <span className="text-xs font-extrabold uppercase tracking-wide text-slate-500">{groupName} Vendors</span>
                   <span className="px-2 py-0.5 bg-sky-50 text-sky-600 rounded-full text-[0.65rem] font-black">{items.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {items.map(s => renderSupplierCard(s))}
                </div>
              </div>
            );
          })}
          {filteredSuppliers.length === 0 && (
            <div className="px-4 py-10 text-center text-slate-400 italic font-semibold">No suppliers fitting search filter.</div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedSuppliers.map(s => renderSupplierCard(s))}
          {sortedSuppliers.length === 0 && (
            <div className="col-span-full px-4 py-10 text-center text-slate-400 italic font-semibold">No suppliers fitting search filter.</div>
          )}
        </div>
      )}
    </div>
  );
};

const ReportsView = ({ sales, currency, isDarkMode = false }: { sales: Sale[], currency: string, isDarkMode?: boolean }) => {
  const [range, setRange] = useState<'all' | '7d' | '30d' | 'custom'>('all');
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSaleForDetails, setSelectedSaleForDetails] = useState<Sale | null>(null);

  const compiledSalesTrendData = useMemo(() => {
    const now = new Date();
    
    // Helper to format date label
    const formatDateLabel = (date: Date) => {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };

    let startDate = new Date();
    let endDate = new Date();
    let isDailyLookup = true;

    if (range === '7d') {
      startDate.setDate(now.getDate() - 6);
    } else if (range === '30d') {
      startDate.setDate(now.getDate() - 29);
    } else if (range === 'custom') {
      if (customRange.start && customRange.end) {
        startDate = new Date(customRange.start);
        endDate = new Date(customRange.end);
      } else {
        // Fallback to last 30 days if custom range is incomplete
        startDate.setDate(now.getDate() - 29);
      }
    } else { // 'all' range option
      if (sales.length > 0) {
        // Find min and max date among all sales
        const dates = sales.map(s => new Date(s.date).getTime());
        const minTime = Math.min(...dates);
        const maxTime = Math.max(...dates);
        startDate = new Date(minTime);
        endDate = new Date(maxTime);
        
        // If the span between oldest and newest is large, group by Month instead of Day
        const spanDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        if (spanDays > 60) {
          isDailyLookup = false;
        }
      } else {
        startDate.setDate(now.getDate() - 29);
      }
    }

    // Set boundaries: start of startDate day, end of endDate day
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    if (isDailyLookup) {
      // Generate individual day buckets
      const dataArr: { day: string; revenue: number; transactions: number; dateKey: string }[] = [];
      const tempDate = new Date(startDate);
      while (tempDate <= endDate) {
        const dateKey = tempDate.toISOString().split('T')[0];
        dataArr.push({
          day: formatDateLabel(new Date(tempDate)),
          revenue: 0,
          transactions: 0,
          dateKey
        });
        tempDate.setDate(tempDate.getDate() + 1);
      }

      sales.forEach(s => {
        const sDate = new Date(s.date);
        const sDateStr = sDate.toISOString().split('T')[0];
        const bucket = dataArr.find(d => d.dateKey === sDateStr);
        if (bucket) {
          bucket.revenue += s.total;
          bucket.transactions += 1;
        }
      });

      return dataArr;
    } else {
      // Large range span -> Group by Month-Year
      const dataMap: Record<string, { label: string; revenue: number; transactions: number; orderKey: string }> = {};
      const tempDate = new Date(startDate);
      
      while (tempDate <= endDate) {
        const monthYearKey = `${tempDate.getFullYear()}-${String(tempDate.getMonth() + 1).padStart(2, '0')}`;
        const label = tempDate.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
        if (!dataMap[monthYearKey]) {
          dataMap[monthYearKey] = {
            label,
            revenue: 0,
            transactions: 0,
            orderKey: monthYearKey
          };
        }
        // Move to next month
        tempDate.setMonth(tempDate.getMonth() + 1);
      }

      sales.forEach(s => {
        const sDate = new Date(s.date);
        if (sDate >= startDate && sDate <= endDate) {
          const monthYearKey = `${sDate.getFullYear()}-${String(sDate.getMonth() + 1).padStart(2, '0')}`;
          if (!dataMap[monthYearKey]) {
            const label = sDate.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
            dataMap[monthYearKey] = {
              label,
              revenue: 0,
              transactions: 0,
              orderKey: monthYearKey
            };
          }
          dataMap[monthYearKey].revenue += s.total;
          dataMap[monthYearKey].transactions += 1;
        }
      });

      return Object.values(dataMap)
        .sort((a, b) => a.orderKey.localeCompare(b.orderKey))
        .map(item => ({
          day: item.label,
          revenue: item.revenue,
          transactions: item.transactions
        }));
    }
  }, [sales, range, customRange]);

  const chartTitle = useMemo(() => {
    if (range === '7d') return 'Daily Sales Revenue (Last 7 Days)';
    if (range === '30d') return 'Daily Sales Revenue (Last 30 Days)';
    if (range === 'custom') {
      if (customRange.start && customRange.end) {
        return `Sales Revenue Trend (${new Date(customRange.start).toLocaleDateString()} - ${new Date(customRange.end).toLocaleDateString()})`;
      }
      return 'Sales Revenue Trend (Custom Range)';
    }
    return 'Executive Sales Revenue Trend (Entire History)';
  }, [range, customRange]);

  const filteredSales = useMemo(() => {
    const now = new Date();
    if (range === 'all') return sales;
    if (range === '7d') {
      const limit = new Date();
      limit.setDate(now.getDate() - 7);
      return sales.filter(s => new Date(s.date) >= limit);
    }
    if (range === '30d') {
      const limit = new Date();
      limit.setDate(now.getDate() - 30);
      return sales.filter(s => new Date(s.date) >= limit);
    }
    if (range === 'custom' && customRange.start && customRange.end) {
      const start = new Date(customRange.start);
      const end = new Date(customRange.end);
      end.setHours(23, 59, 59, 999);
      return sales.filter(s => {
        const date = new Date(s.date);
        return date >= start && date <= end;
      });
    }
    return sales;
  }, [sales, range, customRange]);

  const finalFilteredSales = useMemo(() => {
    let result = filteredSales;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(s => {
        const matchId = s.id.toLowerCase().includes(q);
        const matchTotal = s.total.toFixed(2).includes(q) || s.total.toString().includes(q);
        const matchItems = s.items?.some(item => item.medicineName.toLowerCase().includes(q)) || 
                           (s as any).medicineName?.toLowerCase().includes(q);
                           
        return matchId || matchTotal || matchItems;
      });
    }
    
    return result;
  }, [filteredSales, searchQuery]);

  const exportToCSV = () => {
    if (finalFilteredSales.length === 0) return;
    
    let csvContent = 'Transaction ID,Date,Items,Total Revenue\n';
    
    finalFilteredSales.forEach(sale => {
      const id = sale.id;
      const date = new Date(sale.date).toLocaleString().replace(/,/g, '');
      const itemBreakdown = sale.items 
        ? sale.items.map(item => `${item.medicineName} (x${item.quantity})`).join(' | ')
        : `${(sale as any).medicineName} (x ${(sale as any).quantity})`;
      const itemsEscaped = `"${itemBreakdown}"`;
      const totalStr = sale.total.toFixed(2);
      
      csvContent += `${id},${date},${itemsEscaped},${totalStr}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pharmacy_sales_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 font-sans relative">
      <div className={selectedSaleForDetails ? "no-print space-y-5" : "space-y-5"}>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 no-print">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-wider">Date Segment</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {(['all', '7d', '30d', 'custom'] as const).map(r => (
              <button 
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-md text-[0.75rem] font-bold uppercase transition-all ${range === r ? 'bg-sky-600 text-white shadow-sm' : 'bg-slate-50 text-slate-400 hover:text-slate-600'}`}
              >
                {r === 'all' ? 'Entire History' : r === '7d' ? 'Last 7 Days' : r === '30d' ? 'Last 30 Days' : 'Custom Range'}
              </button>
            ))}
          </div>
          {range === 'custom' && (
            <div className="flex gap-2 items-center text-[0.8rem] font-medium border-l border-slate-100 pl-4">
              <input type="date" className="bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none focus:ring-1 ring-sky-500 text-xs" value={customRange.start} onChange={e => setCustomRange({...customRange, start: e.target.value})} />
              <span className="text-slate-300">to</span>
              <input type="date" className="bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none focus:ring-1 ring-sky-500 text-xs" value={customRange.end} onChange={e => setCustomRange({...customRange, end: e.target.value})} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="relative flex items-center flex-1 lg:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Query logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-18 py-2 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-sky-500 rounded-lg text-xs font-semibold outline-none transition-all"
            />
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                  title="Clear Query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <VoiceSearchButton 
                onTranscript={(text) => {
                  const cleaned = text.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
                  setSearchQuery(cleaned);
                }}
                tooltipAlign="left"
              />
            </div>
          </div>
          
          <button 
            type="button"
            onClick={() => window.print()}
            disabled={finalFilteredSales.length === 0}
            className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 ${
              finalFilteredSales.length > 0
                ? 'bg-sky-650 text-sky-700 border-sky-200 hover:bg-sky-100 cursor-pointer shadow-xs'
                : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
            }`}
            title="Generate and print a professional, clean paper summary of the sales table"
          >
            <Printer className="w-3.5 h-3.5 text-sky-600" /> Print Summary
          </button>

          <button 
            type="button"
            onClick={exportToCSV}
            disabled={finalFilteredSales.length === 0}
            className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 ${
              finalFilteredSales.length > 0
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 cursor-pointer'
                : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
            }`}
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* Recharts Monthly Sales Bar Chart (Hidden on Print) */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col no-print">
        <div className="mb-4">
          <span className="font-bold text-[0.85rem] text-slate-800 uppercase tracking-wider block">{chartTitle}</span>
          <p className="text-[0.65rem] text-slate-400">Total transaction gross values day-by-day</p>
        </div>
        
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={compiledSalesTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
              <XAxis 
                dataKey="day" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 9, fontWeight: 550 }} 
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 9, fontWeight: 550 }}
                tickFormatter={(value) => `${currency}${value}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '6px', border: 'none', color: '#fff' }}
                labelStyle={{ fontWeight: 'bold', fontSize: '10px', color: '#38bdf8' }}
                itemStyle={{ fontSize: '11px', color: '#fff', padding: '0px' }}
                formatter={(value) => [`${currency}${parseFloat(String(value)).toFixed(2)}`, 'Sales Gross']}
              />
              <Bar 
                dataKey="revenue" 
                fill="#0ea5e9" 
                radius={[3, 3, 0, 0]}
                maxBarSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {finalFilteredSales.length === 0 ? (
        <EmptyState type="reports" />
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto p-4 print:border-none print:shadow-none">
          {/* Printable-only header layout */}
          <div className="hidden print:block border-b-2 border-slate-800 pb-4 mb-5 text-left">
            <h1 className="text-xl font-bold uppercase tracking-wider text-slate-900">Rx Pharmacy Executive Sales Summary</h1>
            <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500 font-mono">
              <span>Date Generated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</span>
              <span>Filter: Date Range: {range === 'all' ? 'Entire History' : range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Custom'}</span>
              <span>Total volume: {finalFilteredSales.length} Transactions</span>
            </div>
          </div>

          <table className="w-full text-left text-[0.8rem]">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[0.7rem] tracking-widest border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Txn Register Key</th>
                <th className="px-4 py-3">Breakdown</th>
                <th className="px-4 py-3">Net Value</th>
                <th className="px-4 py-3">Settlement Date</th>
                <th className="px-4 py-3 text-right no-print">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {finalFilteredSales.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-slate-400 uppercase tracking-tighter">#{s.id.slice(0, 12)}</td>
                  <td className="px-4 py-2.5">
                    <div className="space-y-1">
                      {s.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 text-[0.85rem]">{item.medicineName}</span>
                          <span className="text-[0.75rem] text-slate-400">x{item.quantity}</span>
                        </div>
                      ))}
                      {!s.items && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 text-[0.85rem]">{(s as any).medicineName}</span>
                          <span className="text-[0.75rem] text-slate-400">x{(s as any).quantity}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-bold text-slate-900">{currency}{s.total.toFixed(2)}</td>
                  <td className="px-4 py-2.5 text-slate-500 text-[0.75rem]">
                    {new Date(s.date).toLocaleDateString()} at {new Date(s.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-2.5 text-right no-print">
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedSaleForDetails(s)}
                        className={`p-1.5 px-3 rounded text-[0.68rem] font-bold uppercase tracking-wide transition-all select-none cursor-pointer inline-flex items-center gap-1.5 shrink-0 shadow-xs ${
                          isDarkMode 
                            ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' 
                            : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200/50'
                        }`}
                        title="View detailed transaction receipt"
                      >
                        <Search className="w-3 h-3 text-sky-600" /> Details
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const receiptItems = s.items?.map(it => ({
                            medicineName: it.medicineName,
                            quantity: it.quantity,
                            price: it.price
                          })) || [
                            {
                              medicineName: (s as any).medicineName || 'Unknown Medicine',
                              quantity: (s as any).quantity || 1,
                              price: (s as any).price || s.total
                            }
                          ];
                          printReceiptInIframe(receiptItems, s.total, currency, s.date, s.id);
                        }}
                        className={`p-1.5 px-3 rounded text-[0.68rem] font-black uppercase tracking-wide transition-all select-none cursor-pointer inline-flex items-center gap-1.5 shrink-0 shadow-xs ${
                          isDarkMode 
                            ? 'bg-emerald-950/45 text-emerald-400 hover:bg-emerald-900/40 border border-emerald-900/30' 
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/50'
                        }`}
                        title="Print individual transaction receipt"
                      >
                        <Printer className="w-3.5 h-3.5 text-emerald-600" /> Quick Print
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>

      {/* Receipt Details Modal */}
      <AnimatePresence>
        {selectedSaleForDetails && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 print:absolute print:inset-0 print:bg-white print:p-0 print:block print:z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-md w-full overflow-hidden flex flex-col max-h-[90vh] print:max-h-none print:h-auto print:w-full print:max-w-none print:border-none print:shadow-none print:bg-white text-left"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 no-print">
                <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 font-bold">
                  <Printer className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Sales Transaction Receipt</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSaleForDetails(null)}
                  className="p-1 rounded-full hover:bg-slate-250/70 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto flex-1 print:p-0 print:overflow-visible text-slate-705 dark:text-slate-300 print:text-black">
                {/* Logo and Receipt Title */}
                <div className="text-center pb-4 border-b border-dashed border-slate-250 dark:border-slate-800 print:border-slate-300">
                  <h2 className="text-xl font-extrabold uppercase tracking-widest text-slate-900 dark:text-white print:text-black select-none">
                    Pharma.MVP
                  </h2>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 print:text-slate-600 font-mono mt-1">
                    EXECUTIVE SALES REGISTER
                  </p>
                </div>

                {/* Receipt Metadata */}
                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-650 dark:text-slate-300 print:text-black text-left">
                  <div className="space-y-1 block text-left">
                    <span className="text-[10px] text-slate-450 dark:text-slate-500 print:text-slate-600 uppercase font-bold tracking-wider block">ID Key</span>
                    <span className="font-bold select-all uppercase text-[10px]">#{selectedSaleForDetails.id}</span>
                  </div>
                  <div className="space-y-1 block text-left">
                    <span className="text-[10px] text-slate-450 dark:text-slate-500 print:text-slate-600 uppercase font-bold tracking-wider block">Timestamp</span>
                    <span>
                      {new Date(selectedSaleForDetails.date).toLocaleDateString()}{' '}
                      {new Date(selectedSaleForDetails.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Itemized Table */}
                <div className="space-y-2 text-left">
                  <span className="text-[10px] text-slate-450 dark:text-slate-500 print:text-slate-600 uppercase font-bold tracking-wider block">Items Purchased</span>
                  
                  <table className="w-full text-xs font-mono border-collapse print:border-none">
                    <thead>
                      <tr className="border-b border-slate-150 dark:border-slate-800 print:border-black text-slate-400 dark:text-slate-500 print:text-slate-600 uppercase">
                        <th className="py-2 font-bold text-left bg-transparent border-none!">Product Name</th>
                        <th className="py-2 font-bold text-center bg-transparent border-none!">Qty</th>
                        <th className="py-2 font-bold text-right bg-transparent border-none!">Unit</th>
                        <th className="py-2 font-bold text-right bg-transparent border-none!">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dashed divide-slate-150 dark:divide-slate-800/80 print:divide-slate-300">
                      {selectedSaleForDetails.items?.map((item, idx) => (
                        <tr key={idx} className="text-slate-800 dark:text-slate-200 print:text-black">
                          <td className="py-2.5 font-bold text-left">{item.medicineName}</td>
                          <td className="py-2.5 text-center">{item.quantity}</td>
                          <td className="py-2.5 text-right">{currency}{item.price.toFixed(2)}</td>
                          <td className="py-2.5 text-right font-bold">{currency}{(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      )) || (
                        <tr className="text-slate-850 dark:text-slate-200 print:text-black">
                          <td className="py-2.5 font-bold text-left">{(selectedSaleForDetails as any).medicineName || 'Unknown Product'}</td>
                          <td className="py-2.5 text-center">{(selectedSaleForDetails as any).quantity || 1}</td>
                          <td className="py-2.5 text-right">{currency}{((selectedSaleForDetails as any).price || selectedSaleForDetails.total).toFixed(2)}</td>
                          <td className="py-2.5 text-right font-bold">{currency}{selectedSaleForDetails.total.toFixed(2)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Total Section */}
                <div className="pt-4 border-t border-dashed border-slate-250 dark:border-slate-800 print:border-slate-350 flex justify-between items-center text-slate-900 dark:text-white print:text-black text-left">
                  <div>
                    <span className="text-[10px] text-slate-450 dark:text-slate-500 print:text-slate-600 uppercase font-bold tracking-wider block">Settlement status</span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 print:text-black uppercase tracking-wide mt-0.5">
                      PAID • COMPLETED
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-450 dark:text-slate-500 print:text-slate-600 uppercase font-bold tracking-wider block">Total Paid</span>
                    <span className="text-lg font-black text-emerald-650 dark:text-emerald-400 print:text-black tracking-tight">{currency}{selectedSaleForDetails.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="hidden print:block text-center text-[10px] text-slate-400 border-t border-dashed border-slate-300 pt-5 mt-6 font-mono">
                  Thank you for trusting Pharma.MVP.<br/>
                  Receipt generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 flex gap-3 border-t border-slate-100 dark:border-slate-800 justify-end no-print">
                <button
                  type="button"
                  onClick={() => setSelectedSaleForDetails(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow-sm cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Receipt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UsersManagementView = ({ users, actions }: { users: User[], actions: any }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Front Desk' as 'Front Desk' | 'Admin' | 'Pharmacist',
    username: '',
    phone: '',
    status: 'Active' as 'Active' | 'Inactive',
    shift: 'Morning' as 'Morning' | 'Afternoon' | 'Night',
    assignedRegister: 'Register #1',
    activeAtFrontDesk: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredUsers = useMemo(() => {
    return users.filter(usr => 
      usr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usr.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usr.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usr.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.username.trim()) errs.username = 'Username is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      role: 'Front Desk',
      username: '',
      phone: '',
      status: 'Active',
      shift: 'Morning',
      assignedRegister: 'Front Counter A',
      activeAtFrontDesk: false
    });
    setErrors({});
    setShowAddModal(true);
  };

  const handleOpenEdit = (usr: User) => {
    setSelectedUser(usr);
    setFormData({
      name: usr.name,
      email: usr.email,
      role: usr.role,
      username: usr.username,
      phone: usr.phone,
      status: usr.status,
      shift: usr.shift,
      assignedRegister: usr.assignedRegister || 'Front Counter A',
      activeAtFrontDesk: usr.activeAtFrontDesk || false
    });
    setErrors({});
    setShowEditModal(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    actions.addUser({
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      username: formData.username.trim().toLowerCase(),
      phone: formData.phone.trim(),
      status: formData.status,
      shift: formData.shift,
      assignedRegister: formData.assignedRegister,
      activeAtFrontDesk: formData.role === 'Front Desk' ? formData.activeAtFrontDesk : false
    });

    setShowAddModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    if (!validate()) return;

    actions.updateUser({
      id: selectedUser.id,
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      username: formData.username.trim().toLowerCase(),
      phone: formData.phone.trim(),
      status: formData.status,
      shift: formData.shift,
      assignedRegister: formData.assignedRegister,
      activeAtFrontDesk: formData.role === 'Front Desk' ? formData.activeAtFrontDesk : false
    });

    setShowEditModal(false);
  };

  const handleTriggerDelete = (usr: User) => {
    setSelectedUser(usr);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedUser) return;
    actions.deleteUser(selectedUser.id);
    setShowDeleteConfirm(false);
    setSelectedUser(null);
  };

  const toggleFrontDeskDuty = (usr: User) => {
    if (usr.role !== 'Front Desk') return;
    actions.setActiveFrontDesk(usr.activeAtFrontDesk ? '' : usr.id);
  };

  const stats = useMemo(() => {
    return {
      total: users.length,
      activeDesk: users.filter(u => u.role === 'Front Desk' && u.activeAtFrontDesk).length,
      frontDeskCount: users.filter(u => u.role === 'Front Desk').length,
      admins: users.filter(u => u.role === 'Admin').length,
    };
  }, [users]);

  // Generate initials for avatar circles
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6 text-left" id="users-view-root">
      {/* Mini Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[0.68rem] text-slate-400 font-bold uppercase tracking-wider block">Total Users</span>
            <span className="text-xl font-bold font-mono text-slate-800">{stats.total}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-center text-slate-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between ring-1 ring-sky-505/10">
          <div>
            <span className="text-[0.68rem] text-slate-400 font-bold uppercase tracking-wider block">On Duty @ Desk</span>
            <span className="text-xl font-extrabold font-mono text-sky-600 flex items-center gap-1.5">
              {stats.activeDesk > 0 ? (
                <>
                  {stats.activeDesk} <span className="w-2 h-2 rounded-full bg-emerald-505 animate-pulse inline-block" />
                </>
              ) : (
                <span className="text-slate-400 text-sm italic">None Assigned</span>
              )}
            </span>
          </div>
          <div className="bg-sky-50 p-2.5 rounded-lg border border-sky-100 flex items-center justify-center text-sky-600">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[0.68rem] text-slate-400 font-bold uppercase tracking-wider block">Front Desk Staff</span>
            <span className="text-xl font-bold font-mono text-slate-800">{stats.frontDeskCount}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-center text-slate-600">
            <UserCheck className="w-5 h-5 text-slate-400" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[0.68rem] text-slate-400 font-bold uppercase tracking-wider block">Administrators</span>
            <span className="text-xl font-bold font-mono text-slate-800">{stats.admins}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-center text-slate-600">
            <Shield className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Toolbar / Actions bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:w-[325px]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search staff by name, username, or role..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-250/70 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 ring-sky-500 transition-all text-slate-700"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setSelectedStaffIds([]); // Clear selection when query changes to prevent confusion
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStaffIds([]);
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs font-bold whitespace-nowrap cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          
          {filteredUsers.length > 0 && (
            <button
              type="button"
              onClick={() => {
                const visibleIds = filteredUsers.map(u => u.id);
                const allSelected = visibleIds.every(id => selectedStaffIds.includes(id));
                if (allSelected) {
                  setSelectedStaffIds(prev => prev.filter(id => !visibleIds.includes(id)));
                } else {
                  setSelectedStaffIds(prev => Array.from(new Set([...prev, ...visibleIds])));
                }
              }}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-250/75 text-slate-605 rounded-lg text-xs font-bold uppercase transition-colors select-none cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 text-slate-405 shrink-0" />
              <span>{filteredUsers.every(u => selectedStaffIds.includes(u.id)) ? 'Deselect All' : 'Select All'}</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="w-full sm:w-auto px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Staff Member
        </button>
      </div>

      {/* Bulk Action Bar of Selected Members */}
      <AnimatePresence>
        {selectedStaffIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-4 bg-sky-50/80 border border-sky-100 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs text-left"
          >
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-sky-600 animate-pulse shrink-0" />
              <p className="text-xs text-slate-700 font-medium">
                Selected <strong className="text-slate-905 font-bold">{selectedStaffIds.length}</strong> staff member{selectedStaffIds.length > 1 ? 's' : ''} for bulk updates.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  actions.updateUsersStatus(selectedStaffIds, 'Active');
                  setSelectedStaffIds([]);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all shadow-xs cursor-pointer flex items-center gap-1"
              >
                Set Active
              </button>
              <button
                type="button"
                onClick={() => {
                  actions.updateUsersStatus(selectedStaffIds, 'Inactive');
                  setSelectedStaffIds([]);
                }}
                className="bg-slate-650 hover:bg-slate-750 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all shadow-xs cursor-pointer flex items-center gap-1"
              >
                Set Inactive
              </button>
              <button
                type="button"
                onClick={() => setSelectedStaffIds([])}
                className="px-2.5 py-1.5 text-slate-450 hover:text-slate-650 text-xs font-bold uppercase cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Staff Members Cards Listing */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-xl p-12 text-center shadow-xs">
          <div className="text-slate-350 flex justify-center mb-3">
            <UserX className="w-12 h-12 stroke-1" />
          </div>
          <h4 className="text-sm font-bold text-slate-700">No Staff Directory Matches</h4>
          <p className="text-xs text-slate-450 mt-1">Try refining your filter or add a brand new user for front desk operations.</p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="mt-4 px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sky-600 hover:text-sky-700 rounded-lg font-bold text-xs uppercase cursor-pointer"
          >
            Create Staff Profile
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((usr: User) => {
            const isFrontDesk = usr.role === 'Front Desk';
            const isOnDuty = isFrontDesk && usr.activeAtFrontDesk;
            
            return (
              <motion.div
                key={usr.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-white rounded-xl border transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
                  isOnDuty 
                    ? 'border-sky-500 shadow-sky-50/50 ring-2 ring-sky-500/10 hover:border-sky-600' 
                    : 'border-slate-200 hover:border-slate-350'
                }`}
              >
                {/* Upper banner highlight if on duty */}
                {isOnDuty && (
                  <div className="bg-sky-500 px-4 py-1 text-white text-[0.62rem] font-black uppercase tracking-widest text-center animate-pulse flex items-center justify-center gap-1 select-none">
                    <UserCheck className="w-3.5 h-3.5" /> Front Desk - On Duty
                  </div>
                )}

                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {/* Individual Checkbox */}
                      <input 
                        type="checkbox"
                        checked={selectedStaffIds.includes(usr.id)}
                        onChange={() => {
                          setSelectedStaffIds(prev => 
                            prev.includes(usr.id) ? prev.filter(id => id !== usr.id) : [...prev, usr.id]
                          );
                        }}
                        className="w-4 h-4 rounded border-slate-300 text-sky-600 bg-slate-50 focus:ring-sky-500 cursor-pointer shrink-0"
                        title="Select staff member for bulk actions"
                      />

                      {/* Avatar initial circle */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border border-transparent select-none ${
                        usr.role === 'Admin' 
                          ? 'bg-rose-50 border-rose-100 text-rose-700' 
                          : usr.role === 'Pharmacist'
                          ? 'bg-teal-50 border-teal-100 text-teal-700' 
                          : 'bg-sky-50 border-sky-100 text-sky-700'
                      }`}>
                        {getInitials(usr.name)}
                      </div>

                      <div className="text-left">
                        <h4 className="text-xs font-bold text-slate-800 leading-snug">{usr.name}</h4>
                        <span className="text-[0.62rem] text-slate-400 font-bold font-mono uppercase tracking-wider block">@{usr.username}</span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[0.62rem] font-bold uppercase select-none tracking-wide ${
                      usr.role === 'Admin' 
                        ? 'bg-rose-50 border border-rose-100 text-rose-700' 
                        : usr.role === 'Pharmacist'
                        ? 'bg-teal-50 border border-teal-100 text-teal-700' 
                        : 'bg-sky-50 border border-sky-100 text-sky-700'
                    }`}>
                      {usr.role}
                    </span>
                  </div>

                  {/* Attributes section */}
                  <div className="space-y-2 text-xs border-y border-slate-100/70 py-3.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold text-[0.65rem] uppercase">Email</span>
                      <span className="text-slate-700 font-bold tracking-tight truncate max-w-[170px]" title={usr.email}>{usr.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold text-[0.65rem] uppercase">Phone</span>
                      <span className="text-slate-700 font-bold tracking-tight font-mono">{usr.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold text-[0.65rem] uppercase">Shift</span>
                      <span className="font-bold flex items-center gap-1 text-[0.7rem] text-slate-700">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          usr.shift === 'Morning' ? 'bg-amber-400' : usr.shift === 'Afternoon' ? 'bg-sky-400' : 'bg-indigo-400'
                        }`} />
                        {usr.shift} Shift
                      </span>
                    </div>
                    {isFrontDesk && (
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-semibold text-[0.65rem] uppercase">Desk Counter</span>
                        <span className="text-slate-700 font-bold">{usr.assignedRegister || 'N/A'}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold text-[0.65rem] uppercase">Status</span>
                      <span className={`px-1.5 py-0.2 rounded text-[0.58rem] font-black uppercase ${
                        usr.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {usr.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer management control action buttons */}
                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2.5">
                  <div>
                    {isFrontDesk ? (
                      <button
                        type="button"
                        onClick={() => toggleFrontDeskDuty(usr)}
                        className={`px-2.5 py-1 text-[0.62rem] font-extrabold uppercase rounded tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                          isOnDuty 
                            ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-150' 
                            : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-150'
                        }`}
                        title={isOnDuty ? "Deactivate from front desk" : "Assign to open front desk duty"}
                      >
                        {isOnDuty ? (
                          <>Stop Duty</>
                        ) : (
                          <>Set Front Desk Duty</>
                        )}
                      </button>
                    ) : (
                      <div className="text-[0.62rem] text-slate-400 font-bold uppercase select-none tracking-widest flex items-center gap-0.5">
                        <Shield className="w-3 h-3 text-slate-400" /> System Control
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(usr)}
                      className="p-1 px-1.5 rounded text-slate-400 hover:text-amber-600 hover:bg-amber-50 border border-transparent hover:border-amber-150 transition-all select-none cursor-pointer"
                      title="Edit Staff Member Account"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTriggerDelete(usr)}
                      className="p-1 px-1.5 rounded text-slate-400 hover:text-rose-650 hover:bg-rose-50 border border-transparent hover:border-rose-150 transition-all select-none cursor-pointer"
                      title="Permanently Expel User Profile"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* -------------------- USER FORM DIALOGS -------------------- */}
      <AnimatePresence>
        {/* ADD PRODUCT/USER RECORD */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2 font-bold text-sky-700">
                  <Users className="w-5 h-5 text-sky-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Add New Staff Operator</h4>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 text-slate-700">
                <div className="space-y-1.5 text-left">
                  <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    required
                    className={`w-full px-3 py-2 bg-slate-50 border ${errors.name ? 'border-red-400 font-bold' : 'border-slate-250/70'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none`}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Helen Carter"
                  />
                  {errors.name && <p className="text-[0.6rem] text-red-500 font-bold">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Username</label>
                    <input
                      type="text"
                      required
                      className={`w-full px-3 py-2 bg-slate-50 border ${errors.username ? 'border-red-400 font-bold' : 'border-slate-250/70'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none`}
                      value={formData.username}
                      onChange={e => setFormData({ ...formData, username: e.target.value })}
                      placeholder="e.g. hcarter"
                    />
                    {errors.username && <p className="text-[0.6rem] text-red-500 font-bold">{errors.username}</p>}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Staff Role</label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-250/70 rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none cursor-pointer"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                    >
                      <option value="Front Desk">Front Desk Operator</option>
                      <option value="Admin">Administrator</option>
                      <option value="Pharmacist">Pharmacist Specialist</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    required
                    className={`w-full px-3 py-2 bg-slate-50 border ${errors.email ? 'border-red-400' : 'border-slate-250/70'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none`}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hcarter@pharmacy.com"
                  />
                  {errors.email && <p className="text-[0.6rem] text-red-500 font-bold">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Phone Number</label>
                    <input
                      type="text"
                      required
                      className={`w-full px-3 py-2 bg-slate-50 border ${errors.phone ? 'border-red-400' : 'border-slate-250/70'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none`}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 012-4455"
                    />
                    {errors.phone && <p className="text-[0.6rem] text-red-500 font-bold">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Shift Schedule</label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-250/70 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none cursor-pointer"
                      value={formData.shift}
                      onChange={e => setFormData({ ...formData, shift: e.target.value as any })}
                    >
                      <option value="Morning">Morning (6 AM - 2 PM)</option>
                      <option value="Afternoon">Afternoon (2 PM - 10 PM)</option>
                      <option value="Night">Night (10 PM - 6 AM)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">System Status</label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-255 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none cursor-pointer"
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Suspended/Inactive</option>
                    </select>
                  </div>

                  {formData.role === 'Front Desk' && (
                    <div className="space-y-1.5 text-left">
                      <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Assigned Desk/Counter</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-250/70 rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none"
                        value={formData.assignedRegister}
                        onChange={e => setFormData({ ...formData, assignedRegister: e.target.value })}
                        placeholder="e.g. Counter #3"
                      />
                    </div>
                  )}
                </div>

                {formData.role === 'Front Desk' && (
                  <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-150 rounded-lg">
                    <input
                      type="checkbox"
                      id="activeAtFrontDeskChecked"
                      className="w-4 h-4 text-sky-600 font-bold border-slate-300 rounded focus:ring-sky-500 cursor-pointer"
                      checked={formData.activeAtFrontDesk}
                      onChange={e => setFormData({ ...formData, activeAtFrontDesk: e.target.checked })}
                    />
                    <label htmlFor="activeAtFrontDeskChecked" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                      Assign Immediately to Active duty at the Front Desk
                    </label>
                  </div>
                )}

                <div className="flex gap-2.5 pt-3 border-t border-slate-100">
                  <button
                    type="submit"
                    className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-3 rounded text-[0.7rem] uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Add to Staff Register
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-500 rounded text-[0.7rem] font-bold uppercase tracking-wider hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* MODIFY USER RECORD */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2 font-bold text-amber-700">
                  <Edit2 className="w-5 h-5 text-amber-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-805">Modify Staff profile</h4>
                </div>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 text-slate-700">
                <div className="space-y-1.5 text-left">
                  <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    required
                    className={`w-full px-3 py-2 bg-slate-50 border ${errors.name ? 'border-red-400 font-bold' : 'border-slate-250/70'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none`}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <p className="text-[0.6rem] text-red-500 font-bold">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Username</label>
                    <input
                      type="text"
                      required
                      className={`w-full px-3 py-2 bg-slate-50 border ${errors.username ? 'border-red-400 font-bold' : 'border-slate-250/70'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none`}
                      value={formData.username}
                      onChange={e => setFormData({ ...formData, username: e.target.value })}
                    />
                    {errors.username && <p className="text-[0.6rem] text-red-500 font-bold">{errors.username}</p>}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Staff Role</label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none cursor-pointer"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                    >
                      <option value="Front Desk">Front Desk Operator</option>
                      <option value="Admin">Administrator</option>
                      <option value="Pharmacist">Pharmacist Specialist</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    required
                    className={`w-full px-3 py-2 bg-slate-50 border ${errors.email ? 'border-red-450' : 'border-slate-250/70'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none`}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <p className="text-[0.6rem] text-red-500 font-bold">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Phone Number</label>
                    <input
                      type="text"
                      required
                      className={`w-full px-3 py-2 bg-slate-50 border ${errors.phone ? 'border-red-450' : 'border-slate-250/70'} rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none`}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-[0.6rem] text-red-505 font-bold">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Shift Schedule</label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none cursor-pointer"
                      value={formData.shift}
                      onChange={e => setFormData({ ...formData, shift: e.target.value as any })}
                    >
                      <option value="Morning">Morning (6 AM - 2 PM)</option>
                      <option value="Afternoon">Afternoon (2 PM - 10 PM)</option>
                      <option value="Night">Night (10 PM - 6 AM)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">System Status</label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-255 rounded-md text-xs font-semibold focus:ring-1 ring-sky-500 outline-none cursor-pointer"
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Suspended/Inactive</option>
                    </select>
                  </div>

                  {formData.role === 'Front Desk' && (
                    <div className="space-y-1.5 text-left">
                      <label className="text-[0.62rem] font-bold text-slate-450 uppercase tracking-wider block">Assigned Desk/Counter</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-md text-xs font-semibold focus:ring-1 ring-sky-505 outline-none"
                        value={formData.assignedRegister}
                        onChange={e => setFormData({ ...formData, assignedRegister: e.target.value })}
                      />
                    </div>
                  )}
                </div>

                {formData.role === 'Front Desk' && (
                  <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-150 rounded-lg">
                    <input
                      type="checkbox"
                      id="activeAtFrontDeskCheckedEdit"
                      className="w-4 h-4 text-sky-600 font-bold border-slate-300 rounded focus:ring-sky-500 cursor-pointer"
                      checked={formData.activeAtFrontDesk}
                      onChange={e => setFormData({ ...formData, activeAtFrontDesk: e.target.checked })}
                    />
                    <label htmlFor="activeAtFrontDeskCheckedEdit" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                      Assign currently to Active duty at the Front Desk
                    </label>
                  </div>
                )}

                <div className="flex gap-2.5 pt-3 border-t border-slate-100">
                  <button
                    type="submit"
                    className="flex-1 bg-amber-600 hover:bg-amber-750 text-white font-bold py-2.5 px-3 rounded text-[0.7rem] uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-500 rounded text-[0.7rem] font-bold uppercase tracking-wider hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* REMOVE USER RECORD CONFIRMATION */}
        {showDeleteConfirm && selectedUser && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl border border-rose-100 p-5 max-w-sm w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-2.5 text-rose-600 text-left">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Expel Staff Member?</h3>
              </div>
              
              <p className="text-[11px] text-slate-500 leading-relaxed text-left">
                Are you sure you want to completely erase <strong className="text-slate-800">"{selectedUser.name}"</strong> from the pharmacy directory database? This operator will lose access permissions immediately.
              </p>
              
              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  className="flex-1 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold py-2 px-3 rounded text-[0.7rem] uppercase tracking-wider transition-all cursor-pointer border border-transparent"
                  onClick={handleConfirmDelete}
                >
                  Expel Staff
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 rounded text-[0.7rem] font-bold uppercase tracking-wider transition-all cursor-pointer"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedUser(null);
                  }}
                >
                  Keep Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LoginView = ({ users, onLogin }: { users: User[], onLogin: (user: User) => void }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const displayUsers = useMemo(() => {
    if (users && users.length > 0) return users;
    return [
      { id: 'usr-1', name: 'John Doe', email: 'johndoe@pharmacy.com', role: 'Admin', username: 'johndoe', phone: '+1 (555) 012-3456', status: 'Active', shift: 'Morning' },
      { id: 'usr-2', name: 'Sarah Connor', email: 'sconnor@pharmacy.com', role: 'Front Desk', username: 'sconnor', phone: '+1 (555) 012-7890', status: 'Active', shift: 'Afternoon' },
      { id: 'usr-3', name: 'James Carter', email: 'jcarter@pharmacy.com', role: 'Front Desk', username: 'jcarter', phone: '+1 (555) 012-4321', status: 'Active', shift: 'Night' }
    ] as User[];
  }, [users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleanUsername = usernameInput.trim().toLowerCase();
    if (!cleanUsername) {
      setError('Please enter a username');
      return;
    }

    const matched = displayUsers.find(
      u => u.username.toLowerCase() === cleanUsername && u.status === 'Active'
    );

    if (matched) {
      onLogin(matched);
    } else {
      const inactive = displayUsers.find(
        u => u.username.toLowerCase() === cleanUsername && u.status === 'Inactive'
      );
      if (inactive) {
        setError('This staff account is currently marked Inactive. Please contact the administrator.');
      } else {
        const guestUser: User = {
          id: `usr-guest-${Date.now()}`,
          name: usernameInput.charAt(0).toUpperCase() + usernameInput.slice(1),
          email: `${cleanUsername}@guest.pharmacy.com`,
          role: 'Admin',
          username: cleanUsername,
          phone: '+1 (555) 012-0000',
          status: 'Active',
          shift: 'Morning',
          assignedRegister: 'Register #1'
        };
        onLogin(guestUser);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="absolute top-4 right-4 flex items-center gap-1.5 text-slate-500 font-mono text-[10px] uppercase select-none">
        <span>UTC Connection Secure</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 text-sky-500 mb-4 shadow-inner">
          <svg className="w-8 h-8 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m2 9 3-3 3 3"/>
            <path d="M13 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z"/>
            <path d="M2 22h16"/>
            <path d="M8 22V12a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v10"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold uppercase tracking-wider text-white">Rx Pharmacy Platform</h2>
        <p className="mt-1 text-xs text-slate-400">
          Secure staff portal & medicine registry ledger
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-slate-950 border border-slate-900/60 py-6 px-5 shadow-2xl rounded-2xl sm:px-6 text-left">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                Staff @Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-505 font-medium text-xs font-mono">@</span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoFocus
                  required
                  placeholder="johndoe"
                  value={usernameInput}
                  onChange={e => {
                    setUsernameInput(e.target.value);
                    if (error) setError(null);
                  }}
                  className="w-full pl-7 pr-3 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs font-semibold focus:border-sky-500 hover:border-slate-700 outline-none text-white transition-all placeholder-slate-650"
                />
              </div>
            </div>

            {error && (
              <p className="text-[10px] text-rose-400 font-bold bg-rose-950/30 border border-rose-900/30 p-2.5 rounded-md text-left">
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 active:bg-sky-850 text-white py-2 px-4 rounded-lg text-xs uppercase font-extrabold tracking-wider transition-all shadow-md outline-none cursor-pointer flex items-center justify-center gap-2"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-slate-900 pt-5">
            <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2.5 leading-none">
              Simulation Quick Sign-In
            </h3>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {displayUsers.map(u => (
                <button
                  key={`quick-login-${u.id}`}
                  type="button"
                  onClick={() => onLogin(u)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/60 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-sky-955/65 border border-sky-900/50 text-sky-450 font-bold text-[10px] flex items-center justify-center shrink-0 select-none">
                      {u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-200 group-hover:text-white truncate leading-tight">{u.name}</p>
                      <p className="text-[9px] text-slate-505 truncate tracking-wide">@{u.username}</p>
                    </div>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    u.role === 'Admin' ? 'bg-amber-950/80 text-amber-500 border border-amber-900/30' : 'bg-sky-950/80 text-sky-505 border border-sky-900/30'
                  }`}>
                    {u.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MainView = ({ 
  view, 
  setView, 
  inventoryFilter,
  setInventoryFilter,
  medicines, 
  sales, 
  suppliers, 
  adjustments,
  users = [],
  stats, 
  actions,
  loading 
}: any) => {
  const [sessionUser, setSessionUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rx_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    const loggedOut = localStorage.getItem('rx_logged_out');
    if (loggedOut === 'true') {
      return null;
    }
    const jDoe = users && users.length > 0 
      ? users[0] 
      : { id: 'usr-1', name: 'John Doe', email: 'johndoe@pharmacy.com', role: 'Admin', username: 'johndoe', status: 'Active' } as User;
    return jDoe;
  });

  const handleLogin = (user: User) => {
    localStorage.setItem('rx_session', JSON.stringify(user));
    localStorage.removeItem('rx_logged_out');
    setSessionUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('rx_session');
    localStorage.setItem('rx_logged_out', 'true');
    setSessionUser(null);
  };

  const [currency, setCurrency] = useState<'$' | '€' | '£' | '₵'>('$');
  const [syncStatus, setSyncStatus] = useState<'synced' | 'outdated'>('synced');
  const [lastSynced, setLastSynced] = useState<Date>(new Date());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [showSyncedToast, setShowSyncedToast] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const [salesCart, setSalesCart] = useState<{ medicineId: string, medicineName: string, quantity: number, price: number }[]>([]);

  const handleSimulateScanToSale = (medicineId: string) => {
    const medicine = medicines.find((m: any) => m.id === medicineId);
    if (!medicine) return;
    
    setSalesCart(prev => {
      const existing = prev.find(item => item.medicineId === medicineId);
      if (existing) {
        return prev.map(item => item.medicineId === medicineId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { medicineId: medicine.id, medicineName: medicine.name, quantity: 1, price: medicine.price }];
    });
    
    setView('sales');
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rx_dark_mode');
      return saved === 'true';
    }
    return false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('rx_dark_mode', String(next));
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', next);
      }
      return next;
    });
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode]);

  // Periodic Sync Check Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      // Every 30 seconds, match with mock state and alert if potential changes
      setSyncStatus(current => {
        if (current === 'synced') {
          return 'outdated';
        }
        return current;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const triggerSync = useCallback(() => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('synced');
      setLastSynced(new Date());
      setShowSyncedToast(true);
      setTimeout(() => {
        setShowSyncedToast(false);
      }, 3500);
    }, 1200);
  }, []);



  const criticalStockCount = useMemo(() => {
    return medicines ? medicines.filter((m: any) => m.quantity < 10).length : 0;
  }, [medicines]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-sky-500 border-t-transparent"></div>
        <p className="text-slate-400 font-bold uppercase text-[9px] tracking-[0.3em] animate-pulse">Initializing System Nodes...</p>
      </div>
    </div>
  );

  if (!sessionUser) {
    return <LoginView users={users} onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen flex transition-colors duration-200 ${isDarkMode ? 'dark bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-800'}`}>
      <Sidebar 
        currentView={view} 
        setView={(v, f) => {
          if (f !== undefined) setInventoryFilter(f);
          setView(v);
        }} 
        criticalStockCount={criticalStockCount}
        onClearAllData={() => setShowResetConfirm(true)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        sessionUser={sessionUser}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 lg:ml-[240px] p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden pt-6 sm:pt-8 lg:pt-10 relative">
        <Header 
          title={view === 'inventory' ? 'Inventory Management' : view.charAt(0).toUpperCase() + view.slice(1)} 
          currency={currency}
          setCurrency={setCurrency}
          syncStatus={syncStatus}
          triggerSync={triggerSync}
          lastSyncedString={lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          isSyncing={isSyncing}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {view === 'dashboard' && <Dashboard stats={stats} sales={sales} currency={currency} medicines={medicines} adjustments={adjustments} setView={(v, f) => {
             setInventoryFilter(f || null);
             setView(v);
          }} isDarkMode={isDarkMode} />}
          {view === 'inventory' && <InventoryView medicines={medicines} adjustments={adjustments} actions={actions} filter={inventoryFilter} setFilter={setInventoryFilter} currency={currency} suppliers={suppliers} onSimulateScanToSale={handleSimulateScanToSale} />}
          {view === 'sales' && <SalesView medicines={medicines} actions={actions} currency={currency} users={users} externalCart={salesCart} setExternalCart={setSalesCart} />}
          {view === 'suppliers' && <SuppliersView suppliers={suppliers} actions={actions} adjustments={adjustments} medicines={medicines} />}
          {view === 'reports' && <ReportsView sales={sales} currency={currency} isDarkMode={isDarkMode} />}
          {view === 'users' && <UsersManagementView users={users} actions={actions} />}
        </motion.div>
      </main>

      {/* Safety Purge Confirmation Overlay */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-xl border border-rose-100 p-6 max-w-md w-full shadow-2xl space-y-5"
          >
            <div className="flex items-center gap-3 text-rose-600">
              <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Purge Pharmacy Register?</h3>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed text-left">
              This action will completely zero-out all medicine quantities, reset supplier activity statistics to initial states, and purge your transactional logs.
            </p>
            
            <div className="bg-rose-50/55 border border-rose-100 rounded-lg p-3 text-[0.7rem] text-rose-700 font-semibold text-left">
              ⚠️ Warning: This operation is permanent and cannot be undone. Always verify you don't require any active registry keys.
            </div>
            
            <div className="flex gap-2.5">
              <button
                type="button"
                className="flex-1 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold py-2.5 px-3 rounded-lg text-[0.75rem] uppercase tracking-wider transition-all select-none cursor-pointer border border-transparent shadow-sm"
                onClick={() => {
                  actions.clearSystemData();
                  setShowResetConfirm(false);
                }}
              >
                Yes, Purge Register
              </button>
              <button
                type="button"
                className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-850 border border-slate-250/60 rounded-lg text-[0.75rem] font-bold uppercase tracking-wider transition-all select-none cursor-pointer"
                onClick={() => setShowResetConfirm(false)}
              >
                Keep Records
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Dynamic Sync Toast */}
      <AnimatePresence>
        {showSyncedToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-850 text-slate-100 p-4 rounded-xl shadow-xl flex items-center gap-3 max-w-sm"
          >
            <div className="bg-emerald-800 p-1.5 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="font-bold text-xs uppercase tracking-wider text-emerald-300 text-left">Systems Aligned</p>
              <p className="text-[11px] text-slate-300 leading-tight text-left">Local pharmacy inventory cache matched with central catalog successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
