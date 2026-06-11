/** Inline horizontal bar spark, replaces `.bar-wrap/.bar-fill/.bar-pct`. */
export function BarSpark({ pct, maxWidth = 200 }) {
  return (
    <div className="flex min-w-[120px] items-center gap-1.5">
      <span
        className="inline-block h-2.5 flex-shrink-0 bg-wiki-blue"
        style={{ width: `${pct}%`, maxWidth }}
      />
      <span className="whitespace-nowrap text-[0.82em] text-wiki-text-secondary">{pct}%</span>
    </div>
  );
}
