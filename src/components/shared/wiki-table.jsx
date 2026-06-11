import { cn } from '@/lib/utils';

/** Horizontal scroll wrapper, replaces `.table-scroll`. */
export function TableScroll({ children, className }) {
  return <div className={cn('overflow-x-auto', className)}>{children}</div>;
}

/** Replaces `.wikitable`. */
export function WikiTable({ children, className, ...props }) {
  return (
    <table className={cn('w-full border-collapse text-[0.9em]', className)} {...props}>
      {children}
    </table>
  );
}

/** Body row with hover highlight, replaces `.wikitable tbody tr:hover td`. */
export function Tr({ children, className, ...props }) {
  return (
    <tr className={cn('[&:hover>td]:bg-wiki-bg-row-hover', className)} {...props}>
      {children}
    </tr>
  );
}

/** Header cell, replaces `<th>` + `.num`. */
export function Th({ children, num, className, ...props }) {
  return (
    <th
      className={cn(
        'border border-wiki-border bg-wiki-header-bg px-2 py-[5px] text-left font-bold whitespace-nowrap',
        num && 'text-right',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

/** Body cell, replaces `<td>` + `.num` / `.center`. */
export function Td({ children, num, center, className, ...props }) {
  return (
    <td
      className={cn(
        'border border-wiki-border bg-white px-2 py-1 align-middle',
        num && 'text-right',
        center && 'text-center',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

/** Footer cell, replaces `.wikitable tfoot td`. */
export function Tf({ children, num, center, className, ...props }) {
  return (
    <td
      className={cn(
        'border border-wiki-border bg-wiki-header-bg px-2 py-[5px] font-bold',
        num && 'text-right',
        center && 'text-center',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}
