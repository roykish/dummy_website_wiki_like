export function PageHeader({ title, meta }) {
  return (
    <div className="mb-4 border-b border-wiki-border pb-1.5">
      <h1 className="font-serif text-[1.75em] font-normal">{title}</h1>
      {meta && <div className="mt-0.5 text-[0.85em] text-wiki-text-secondary">{meta}</div>}
    </div>
  );
}
