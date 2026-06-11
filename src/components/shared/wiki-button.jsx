import { cn } from '@/lib/utils';

export function WikiButton({ active, className, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        'min-w-8 cursor-pointer border border-wiki-border bg-wiki-bg-subtle px-2.5 py-[3px] text-center font-sans text-[0.9em] text-wiki-blue',
        active
          ? 'cursor-default border-wiki-blue bg-wiki-blue text-white'
          : 'hover:bg-[#eaf3fb]',
        'disabled:cursor-default disabled:text-wiki-border disabled:hover:bg-wiki-bg-subtle',
        className
      )}
      {...props}
    />
  );
}
