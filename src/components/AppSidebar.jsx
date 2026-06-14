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
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

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

function SidebarNavContent({ active, onNavigate, open, toggle }) {
  return (
    <>
      <SidebarContent>
        {NAV.map((section, i) => (
          <SidebarGroup key={i} className="px-0">
            {section.group && <SidebarGroupLabel className="px-4">{section.group}</SidebarGroupLabel>}
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
                        className="px-4"
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
                        <SidebarMenuSub className="mx-0 translate-x-0 border-l-0 px-0">
                          {item.children.map(child => (
                            <SidebarMenuSubItem key={child.id}>
                              <SidebarMenuSubButton asChild isActive={active === child.id} className="w-full translate-x-0 pl-10 pr-4">
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
    </>
  );
}

export default function AppSidebar({ active, onNavigate }) {
  const { openMobile, setOpenMobile } = useSidebar();

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

  const navigate = (id) => {
    onNavigate(id);
    setOpenMobile(false);
  };

  return (
    <>
      {/* Desktop: always-visible, in-flow sidebar */}
      <Sidebar
        collapsible="none"
        style={{ '--sidebar-width': '242px' }}
        className="hidden border-r border-sidebar-border md:flex"
      >
        <SidebarNavContent active={active} onNavigate={navigate} open={open} toggle={toggle} />
      </Sidebar>

      {/* Mobile: off-canvas drawer triggered by TopBar hamburger */}
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-[260px] gap-0 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground sm:max-w-none"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Site navigation menu</SheetDescription>
          </SheetHeader>
          <SidebarNavContent active={active} onNavigate={navigate} open={open} toggle={toggle} />
        </SheetContent>
      </Sheet>
    </>
  );
}
