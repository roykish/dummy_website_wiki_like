import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import TopBar from './components/TopBar';
import AppSidebar from './components/AppSidebar';

import DashboardPage       from './pages/DashboardPage';
import TransactionsPage    from './pages/TransactionsPage';
import ReturnsPage         from './pages/ReturnsPage';
import NewTransactionPage  from './pages/NewTransactionPage';
import ReportsPage         from './pages/ReportsPage';
import MonthlyReportPage   from './pages/MonthlyReportPage';
import TaxReportPage       from './pages/TaxReportPage';
import ProductsPage        from './pages/ProductsPage';
import CategoriesPage      from './pages/CategoriesPage';
import PricingPage         from './pages/PricingPage';
import InventoryPage       from './pages/InventoryPage';
import PurchaseOrdersPage  from './pages/PurchaseOrdersPage';
import SuppliersPage       from './pages/SuppliersPage';
import StaffPage           from './pages/StaffPage';
import SchedulesPage       from './pages/SchedulesPage';
import AttendancePage      from './pages/AttendancePage';
import SettingsPage        from './pages/SettingsPage';
import UsersPage           from './pages/UsersPage';
import ReceiptConfigPage   from './pages/ReceiptConfigPage';
import AccountingPage      from './pages/AccountingPage';
import LedgerPage          from './pages/LedgerPage';
import PLPage              from './pages/PLPage';
import ExpensesPage        from './pages/ExpensesPage';
import LoginPage           from './pages/LoginPage';

const PAGES = {
  dashboard:              DashboardPage,
  transactions:           TransactionsPage,
  'transactions-returns': ReturnsPage,
  'transactions-new':     NewTransactionPage,
  reports:                ReportsPage,
  'reports-monthly':      MonthlyReportPage,
  'reports-tax':          TaxReportPage,
  products:               ProductsPage,
  'products-categories':  CategoriesPage,
  'products-pricing':     PricingPage,
  inventory:              InventoryPage,
  'inventory-orders':     PurchaseOrdersPage,
  'inventory-suppliers':  SuppliersPage,
  staff:                  StaffPage,
  'staff-schedules':      SchedulesPage,
  'staff-attendance':     AttendancePage,
  accounting:             AccountingPage,
  'accounting-ledger':    LedgerPage,
  'accounting-pl':        PLPage,
  'accounting-expenses':  ExpensesPage,
  settings:               SettingsPage,
  'settings-users':       UsersPage,
  'settings-receipt':     ReceiptConfigPage,
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page,     setPage]     = useState('dashboard');
  const Page = PAGES[page] ?? DashboardPage;

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <SidebarProvider
      className="h-screen min-h-0 w-full flex-col overflow-hidden"
      style={{ '--sidebar-width': '242px' }}
    >
      <TopBar navigate={setPage} onLogout={() => { setLoggedIn(false); setPage('dashboard'); }} />
      <div className="flex min-h-0 flex-1">
        <AppSidebar active={page} onNavigate={setPage} />
        <main className="flex-1 overflow-y-auto px-6 pt-5 pb-8">
          <Page navigate={setPage} />
        </main>
      </div>
    </SidebarProvider>
  );
}
