import { monthlyStats, store } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import {
  PageHeader, KpiGrid, KpiCard, Section,
  TableScroll, WikiTable, Tr, Th, Td, Tf, BarSpark, Note,
} from '@/components/shared';

const fmt  = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });
const fmtN = (n) => n.toLocaleString('en-US');

const ytdRevenue      = monthlyStats.reduce((a, m) => a + m.revenue, 0);
const ytdTransactions = monthlyStats.reduce((a, m) => a + m.transactions, 0);
const ytdReturns      = monthlyStats.reduce((a, m) => a + m.returns, 0);
const PEAK = Math.max(...monthlyStats.map(m => m.revenue));

export default function MonthlyReportPage() {
  const pag = usePagination(monthlyStats, 10);

  return (
    <>
      <PageHeader
        title="Monthly Summary"
        meta={`${store.name} · Year to date: January 2026 – June 2026`}
      />

      <KpiGrid>
        <KpiCard
          label="YTD Revenue"
          value={fmt(ytdRevenue)}
          sub="Jan – Jun 2026"
        />
        <KpiCard
          label="YTD Transactions"
          value={fmtN(ytdTransactions)}
          sub={`Avg ${fmt(ytdRevenue / ytdTransactions)} per tx`}
        />
        <KpiCard
          label="Best Month"
          value="May"
          sub={fmt(monthlyStats[4].revenue)}
        />
        <KpiCard
          label="YTD Returns"
          value={ytdReturns}
          sub="Across all months"
        />
      </KpiGrid>

      <Section title="Month-by-Month Breakdown">
        <TableScroll>
          <WikiTable>
            <thead>
              <tr>
                <Th>Month</Th>
                <Th num>Revenue</Th>
                <Th num>Transactions</Th>
                <Th num>Avg. Transaction</Th>
                <Th num>Items Sold</Th>
                <Th num>Returns</Th>
                <Th className="w-[22%]">Volume</Th>
                <Th>Note</Th>
              </tr>
            </thead>
            <tbody>
              {pag.slice.map(m => {
                const pct = ((m.revenue / PEAK) * 100).toFixed(1);
                return (
                  <Tr key={m.month}>
                    <Td>{m.month}</Td>
                    <Td num>{fmt(m.revenue)}</Td>
                    <Td num>{fmtN(m.transactions)}</Td>
                    <Td num>{fmt(m.avgTx)}</Td>
                    <Td num>{fmtN(m.itemsSold)}</Td>
                    <Td num>{m.returns}</Td>
                    <Td>
                      <BarSpark pct={pct} maxWidth={160} />
                    </Td>
                    <Td className="text-[0.88em] text-wiki-text-secondary">{m.note ?? ''}</Td>
                  </Tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <Tf>YTD Total</Tf>
                <Tf num>{fmt(ytdRevenue)}</Tf>
                <Tf num>{fmtN(ytdTransactions)}</Tf>
                <Tf num>{fmt(ytdRevenue / ytdTransactions)}</Tf>
                <Tf num>{fmtN(monthlyStats.reduce((a, m) => a + m.itemsSold, 0))}</Tf>
                <Tf num>{ytdReturns}</Tf>
                <Tf colSpan={2}></Tf>
              </tr>
            </tfoot>
          </WikiTable>
        </TableScroll>
        <Pagination {...pag} onPage={pag.setPage} />
      </Section>
    </>
  );
}
