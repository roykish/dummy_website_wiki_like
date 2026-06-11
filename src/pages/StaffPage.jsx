import { staff, transactions, store, summary } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import {
  PageHeader, Section, TableScroll, WikiTable, Tr, Th, Td, Tf, StatusText, Note,
} from '@/components/shared';

const fmt = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });

export default function StaffPage() {
  const staffPag = usePagination(staff, 10);
  const actPag   = usePagination(transactions, 10);

  const totTx  = staff.reduce((a, s) => a + s.transactions, 0);
  const totRev = staff.reduce((a, s) => a + s.revenue, 0);
  const totRet = staff.reduce((a, s) => a + s.returns, 0);
  const other  = summary.totalTransactions - totTx;

  return (
    <>
      <PageHeader
        title="Staff"
        meta={`${store.name} · ${store.reportDate} · ${staff.length} staff on duty`}
      />

      <Section title={`Cashier Performance — ${store.reportDate}`}>
        <TableScroll>
          <WikiTable>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Shift</Th>
                <Th num>Transactions</Th>
                <Th num>Revenue</Th>
                <Th num>Avg. Transaction</Th>
                <Th num>Returns</Th>
              </tr>
            </thead>
            <tbody>
              {staffPag.slice.map(s => (
                <Tr key={s.id}>
                  <Td>{s.id}</Td>
                  <Td><a href="#">{s.name}</a></Td>
                  <Td>{s.role}</Td>
                  <Td>{s.shift}</Td>
                  <Td num>{s.transactions}</Td>
                  <Td num>{fmt(s.revenue)}</Td>
                  <Td num>{fmt(s.avgTx)}</Td>
                  <Td num>
                    <StatusText status={s.returns > 0 ? 'low' : 'ok'}>{s.returns}</StatusText>
                  </Td>
                </Tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <Tf colSpan={4}>Total / Average</Tf>
                <Tf num>{totTx}</Tf>
                <Tf num>{fmt(totRev)}</Tf>
                <Tf num>{fmt(totRev / totTx)}</Tf>
                <Tf num>{totRet}</Tf>
              </tr>
            </tfoot>
          </WikiTable>
        </TableScroll>
        <Pagination {...staffPag} onPage={staffPag.setPage} />
        <Note spacing="mt-1">
          {other} transaction{other !== 1 ? 's' : ''} during shift transitions are attributed
          to store account S-00 and not included above.
        </Note>
      </Section>

      <Section title="Recent Activity by Cashier">
        <TableScroll>
          <WikiTable>
            <thead>
              <tr>
                <Th>Transaction ID</Th>
                <Th>Time</Th>
                <Th>Cashier</Th>
                <Th num>Items</Th>
                <Th num>Total</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {actPag.slice.map(t => (
                <Tr key={t.id}>
                  <Td><a href="#">{t.id}</a></Td>
                  <Td>{t.time}</Td>
                  <Td>{t.cashier}</Td>
                  <Td num>{t.items}</Td>
                  <Td num>{fmt(t.total)}</Td>
                  <Td>
                    <StatusText status={t.status === 'Returned' ? 'critical' : 'ok'}>{t.status}</StatusText>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </WikiTable>
        </TableScroll>
        <Pagination {...actPag} onPage={actPag.setPage} />
      </Section>
    </>
  );
}
