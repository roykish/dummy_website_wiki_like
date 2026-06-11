import { cn } from '@/lib/utils';

export function AlertBox({ critical, success, children, className }) {
  return (
    <div
      className={cn(
        'mb-3 border border-wiki-border border-l-4 border-l-status-warning bg-alert-amber-bg px-3 py-2 text-[0.9em]',
        critical && 'border-l-status-critical bg-alert-red-bg',
        success && 'border-l-status-ok-strong bg-[#f0faf6]',
        className
      )}
    >
      {children}
    </div>
  );
}
