import { useState } from 'react';
import { inventory, store } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import {
  PageHeader, AlertBox, FilterRow, FilterLabel, WikiButton,
  TableScroll, WikiTable, Tr, Th, Td, StatusText, statusClass, Note,
} from '@/components/shared';
import { cn } from '@/lib/utils';

export default function InventoryPage() {
  const [filter, setFilter] = useState('all');

  const critical = inventory.filter(i => i.status === 'critical');
  const low      = inventory.filter(i => i.status === 'low');
  const shown    = inventory.filter(i => filter === 'all' || i.status === filter);

  const pag = usePagination(shown, 10);

  const handleFilter = (f) => { setFilter(f); pag.setPage(1); };

  const label = (s) => s === 'critical' ? 'Critical' : s === 'low' ? 'Low' : 'Adequate';

  return (
    <>
      <PageHeader
        title="Inventory"
        meta={`${store.name} · Last sync: ${store.reportDate} at 21:00 · ${inventory.length} tracked SKUs`}
      />

      {critical.length > 0 && (
        <AlertBox critical>
          <strong>Critical stock ({critical.length} items):</strong>{' '}
          {critical.map(i => i.name).join(', ')}.
          Purchase orders should be raised immediately.
        </AlertBox>
      )}
      {low.length > 0 && (
        <AlertBox>
          <strong>Low stock ({low.length} items):</strong>{' '}
          {low.map(i => i.name).join(', ')}.
          These items are below their reorder point.
        </AlertBox>
      )}

      <FilterRow>
        <FilterLabel>Show</FilterLabel>
        {[
          { key: 'all',      label: `All (${inventory.length})` },
          { key: 'critical', label: `Critical (${critical.length})` },
          { key: 'low',      label: `Low (${low.length})` },
          { key: 'ok',       label: `Adequate (${inventory.filter(i => i.status === 'ok').length})` },
        ].map(f => (
          <WikiButton
            key={f.key}
            active={filter === f.key}
            onClick={() => handleFilter(f.key)}
          >
            {f.label}
          </WikiButton>
        ))}
      </FilterRow>

      <TableScroll>
        <WikiTable>
          <thead>
            <tr>
              <Th>SKU</Th>
              <Th>Product Name</Th>
              <Th>Supplier</Th>
              <Th num>Stock</Th>
              <Th num>Reorder Point</Th>
              <Th num>Difference</Th>
              <Th>Unit</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {pag.slice.map(item => {
              const diff = item.stock - item.reorder;
              return (
                <Tr key={item.sku}>
                  <Td><a href="#">{item.sku}</a></Td>
                  <Td>{item.name}</Td>
                  <Td>{item.supplier}</Td>
                  <Td num className={statusClass(item.status)}>{item.stock}</Td>
                  <Td num>{item.reorder}</Td>
                  <Td num className={cn(diff < 0 ? statusClass('critical') : statusClass('ok'))}>
                    {diff >= 0 ? '+' : ''}{diff}
                  </Td>
                  <Td>{item.unit}</Td>
                  <Td>
                    <StatusText status={item.status}>{label(item.status)}</StatusText>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </WikiTable>
      </TableScroll>
      <Pagination {...pag} onPage={pag.setPage} />
      <Note spacing="mt-1">
        <a href="#">Raise purchase order →</a> · <a href="#">Export stock report →</a>
      </Note>
    </>
  );
}
