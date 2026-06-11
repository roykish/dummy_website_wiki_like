import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Receipt, BarChart2, Package,
  Warehouse, Users, BookOpen, Settings2, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { store } from '@/data/dummy';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';

const NAV = [
  {
    group: null,
    items: [{ id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard }],
  },
  {
    group: 'Sales',
    items: [
      {
        id: 'transactions', label: 'Transactions', Icon: Receipt,
        children: [
          { id: 'transactions',         label: 'All Transactions' },
          { id: 'transactions-returns', label: 'Returns & Refunds' },
          { id: 'transactions-new',     label: 'New Transaction'  },
        ],
      },
      {
        id: 'reports', label: 'Reports', Icon: BarChart2,
        children: [
          { id: 'reports',          label: 'Daily Report'    },
          { id: 'reports-monthly',  label: 'Monthly Summary' },
          { id: 'reports-tax',      label: 'Tax Report'      },
        ],
      },
    ],
  },
  {
    group: 'Store',
    items: [
      {
        id: 'products', label: 'Products', Icon: Package,
        children: [
          { id: 'products',            label: 'All Products' },
          { id: 'products-categories', label: 'Categories'   },
          { id: 'products-pricing',    label: 'Price List'   },
        ],
      },
      {
        id: 'inventory', label: 'Inventory', Icon: Warehouse,
        children: [
          { id: 'inventory',           label: 'Stock Levels'    },
          { id: 'inventory-orders',    label: 'Purchase Orders' },
          { id: 'inventory-suppliers', label: 'Suppliers'       },
        ],
      },
    ],
  },
  {
    group: 'People',
    items: [
      {
        id: 'staff', label: 'Staff', Icon: Users,
        children: [
          { id: 'staff',            label: 'Cashiers'   },
          { id: 'staff-schedules',  label: 'Schedules'  },
          { id: 'staff-attendance', label: 'Attendance' },
        ],
      },
    ],
  },
  {
    group: 'Finance',
    items: [
      {
        id: 'accounting', label: 'Accounting', Icon: BookOpen,
        children: [
          { id: 'accounting',          label: 'Trial Balance'       },
          { id: 'accounting-ledger',   label: 'General Journal'     },
          { id: 'accounting-pl',       label: 'P&L / Balance Sheet' },
          { id: 'accounting-expenses', label: 'Expenses'            },
        ],
      },
    ],
  },
  {
    group: 'System',
    items: [
      {
        id: 'settings', label: 'Settings', Icon: Settings2,
        children: [
          { id: 'settings',         label: 'Store Info'     },
          { id: 'settings-users',   label: 'Users & Roles'  },
          { id: 'settings-receipt', label: 'Receipt Config' },
        ],
      },
    ],
  },
];

function getParentId(pageId) {
  for (const section of NAV) {
    for (const item of section.items) {
      if (item.children?.some(c => c.id === pageId)) return item.id;
    }
  }
  return null;
}

export default function AppSidebar({ active, onNavigate }) {
  const [open, setOpen] = useState(() => {
    const parent = getParentId(active);
    return new Set(parent ? [parent] : []);
  });

  useEffect(() => {
    const parent = getParentId(active);
    if (parent) setOpen(prev => new Set([...prev, parent]));
  }, [active]);

  const toggle = (id) =>
    setOpen(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <Sidebar collapsible="none" style={{ '--sidebar-width': '242px' }} className="border-r border-sidebar-border">
      <SidebarContent>
        {NAV.map((section, i) => (
          <SidebarGroup key={i}>
            {section.group && <SidebarGroupLabel>{section.group}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map(item => {
                  const isOpen = open.has(item.id);
                  const isParentActive = active === item.id ||
                    item.children?.some(c => c.id === active);

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={isParentActive}
                        onClick={() => {
                          if (item.children) toggle(item.id);
                          else onNavigate(item.id);
                        }}
                      >
                        <item.Icon size={18} strokeWidth={1.8} />
                        <span>{item.label}</span>
                        {item.children && (
                          <ChevronRight
                            size={16}
                            strokeWidth={2}
                            className={cn('ml-auto transition-transform duration-200', isOpen && 'rotate-90')}
                          />
                        )}
                      </SidebarMenuButton>

                      {item.children && isOpen && (
                        <SidebarMenuSub>
                          {item.children.map(child => (
                            <SidebarMenuSubItem key={child.id}>
                              <SidebarMenuSubButton asChild isActive={active === child.id}>
                                <button type="button" onClick={() => onNavigate(child.id)}>
                                  {child.label}
                                </button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-[hsl(0,0%,97%)] py-3 text-[0.8em] leading-[1.7] text-wiki-text-muted">
        <strong className="block text-sidebar-accent-foreground">Manager</strong>
        {store.manager}<br />
        {store.phone}
      </SidebarFooter>
    </Sidebar>
  );
}
