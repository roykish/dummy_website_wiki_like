import { store, systemUsers } from '@/data/dummy';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const initials  = store.manager.split(' ').map(w => w[0]).join('');
const managerUser = systemUsers.find(u => u.role === 'Store Manager') ?? systemUsers[0];

const NOTIFICATIONS = [
  { id: 1, type: 'critical', title: 'Critical stock',   desc: 'Gluten-Free Pasta — 4 units left (reorder pt: 20)',      time: 'Just now',  page: 'inventory' },
  { id: 2, type: 'critical', title: 'Critical stock',   desc: 'Sparkling Lemonade — 11 units left (reorder pt: 40)',    time: 'Just now',  page: 'inventory' },
  { id: 3, type: 'warning',  title: 'Low stock',        desc: '4 additional SKUs are below their reorder point',        time: '2 hrs ago', page: 'inventory' },
  { id: 4, type: 'info',     title: 'PO in transit',    desc: 'PO-0111 from BevCo · $512.00 · Expected June 12',        time: '4 hrs ago', page: 'inventory-orders' },
  { id: 5, type: 'warning',  title: 'Return pending',   desc: 'R-0082 · Whole Milk 2 L · $4.29 awaiting approval',     time: '8 hrs ago', page: 'transactions-returns' },
];

const SEVERITY_DOT = {
  critical: 'bg-status-critical',
  warning: 'bg-status-warning-strong',
  info: 'bg-wiki-blue',
};

export default function TopBar({ navigate, onLogout }) {
  const criticalCount = NOTIFICATIONS.filter(n => n.type === 'critical').length;

  return (
    <div className="flex h-[50px] shrink-0 items-center justify-between bg-wiki-navy px-5">
      <div className="text-[1.15em] font-bold tracking-wide text-white">
        RetailOS <span className="ml-2 text-[0.78em] font-normal text-wiki-navy-accent">Point of Sale</span>
      </div>

      <div className="flex items-center gap-3.5 text-[0.88em]">
        <div className="flex border border-white/20">
          <input
            type="text"
            placeholder="Search…"
            className="w-[300px] border-none bg-white/[0.08] px-2.5 py-1 text-[13px] text-white outline-none placeholder:text-wiki-navy-accent"
          />
          <button className="border-l border-white/20 bg-white/10 px-2.5 py-1 text-[13px] text-white hover:bg-white/20">
            Go
          </button>
        </div>

        <div className="h-[18px] w-px bg-white/[0.18]" />

        {/* Notification bell */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative cursor-pointer p-0.5 leading-none text-wiki-navy-accent hover:text-white">
              <span className="font-mono text-[1em]">&#9881;</span>
              <span className="absolute -top-1 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border-[1.5px] border-wiki-navy bg-[#e05a40] px-[3px] text-[9px] leading-none font-bold text-white">
                {NOTIFICATIONS.length}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={12} className="w-[310px] rounded-none border-wiki-border p-0 shadow-[0_3px_10px_rgba(0,0,0,0.14)]">
            <div className="flex items-center justify-between border-b border-wiki-border-light px-3.5 pt-[9px] pb-2 text-[0.82em] font-semibold text-wiki-navy">
              Notifications
              <span className="rounded-[10px] bg-[#e05a40] px-1.5 py-px text-[0.85em] font-bold text-white">
                {criticalCount} critical
              </span>
            </div>

            {NOTIFICATIONS.map(n => (
              <div
                key={n.id}
                className="flex cursor-pointer items-start gap-2.5 border-b border-[#f0f2f4] px-3.5 py-[9px] text-[0.82em] last:border-b-0 hover:bg-[#f7f9fc]"
                onClick={() => navigate?.(n.page)}
              >
                <div className={`mt-[3px] h-2 w-2 shrink-0 rounded-full ${SEVERITY_DOT[n.type]}`} />
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 font-semibold text-wiki-navy">{n.title}</div>
                  <div className="leading-[1.4] text-wiki-text-secondary">{n.desc}</div>
                </div>
                <div className="mt-px text-[0.88em] whitespace-nowrap text-wiki-text-faint">{n.time}</div>
              </div>
            ))}

            <div className="cursor-pointer border-t border-wiki-border-light px-3.5 py-[7px] text-center text-[0.8em] text-wiki-blue hover:bg-wiki-bg-hover">
              View all alerts
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-[18px] w-px bg-white/[0.18]" />

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex cursor-pointer items-center gap-2 text-[#c8d8e8]">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-wiki-blue text-[10px] font-bold text-white">
                {initials}
              </span>
              <span>{store.manager}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10} className="min-w-[240px] rounded-none border-wiki-border p-0 shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
            {/* Avatar + name + online badge */}
            <div className="flex items-center gap-2.5 border-b border-wiki-border-light bg-wiki-bg-page px-3.5 pt-[9px] pb-2">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-wiki-blue text-[12px] font-bold text-white">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[0.9em] font-semibold text-wiki-navy">{store.manager}</div>
                <div className="mt-px text-[0.78em] text-wiki-text-muted">{managerUser.role}</div>
              </div>
              <div className="shrink-0 border border-status-ok-strong px-1.5 text-[0.7em] font-semibold whitespace-nowrap text-status-ok-strong">
                Online
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-[3px] border-b border-wiki-border-light px-3.5 pt-2 pb-1.5 text-[0.78em]">
              <span className="font-semibold whitespace-nowrap text-wiki-text-faint">Store</span>
              <span className="text-wiki-text-dark">{store.name}</span>
              <span className="font-semibold whitespace-nowrap text-wiki-text-faint">Shift</span>
              <span className="text-wiki-text-dark">{store.shift.match(/\d{2}:\d{2}.*\d{2}:\d{2}/)?.[0] ?? store.shift}</span>
              <span className="font-semibold whitespace-nowrap text-wiki-text-faint">Email</span>
              <span className="text-wiki-text-dark">{managerUser.email}</span>
              <span className="font-semibold whitespace-nowrap text-wiki-text-faint">Login</span>
              <span className="text-wiki-text-dark">{managerUser.lastLogin.split(' ').pop()} today</span>
              <span className="font-semibold whitespace-nowrap text-wiki-text-faint">ID</span>
              <span className="text-wiki-text-dark">{managerUser.id} · Tax {store.taxId}</span>
            </div>

            <div className="cursor-pointer px-3.5 py-[7px] text-[0.88em] text-wiki-text hover:bg-wiki-bg-hover">Profile &amp; Settings</div>
            <div className="cursor-pointer px-3.5 py-[7px] text-[0.88em] text-wiki-text hover:bg-wiki-bg-hover">Change password</div>
            <div className="cursor-pointer px-3.5 py-[7px] text-[0.88em] text-wiki-text hover:bg-wiki-bg-hover">Switch store</div>
            <div className="my-[3px] border-t border-wiki-border-light" />
            <div
              className="cursor-pointer px-3.5 py-[7px] text-[0.88em] text-status-critical hover:bg-wiki-bg-hover"
              onClick={onLogout}
            >
              Sign out
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
