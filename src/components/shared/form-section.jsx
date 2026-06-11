import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/** Replaces `.form-section` / `.form-section-title`. */
export function FormSection({ title, children, className }) {
  return (
    <div className={cn('mb-4 border border-wiki-border p-4', className)}>
      {title && (
        <div className="mb-3 border-b border-wiki-header-bg pb-1.5 text-base font-bold">{title}</div>
      )}
      {children}
    </div>
  );
}

/** Replaces `.form-group`. */
export function FormGroup({ label, children, className }) {
  return (
    <div className={cn('mb-3', className)}>
      {label && <label className="mb-[3px] block text-[0.88em] font-bold text-wiki-text-secondary">{label}</label>}
      {children}
    </div>
  );
}

const fieldClass = 'w-full rounded-none border-wiki-border bg-wiki-bg-subtle text-[13px] shadow-none';

/** Read-only/disabled text input styled to match `.form-group input`. */
export function FormInput(props) {
  return <Input className={cn(fieldClass, 'h-auto px-2 py-[5px]')} {...props} />;
}

/** Read-only/disabled textarea styled to match `.form-group textarea`. */
export function FormTextarea(props) {
  return <Textarea className={cn(fieldClass, 'px-2 py-[5px]')} {...props} />;
}

/** Disabled select styled to match `.form-group select`. */
export function FormSelect({ value, onValueChange, options, disabled }) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn(fieldClass, 'h-auto w-full px-2 py-[5px]')}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
