import { plStatement, balanceSheet, monthlyPL, store } from '@/data/dummy';
import {
  PageHeader, AlertBox, Section, TwoCol, WikiTable, Tr, Th, Td, Tf, Note,
} from '@/components/shared';
import { cn } from '@/lib/utils';

const fmt  = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });
const fmtP = (n) => n.toFixed(1) + '%';
const loss = (n) => n < 0 ? `(${fmt(Math.abs(n))})` : fmt(n);
const lossClass = (n) => n < 0 ? 'text-status-critical' : undefined;

export default function PLPage() {
  const pl = plStatement;
  const bs = balanceSheet;

  const totalCurrentAssets = bs.assets.current.reduce((s, a) => s + a.amount, 0);
  const totalFixedNet       = bs.assets.fixed.reduce((s, a) => s + a.amount, 0);
  const totalAssets         = totalCurrentAssets + totalFixedNet;
  const totalCurrentLiab    = bs.liabilities.current.reduce((s, a) => s + a.amount, 0);
  const totalEquity         = bs.equity.reduce((s, a) => s + a.amount, 0);

  return (
    <>
      <PageHeader
        title="Profit & Loss"
        meta={`${store.name} · ${pl.period} · ${pl.note}`}
      />

      {pl.netIncome < 0 && (
        <AlertBox>
          <strong>Operating loss of {fmt(Math.abs(pl.netIncome))} MTD.</strong> Rent ({fmt(3200)}) is
          billed for the full month; 19 days of June revenue remain.
        </AlertBox>
      )}

      <TwoCol>

        <Section title={`Income Statement — ${pl.period}`}>
          <WikiTable className="min-w-[360px]">
            <tbody>
              <tr><Th colSpan={2} className="bg-wiki-bg-subtle">Revenue</Th></tr>
              <Tr><Td>Gross Sales</Td><Td num>{fmt(pl.revenue.grossSales)}</Td></Tr>
              <Tr><Td className="pl-5">Less: Returns &amp; Allowances</Td><Td num>({fmt(pl.revenue.returns)})</Td></Tr>
              <Tr>
                <Td><strong>Net Revenue</strong></Td>
                <Td num><strong>{fmt(pl.revenue.netRevenue)}</strong></Td>
              </Tr>

              <tr><Th colSpan={2} className="bg-wiki-bg-subtle">Cost of Goods Sold</Th></tr>
              <Tr><Td>Cost of Goods Sold</Td><Td num>({fmt(pl.cogs)})</Td></Tr>
              <Tr>
                <Td><strong>Gross Profit</strong></Td>
                <Td num><strong>{fmt(pl.grossProfit)}</strong></Td>
              </Tr>
              <Tr>
                <Td className="text-[0.88em] text-[#555]">Gross Margin</Td>
                <Td num className="text-[0.88em] text-[#555]">{fmtP(pl.grossMarginPct)}</Td>
              </Tr>

              <tr><Th colSpan={2} className="bg-wiki-bg-subtle">Operating Expenses</Th></tr>
              {pl.opEx.map(e => (
                <Tr key={e.label}>
                  <Td className="pl-5">{e.label}</Td>
                  <Td num>({fmt(e.amount)})</Td>
                </Tr>
              ))}
              <Tr>
                <Td><strong>Total Operating Expenses</strong></Td>
                <Td num><strong>({fmt(pl.totalOpEx)})</strong></Td>
              </Tr>

              <Tr className="border-t-2 border-t-wiki-border">
                <Td><strong>Operating Income (Loss)</strong></Td>
                <Td num className={lossClass(pl.operatingIncome)}>
                  <strong>{loss(pl.operatingIncome)}</strong>
                </Td>
              </Tr>
              <Tr>
                <Td><strong>Net Income (Loss)</strong></Td>
                <Td num className={lossClass(pl.netIncome)}>
                  <strong>{loss(pl.netIncome)}</strong>
                </Td>
              </Tr>
            </tbody>
          </WikiTable>
        </Section>

        <Section title={`Balance Sheet — ${bs.date}`}>
          <WikiTable className="min-w-[360px]">
            <tbody>
              <tr><Th colSpan={2} className="bg-wiki-bg-subtle">Assets</Th></tr>
              <tr><Td colSpan={2} className="pl-3 text-[0.82em] text-[#555]">Current Assets</Td></tr>
              {bs.assets.current.map(a => (
                <Tr key={a.name}>
                  <Td className="pl-5">{a.name}</Td>
                  <Td num>{a.amount === 0 ? '—' : fmt(a.amount)}</Td>
                </Tr>
              ))}
              <Tr>
                <Td className="pl-3"><strong>Total Current Assets</strong></Td>
                <Td num><strong>{fmt(totalCurrentAssets)}</strong></Td>
              </Tr>
              <tr><Td colSpan={2} className="pl-3 text-[0.82em] text-[#555]">Fixed Assets</Td></tr>
              {bs.assets.fixed.map(a => (
                <Tr key={a.name}>
                  <Td className="pl-5">{a.name}</Td>
                  <Td num className={a.amount < 0 ? 'text-status-critical' : undefined}>
                    {a.amount < 0 ? `(${fmt(Math.abs(a.amount))})` : fmt(a.amount)}
                  </Td>
                </Tr>
              ))}
              <Tr>
                <Td className="pl-3"><strong>Net Fixed Assets</strong></Td>
                <Td num><strong>{fmt(totalFixedNet)}</strong></Td>
              </Tr>
              <Tr className="border-t-2 border-t-wiki-border">
                <Td><strong>Total Assets</strong></Td>
                <Td num><strong>{fmt(totalAssets)}</strong></Td>
              </Tr>

              <tr><Th colSpan={2} className="bg-wiki-bg-subtle">Liabilities</Th></tr>
              {bs.liabilities.current.map(a => (
                <Tr key={a.name}>
                  <Td className="pl-5">{a.name}</Td>
                  <Td num>{fmt(a.amount)}</Td>
                </Tr>
              ))}
              <Tr>
                <Td className="pl-3"><strong>Total Liabilities</strong></Td>
                <Td num><strong>{fmt(totalCurrentLiab)}</strong></Td>
              </Tr>

              <tr><Th colSpan={2} className="bg-wiki-bg-subtle">Equity</Th></tr>
              {bs.equity.map(a => (
                <Tr key={a.name}>
                  <Td className="pl-5">{a.name}</Td>
                  <Td num className={lossClass(a.amount)}>
                    {a.amount < 0 ? `(${fmt(Math.abs(a.amount))})` : fmt(a.amount)}
                  </Td>
                </Tr>
              ))}
              <Tr>
                <Td className="pl-3"><strong>Total Equity</strong></Td>
                <Td num><strong>{fmt(totalEquity)}</strong></Td>
              </Tr>
              <Tr className="border-t-2 border-t-wiki-border">
                <Td><strong>Total Liabilities + Equity</strong></Td>
                <Td num><strong>{fmt(totalCurrentLiab + totalEquity)}</strong></Td>
              </Tr>
            </tbody>
          </WikiTable>
          <Note spacing="mt-1" className="text-[0.82em]">
            {Math.abs(totalAssets - (totalCurrentLiab + totalEquity)) < 0.02
              ? <span className="text-status-ok-strong">Balance sheet balances ✓</span>
              : <span className="text-status-critical">Balance sheet out of balance</span>}
          </Note>
        </Section>
      </TwoCol>

      <Section title="Monthly P&L Comparison">
        <WikiTable>
          <thead>
            <tr>
              <Th>Period</Th>
              <Th num>Net Revenue</Th>
              <Th num>COGS</Th>
              <Th num>Gross Profit</Th>
              <Th num>Margin</Th>
              <Th num>OpEx</Th>
              <Th num>Net Income</Th>
            </tr>
          </thead>
          <tbody>
            {monthlyPL.map(row => (
              <Tr key={row.month}>
                <Td>
                  {row.month}
                  {row.note && <span className="text-[0.82em] text-[#555]"> ({row.note})</span>}
                </Td>
                <Td num>{fmt(row.netRevenue)}</Td>
                <Td num>{fmt(row.cogs)}</Td>
                <Td num>{fmt(row.grossProfit)}</Td>
                <Td num>{fmtP(row.grossPct)}</Td>
                <Td num>{fmt(row.opEx)}</Td>
                <Td num className={lossClass(row.netIncome)}>
                  <strong>{loss(row.netIncome)}</strong>
                </Td>
              </Tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <Tf>YTD Total</Tf>
              <Tf num>{fmt(monthlyPL.reduce((s, r) => s + r.netRevenue, 0))}</Tf>
              <Tf num>{fmt(monthlyPL.reduce((s, r) => s + r.cogs, 0))}</Tf>
              <Tf num>{fmt(monthlyPL.reduce((s, r) => s + r.grossProfit, 0))}</Tf>
              <Tf num>—</Tf>
              <Tf num>{fmt(monthlyPL.reduce((s, r) => s + r.opEx, 0))}</Tf>
              <Tf num className={cn(lossClass(monthlyPL.reduce((s, r) => s + r.netIncome, 0)))}>
                {loss(monthlyPL.reduce((s, r) => s + r.netIncome, 0))}
              </Tf>
            </tr>
          </tfoot>
        </WikiTable>
      </Section>
    </>
  );
}
