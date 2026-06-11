import { cn } from '@/lib/utils';

const STATUS_CLASSES = {
  critical: 'text-status-critical font-bold',
  low: 'text-status-warning',
  warning: 'text-status-warning',
  ok: 'text-status-ok',
};

/** Tailwind class string for a status level, replaces `.status-critical/.status-low/.status-ok`. */
export function statusClass(level) {
  return STATUS_CLASSES[level] ?? '';
}

export function StatusText({ status, className, children }) {
  return <span className={cn(statusClass(status), className)}>{children}</span>;
}
