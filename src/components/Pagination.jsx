import { cn } from '@/lib/utils';

export default function Pagination({ page, totalPages, total, pageSize, onPage }) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  // Build page number list with ellipsis
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('…');
    pages.push(totalPages);
  }

  const pagBtn = (active) =>
    cn(
      'min-w-8 border border-wiki-border bg-wiki-bg-subtle px-2.5 py-[3px] text-center font-sans text-[inherit]',
      active
        ? 'cursor-default border-wiki-blue bg-wiki-blue text-white'
        : 'text-wiki-blue hover:bg-[#eaf3fb] disabled:cursor-default disabled:text-wiki-border disabled:hover:bg-wiki-bg-subtle'
    );

  return (
    <div className="flex items-center justify-between border-t border-wiki-border pt-2 text-[0.88em]">
      <span className="text-wiki-text-secondary">
        Showing {from}–{to} of {total} records
      </span>
      <div className="flex items-center gap-[3px]">
        <button className={pagBtn(false)} disabled={page === 1} onClick={() => onPage(page - 1)}>
          ← Previous
        </button>
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`e${i}`} className="px-1 text-wiki-text-secondary">
              …
            </span>
          ) : (
            <button key={p} className={pagBtn(page === p)} onClick={() => onPage(p)}>
              {p}
            </button>
          )
        )}
        <button className={pagBtn(false)} disabled={page === totalPages} onClick={() => onPage(page + 1)}>
          Next →
        </button>
      </div>
    </div>
  );
}
