import { hourlySales, paymentMethods, allProducts, summary, store } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import {
  PageHeader, Section, TwoCol, TableScroll, WikiTable, Tr, Th, Td, Tf, Note, BarSpark,
} from '@/components/shared';

const fmt  = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });
const PEAK = Math.max(...hourlySales.map(h => h.revenue));

export default function ReportsPage() {
  const hourlyPag = usePagination(hourlySales, 10);

  const totTx  = hourlySales.reduce((a, h) => a + h.transactions, 0);
  const totRev = hourlySales.reduce((a, h) => a + h.revenue, 0);

  const catMap = {};
  allProducts.forEach(p => {
    if (!catMap[p.category]) catMap[p.category] = { sold: 0, revenue: 0 };
    catMap[p.category].sold    += p.sold;
    catMap[p.category].revenue += p.revenue;
  });
  const categories = Object.entries(catMap)
    .map(([cat, v]) => ({ cat, ...v }))
    .sort((a, b) => b.revenue - a.revenue);
  const catPag  = usePagination(categories, 10);
  const catTotal = categories.reduce((a, c) => a + c.revenue, 0);

  return (
    <>
      <PageHeader
        title="Reports"
        meta={`${store.name} · ${store.reportDate} · Generated: ${store.reportGenerated}`}
      />

      <Section title="Daily Summary">
        <WikiTable className="w-auto min-w-[380px]">
          <tbody>
            <tr><Th>Gross Revenue</Th><Td num>{fmt(summary.totalRevenue)}</Td></tr>
            <tr><Th>Returns ({summary.returns})</Th><Td num>−{fmt(summary.returnValue)}</Td></tr>
            <tr><Th>Net Revenue</Th><Td num><strong>{fmt(summary.netRevenue)}</strong></Td></tr>
            <tr><Th>Tax Collected (9% HST)</Th><Td num>{fmt(summary.taxCollected)}</Td></tr>
            <tr><Th>Total Transactions</Th><Td num>{summary.totalTransactions}</Td></tr>
            <tr><Th>Total Items Sold</Th><Td num>{summary.totalItemsSold}</Td></tr>
            <tr><Th>Average Transaction Value</Th><Td num>{fmt(summary.avgTransaction)}</Td></tr>
            <tr><Th>Items per Transaction (avg.)</Th><Td num>{(summary.totalItemsSold / summary.totalTransactions).toFixed(1)}</Td></tr>
          </tbody>
        </WikiTable>
      </Section>

      <TwoCol>
        <Section title="Payment Methods">
          <WikiTable>
            <thead>
              <tr>
                <Th>Method</Th>
                <Th num>Transactions</Th>
                <Th num>Amount</Th>
                <Th num>Share</Th>
              </tr>
            </thead>
            <tbody>
              {paymentMethods.map(p => (
                <Tr key={p.method}>
                  <Td>{p.method}</Td>
                  <Td num>{p.count}</Td>
                  <Td num>{fmt(p.amount)}</Td>
                  <Td num>{p.pct}%</Td>
                </Tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <Tf>Total</Tf>
                <Tf num>{summary.totalTransactions}</Tf>
                <Tf num>{fmt(summary.totalRevenue)}</Tf>
                <Tf num>100%</Tf>
              </tr>
            </tfoot>
          </WikiTable>
        </Section>

        <Section title="Revenue by Category">
          <WikiTable>
            <thead>
              <tr>
                <Th>Category</Th>
                <Th num>Units Sold</Th>
                <Th num>Revenue</Th>
                <Th num>Share</Th>
              </tr>
            </thead>
            <tbody>
              {catPag.slice.map(c => (
                <Tr key={c.cat}>
                  <Td>{c.cat}</Td>
                  <Td num>{c.sold}</Td>
                  <Td num>{fmt(c.revenue)}</Td>
                  <Td num>{((c.revenue / catTotal) * 100).toFixed(1)}%</Td>
                </Tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <Tf>Total</Tf>
                <Tf num>{allProducts.reduce((a, p) => a + p.sold, 0)}</Tf>
                <Tf num>{fmt(catTotal)}</Tf>
                <Tf num>100%</Tf>
              </tr>
            </tfoot>
          </WikiTable>
          <Pagination {...catPag} onPage={catPag.setPage} />
        </Section>
      </TwoCol>

      <Section title="Hourly Sales Breakdown">
        <Note spacing="" className="mb-2">
          Peak hour: <strong>12:00–13:00</strong> with 48 transactions and {fmt(1243.60)} revenue.
        </Note>
        <TableScroll>
          <WikiTable>
            <thead>
              <tr>
                <Th>Hour</Th>
                <Th num>Transactions</Th>
                <Th num>Revenue</Th>
                <Th className="w-[40%]">Relative Volume</Th>
              </tr>
            </thead>
            <tbody>
              {hourlyPag.slice.map(h => {
                const pct = ((h.revenue / PEAK) * 100).toFixed(1);
                return (
                  <Tr key={h.hour}>
                    <Td>{h.hour}</Td>
                    <Td num>{h.transactions}</Td>
                    <Td num>{fmt(h.revenue)}</Td>
                    <Td>
                      <BarSpark pct={pct} />
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <Tf>Total</Tf>
                <Tf num>{totTx}</Tf>
                <Tf num>{fmt(totRev)}</Tf>
                <Tf></Tf>
              </tr>
            </tfoot>
          </WikiTable>
        </TableScroll>
        <Pagination {...hourlyPag} onPage={hourlyPag.setPage} />
      </Section>
    </>
  );
}
