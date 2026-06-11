import { useState } from 'react';
import { transactions, summary, store } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import { Button } from '@/components/ui/button';
import {
  PageHeader, FilterRow, FilterLabel, FilterSelect, FilterSpacer, FilterResult,
  TableScroll, WikiTable, Tr, Th, Td, Tf, StatusText, Note,
} from '@/components/shared';

const fmt = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });

const CASHIERS = ['All', ...new Set(transactions.map(t => t.cashier))];
const PAYMENTS = ['All', ...new Set(transactions.map(t => t.payment))];
const STATUSES = ['All', 'Complete', 'Returned'];

export default function TransactionsPage() {
  const [cashier, setCashier] = useState('All');
  const [payment, setPayment] = useState('All');
  const [status,  setStatus]  = useState('All');

  const filtered = transactions.filter(t =>
    (cashier === 'All' || t.cashier === cashier) &&
    (payment === 'All' || t.payment === payment) &&
    (status  === 'All' || t.status  === status)
  );

  const pag = usePagination(filtered, 10);

  const handleFilter = (setter, value) => {
    setter(value);
    pag.setPage(1);
  };

  const total = filtered.reduce((a, t) => a + t.total, 0);

  return (
    <>
      <PageHeader
        title="Transactions"
        meta={`${store.name} · ${store.reportDate} · ${summary.totalTransactions} transactions today`}
      />

      <FilterRow>
        <FilterLabel>Cashier</FilterLabel>
        <FilterSelect value={cashier} onValueChange={v => handleFilter(setCashier, v)} options={CASHIERS} />
        <FilterLabel>Payment</FilterLabel>
        <FilterSelect value={payment} onValueChange={v => handleFilter(setPayment, v)} options={PAYMENTS} />
        <FilterLabel>Status</FilterLabel>
        <FilterSelect value={status} onValueChange={v => handleFilter(setStatus, v)} options={STATUSES} />
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-none border-wiki-border bg-white px-2.5 text-[13px] shadow-none"
          onClick={() => { setCashier('All'); setPayment('All'); setStatus('All'); pag.setPage(1); }}
        >
          Reset
        </Button>
        <FilterSpacer />
        <FilterResult>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</FilterResult>
      </FilterRow>

      <TableScroll>
        <WikiTable>
          <thead>
            <tr>
              <Th>Transaction ID</Th>
              <Th>Time</Th>
              <Th>Cashier</Th>
              <Th num>Items</Th>
              <Th num>Total</Th>
              <Th>Payment Method</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {pag.slice.map(t => (
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
            {pag.slice.length === 0 && (
              <Tr>
                <Td colSpan={7} center className="text-wiki-text-secondary">
                  No transactions match the selected filters.
                </Td>
              </Tr>
            )}
          </tbody>
          {pag.slice.length > 0 && (
            <tfoot>
              <tr>
                <Tf colSpan={3}>Page subtotal ({pag.slice.length} transactions)</Tf>
                <Tf num>{pag.slice.reduce((a, t) => a + t.items, 0)}</Tf>
                <Tf num>{fmt(pag.slice.reduce((a, t) => a + t.total, 0))}</Tf>
                <Tf colSpan={2}></Tf>
              </tr>
            </tfoot>
          )}
        </WikiTable>
      </TableScroll>
      <Pagination {...pag} onPage={pag.setPage} />
      <Note>
        Full total for {filtered.length} filtered records: <strong>{fmt(total)}</strong> ·{' '}
        <a href="#">Export CSV →</a>
      </Note>
    </>
  );
}
