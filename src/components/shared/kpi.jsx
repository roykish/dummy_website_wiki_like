import { cn } from '@/lib/utils';

export function KpiGrid({ children, className }) {
  return (
    <div className={cn('mb-5 grid grid-cols-2 gap-3 min-[961px]:grid-cols-4', className)}>
      {children}
    </div>
  );
}

export function KpiCard({ label, value, sub, valueClassName }) {
  return (
    <div className="border border-wiki-border">
      <div className="border-b border-wiki-border bg-wiki-header-bg px-2.5 py-1 text-[0.78em] font-bold tracking-wide text-wiki-text-secondary uppercase">
        {label}
      </div>
      <div className={cn('px-2.5 pt-2.5 pb-0.5 text-[1.7em] font-bold', valueClassName)}>{value}</div>
      {sub != null && <div className="px-2.5 pb-2 text-[0.82em] text-wiki-text-secondary">{sub}</div>}
    </div>
  );
}
