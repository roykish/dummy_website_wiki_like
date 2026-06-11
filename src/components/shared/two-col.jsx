import { cn } from '@/lib/utils';

/** Replaces both `.two-col` and `.settings-grid` (identical layout: 1fr 1fr, 20px gap, collapses to 1 col below 961px). */
export function TwoCol({ children, className }) {
  return (
    <div className={cn('grid grid-cols-1 gap-5 min-[961px]:grid-cols-2', className)}>
      {children}
    </div>
  );
}
