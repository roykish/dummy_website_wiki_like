import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/** Replaces `.filter-row`. */
export function FilterRow({ children, className }) {
  return (
    <div className={cn('mb-3 flex flex-wrap items-center gap-2 border border-wiki-border bg-wiki-bg-subtle p-2', className)}>
      {children}
    </div>
  );
}

export function FilterLabel({ children }) {
  return <label className="text-[0.88em] whitespace-nowrap text-wiki-text-secondary">{children}</label>;
}

/** Pushes following siblings to the right edge of the row. */
export function FilterSpacer() {
  return <span className="ml-auto" />;
}

export function FilterResult({ children }) {
  return <span className="text-[0.88em] text-wiki-text-secondary">{children}</span>;
}

/** Compact, sharp-cornered select for filter rows, replaces native `<select>`. */
export function FilterSelect({ value, onValueChange, options, className, placeholder }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn('h-7 min-w-28 rounded-none border-wiki-border bg-white px-2 text-[13px] shadow-none', className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
