import { returns, store } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import {
  PageHeader, AlertBox, KpiGrid, KpiCard, Section, TableScroll, WikiTable, Tr, Th, Td, Tf, StatusText,
} from '@/components/shared';

const fmt = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });

const totalRefunded = returns.reduce((a, r) => a + r.total, 0);
const pending = returns.filter(r => r.status === 'Pending');

export default function ReturnsPage() {
  const pag = usePagination(returns, 10);

  return (
    <>
      <PageHeader
        title="Returns & Refunds"
        meta={`${store.name} · ${returns.length} returns on record · Total refunded: ${fmt(totalRefunded)}`}
      />

      {pending.length > 0 && (
        <AlertBox>
          <strong>Pending refunds ({pending.length}):</strong>{' '}
          {pending.map(r => r.id).join(', ')} — awaiting approval.
        </AlertBox>
      )}

      <KpiGrid className="grid-cols-3 min-[961px]:grid-cols-3">
        <KpiCard label="Total Returns" value={returns.length} sub="Last 7 days" />
        <KpiCard label="Total Refunded" value={fmt(totalRefunded)} sub="Across all returns" />
        <KpiCard label="Pending" value={pending.length} sub="Awaiting approval" />
      </KpiGrid>

      <Section title="Return Log">
        <TableScroll>
          <WikiTable>
            <thead>
              <tr>
                <Th>Return ID</Th>
                <Th>Transaction</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Cashier</Th>
                <Th>Item</Th>
                <Th num>Qty</Th>
                <Th num>Refund</Th>
                <Th>Reason</Th>
                <Th>Refund Method</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {pag.slice.map(r => (
                <Tr key={r.id}>
                  <Td><a href="#">{r.id}</a></Td>
                  <Td><a href="#">{r.txId}</a></Td>
                  <Td>{r.date}</Td>
                  <Td>{r.time}</Td>
                  <Td>{r.cashier}</Td>
                  <Td>{r.item}</Td>
                  <Td num>{r.qty}</Td>
                  <Td num>{fmt(r.total)}</Td>
                  <Td>{r.reason}</Td>
                  <Td>{r.refundMethod}</Td>
                  <Td>
                    <StatusText status={r.status === 'Pending' ? 'low' : 'ok'}>{r.status}</StatusText>
                  </Td>
                </Tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <Tf colSpan={7}>Page subtotal</Tf>
                <Tf num>{fmt(pag.slice.reduce((a, r) => a + r.total, 0))}</Tf>
                <Tf colSpan={3}></Tf>
              </tr>
            </tfoot>
          </WikiTable>
        </TableScroll>
        <Pagination {...pag} onPage={pag.setPage} />
      </Section>
    </>
  );
}
