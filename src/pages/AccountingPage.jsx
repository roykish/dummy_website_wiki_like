import { chartOfAccounts, plStatement, ledgerEntries, store } from '@/data/dummy';
import {
  PageHeader, AlertBox, KpiGrid, KpiCard, TwoCol, Section,
  TableScroll, WikiTable, Tr, Th, Td, Tf, Note,
} from '@/components/shared';

const fmt = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });

const TYPE_ORDER = ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'];

export default function AccountingPage({ navigate }) {
  const pl = plStatement;
  const recent = ledgerEntries.slice(0, 8);

  const totalDR = chartOfAccounts
    .filter(a => a.normalBalance === 'DR')
    .reduce((s, a) => s + a.balance, 0);
  const totalCR = chartOfAccounts
    .filter(a => a.normalBalance === 'CR')
    .reduce((s, a) => s + a.balance, 0);

  return (
    <>
      <PageHeader
        title="Accounting"
        meta={`${store.name} · ${pl.period} · ${pl.note}`}
      />

      {pl.netIncome < 0 && (
        <AlertBox>
          <strong>Net loss MTD: {fmt(Math.abs(pl.netIncome))}</strong> — Rent and fixed costs are
          billed for the full month while revenue reflects 11 days only.
        </AlertBox>
      )}

      <KpiGrid>
        <KpiCard
          label="Net Revenue MTD"
          value={fmt(pl.revenue.netRevenue)}
          sub={`${fmt(pl.revenue.grossSales)} gross · ${fmt(pl.revenue.returns)} returns`}
        />
        <KpiCard
          label="Gross Profit"
          value={fmt(pl.grossProfit)}
          sub={`${pl.grossMarginPct}% gross margin`}
        />
        <KpiCard
          label="Operating Expenses"
          value={fmt(pl.totalOpEx)}
          sub="Wages · Rent · Utilities · Other"
        />
        <KpiCard
          label="Net Income (Loss)"
          value={pl.netIncome < 0 ? `(${fmt(Math.abs(pl.netIncome))})` : fmt(pl.netIncome)}
          valueClassName={pl.netIncome < 0 ? 'text-status-critical-strong' : 'text-status-ok-strong'}
          sub="Month to date"
        />
      </KpiGrid>

      <TwoCol>
        <Section title="Trial Balance — June 11, 2026">
          <TableScroll>
            <WikiTable>
              <thead>
                <tr>
                  <Th className="w-[52px]">Code</Th>
                  <Th>Account</Th>
                  <Th>Type</Th>
                  <Th num>Debit</Th>
                  <Th num>Credit</Th>
                </tr>
              </thead>
              <tbody>
                {TYPE_ORDER.flatMap(type =>
                  chartOfAccounts
                    .filter(a => a.type === type)
                    .map(a => (
                      <Tr key={a.code}>
                        <Td className="text-[0.88em] text-[#555]">{a.code}</Td>
                        <Td>{a.name}</Td>
                        <Td className="text-[0.88em] text-[#555]">{a.type}</Td>
                        <Td num>{a.normalBalance === 'DR' ? fmt(a.balance) : ''}</Td>
                        <Td num>{a.normalBalance === 'CR' ? fmt(a.balance) : ''}</Td>
                      </Tr>
                    ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <Tf colSpan={3}>Totals</Tf>
                  <Tf num>{fmt(totalDR)}</Tf>
                  <Tf num>{fmt(totalCR)}</Tf>
                </tr>
              </tfoot>
            </WikiTable>
          </TableScroll>
          <Note spacing="mt-1" className="text-[0.82em]">
            Pre-closing trial balance. DR = {fmt(totalDR)} · CR = {fmt(totalCR)} ·{' '}
            {Math.abs(totalDR - totalCR) < 0.02
              ? <span className="text-status-ok-strong">Balanced ✓</span>
              : <span className="text-status-critical-strong">Out of balance</span>}
          </Note>
        </Section>

        <Section title="Recent Journal Entries">
          <WikiTable>
            <thead>
              <tr>
                <Th>Ref</Th>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th num>Amount</Th>
              </tr>
            </thead>
            <tbody>
              {recent.map(e => (
                <Tr key={e.id}>
                  <Td className="text-[0.88em] whitespace-nowrap text-wiki-blue">{e.id}</Td>
                  <Td className="text-[0.88em] whitespace-nowrap">{e.date}</Td>
                  <Td className="text-[0.88em]">{e.description}</Td>
                  <Td num>{fmt(e.amount)}</Td>
                </Tr>
              ))}
            </tbody>
          </WikiTable>
          <Note spacing="mt-1">
            <a href="#" onClick={ev => { ev.preventDefault(); navigate('accounting-ledger'); }}>
              View all journal entries →
            </a>
          </Note>

          <h2 className="mt-6 mb-2.5 border-b border-wiki-border pb-[3px] font-serif text-[1.15em] font-normal">
            Accounts Payable Outstanding
          </h2>
          <WikiTable>
            <thead>
              <tr>
                <Th>PO</Th>
                <Th>Supplier</Th>
                <Th>Due</Th>
                <Th num>Amount</Th>
              </tr>
            </thead>
            <tbody>
              <Tr>
                <Td>PO-0112</Td>
                <Td>NatureFoods</Td>
                <Td>June 13, 2026</Td>
                <Td num>{fmt(287.50)}</Td>
              </Tr>
              <Tr>
                <Td>PO-0111</Td>
                <Td>BevCo</Td>
                <Td>June 12, 2026</Td>
                <Td num>{fmt(512.00)}</Td>
              </Tr>
            </tbody>
            <tfoot>
              <tr>
                <Tf colSpan={3}>Total AP</Tf>
                <Tf num>{fmt(799.50)}</Tf>
              </tr>
            </tfoot>
          </WikiTable>
        </Section>
      </TwoCol>
    </>
  );
}
