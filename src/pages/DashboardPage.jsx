import { summary, transactions, allProducts, staff, inventory, store } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import {
  PageHeader, KpiGrid, KpiCard, AlertBox, Section, TwoCol,
  TableScroll, WikiTable, Tr, Th, Td, Tf, StatusText, Note,
} from '@/components/shared';

const fmt = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });

export default function DashboardPage({ navigate }) {
  const txPag   = usePagination(transactions, 10);
  const prodPag = usePagination(allProducts.slice(0, 10), 5);
  const alerts  = inventory.filter(i => i.status !== 'ok');

  return (
    <>
      <PageHeader
        title="Dashboard"
        meta={`${store.name} · ${store.address} · ${store.reportDate} · Shift: ${store.shift}`}
      />

      <KpiGrid>
        <KpiCard
          label="Net Revenue"
          value={fmt(summary.netRevenue)}
          sub={`Gross: ${fmt(summary.totalRevenue)} · Tax: ${fmt(summary.taxCollected)}`}
        />
        <KpiCard
          label="Transactions"
          value={summary.totalTransactions}
          sub={`${summary.returns} returns · ${fmt(summary.returnValue)} refunded`}
        />
        <KpiCard
          label="Items Sold"
          value={summary.totalItemsSold}
          sub={`${(summary.totalItemsSold / summary.totalTransactions).toFixed(1)} items per transaction`}
        />
        <KpiCard
          label="Avg. Transaction"
          value={fmt(summary.avgTransaction)}
          sub={`${staff.length} cashiers active today`}
        />
      </KpiGrid>

      {alerts.length > 0 && (
        <AlertBox critical={alerts.some(i => i.status === 'critical')}>
          <strong>Inventory alert:</strong>{' '}
          {alerts.filter(i => i.status === 'critical').length} items critically low,{' '}
          {alerts.filter(i => i.status === 'low').length} items below reorder point.{' '}
          <a onClick={() => navigate('inventory')} className="cursor-pointer">View inventory →</a>
        </AlertBox>
      )}

      <Section title="Recent Transactions">
        <TableScroll>
          <WikiTable>
            <thead>
              <tr>
                <Th>Transaction ID</Th>
                <Th>Time</Th>
                <Th>Cashier</Th>
                <Th num>Items</Th>
                <Th num>Total</Th>
                <Th>Payment</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {txPag.slice.map(t => (
                <Tr key={t.id}>
                  <Td><a href="#">{t.id}</a></Td>
                  <Td>{t.time}</Td>
                  <Td>{t.cashier}</Td>
                  <Td num>{t.items}</Td>
                  <Td num>{fmt(t.total)}</Td>
                  <Td>{t.payment}</Td>
                  <Td>
                    <StatusText status={t.status === 'Returned' ? 'critical' : 'ok'}>{t.status}</StatusText>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </WikiTable>
        </TableScroll>
        <Pagination {...txPag} onPage={txPag.setPage} />
        <Note>
          <a onClick={() => navigate('transactions')} className="cursor-pointer">View all {summary.totalTransactions} transactions →</a>
        </Note>
      </Section>

      <TwoCol>
        <Section title="Top Products Today">
          <WikiTable>
            <thead>
              <tr>
                <Th>#</Th>
                <Th>Product</Th>
                <Th>Category</Th>
                <Th num>Sold</Th>
                <Th num>Revenue</Th>
              </tr>
            </thead>
            <tbody>
              {prodPag.slice.map(p => (
                <Tr key={p.sku}>
                  <Td num>{p.rank}</Td>
                  <Td><a href="#">{p.name}</a></Td>
                  <Td>{p.category}</Td>
                  <Td num>{p.sold}</Td>
                  <Td num>{fmt(p.revenue)}</Td>
                </Tr>
              ))}
            </tbody>
          </WikiTable>
          <Pagination {...prodPag} onPage={prodPag.setPage} />
          <Note>
            <a onClick={() => navigate('products')} className="cursor-pointer">View all products →</a>
          </Note>
        </Section>

        <Section title="Staff on Duty">
          <WikiTable>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Shift</Th>
                <Th num>TX</Th>
                <Th num>Revenue</Th>
              </tr>
            </thead>
            <tbody>
              {staff.map(s => (
                <Tr key={s.id}>
                  <Td><a href="#">{s.name}</a></Td>
                  <Td>{s.role}</Td>
                  <Td>{s.shift}</Td>
                  <Td num>{s.transactions}</Td>
                  <Td num>{fmt(s.revenue)}</Td>
                </Tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <Tf colSpan={3}>Total</Tf>
                <Tf num>{staff.reduce((a, s) => a + s.transactions, 0)}</Tf>
                <Tf num>{fmt(staff.reduce((a, s) => a + s.revenue, 0))}</Tf>
              </tr>
            </tfoot>
          </WikiTable>
        </Section>
      </TwoCol>
    </>
  );
}
