import { useState } from 'react';
import { purchaseOrders, store } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import {
  PageHeader, AlertBox, FilterRow, FilterLabel, FilterSelect, FilterSpacer, FilterResult,
  TableScroll, WikiTable, Tr, Th, Td, Tf, Note, statusClass,
} from '@/components/shared';
import { Button } from '@/components/ui/button';

const fmt = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });

const STATUS_OPTS = ['All', 'Pending', 'In Transit', 'Received'];

function poStatusClass(s) {
  if (s === 'Pending')    return statusClass('low');
  if (s === 'In Transit') return statusClass('ok');
  return '';
}

export default function PurchaseOrdersPage() {
  const [status, setStatus] = useState('All');

  const filtered = purchaseOrders.filter(p => status === 'All' || p.status === status);
  const pag      = usePagination(filtered, 10);

  const pending   = purchaseOrders.filter(p => p.status === 'Pending').length;
  const inTransit = purchaseOrders.filter(p => p.status === 'In Transit').length;

  return (
    <>
      <PageHeader
        title="Purchase Orders"
        meta={`${store.name} · ${purchaseOrders.length} orders on record`}
      />

      {(pending + inTransit) > 0 && (
        <AlertBox>
          <strong>{pending} pending</strong> and <strong>{inTransit} in-transit</strong> orders require attention.
        </AlertBox>
      )}

      <FilterRow>
        <FilterLabel>Status</FilterLabel>
        <FilterSelect value={status} onValueChange={v => { setStatus(v); pag.setPage(1); }} options={STATUS_OPTS} />
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-none border-wiki-border bg-white px-2.5 text-[13px] shadow-none"
          onClick={() => { setStatus('All'); pag.setPage(1); }}
        >
          Reset
        </Button>
        <FilterSpacer />
        <FilterResult>{filtered.length} orders</FilterResult>
      </FilterRow>

      <TableScroll>
        <WikiTable>
          <thead>
            <tr>
              <Th>Order ID</Th>
              <Th>Date Placed</Th>
              <Th>Supplier</Th>
              <Th num>Line Items</Th>
              <Th num>Total</Th>
              <Th>Expected</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {pag.slice.map(po => (
              <Tr key={po.id}>
                <Td><a href="#">{po.id}</a></Td>
                <Td>{po.date}</Td>
                <Td><a href="#">{po.supplier}</a></Td>
                <Td num>{po.items}</Td>
                <Td num>{fmt(po.total)}</Td>
                <Td>{po.expected}</Td>
                <Td className={poStatusClass(po.status)}>{po.status}</Td>
              </Tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <Tf colSpan={3}>Total ({filtered.length} orders)</Tf>
              <Tf num>{pag.slice.reduce((a, p) => a + p.items, 0)}</Tf>
              <Tf num>{fmt(pag.slice.reduce((a, p) => a + p.total, 0))}</Tf>
              <Tf colSpan={2}></Tf>
            </tr>
          </tfoot>
        </WikiTable>
      </TableScroll>
      <Pagination {...pag} onPage={pag.setPage} />
      <Note spacing="mt-1"><a href="#">Create new purchase order →</a></Note>
    </>
  );
}
