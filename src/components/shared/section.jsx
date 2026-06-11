import { cn } from '@/lib/utils';

export function SectionTitle({ children, className }) {
  return (
    <h2 className={cn('mb-2.5 border-b border-wiki-border pb-[3px] font-serif text-[1.15em] font-normal', className)}>
      {children}
    </h2>
  );
}

export function Section({ title, children, className }) {
  return (
    <div className={cn('mb-6', className)}>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </div>
  );
}
