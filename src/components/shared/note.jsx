import { cn } from '@/lib/utils';

/** Replaces `.note` (optionally combined with `.mt-1`/`.mt-2`). */
export function Note({ children, className, spacing = 'mt-2' }) {
  return <p className={cn('text-[0.88em] text-wiki-text-secondary', spacing, className)}>{children}</p>;
}
