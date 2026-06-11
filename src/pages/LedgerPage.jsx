import { useState } from 'react';
import { ledgerEntries, store } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import { Input } from '@/components/ui/input';
import {
  PageHeader, FilterRow, FilterLabel, WikiButton,
  TableScroll, WikiTable, Tr, Th, Td, Tf,
} from '@/components/shared';

const fmt = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });

const FILTERS = [
  { key: 'all',       label: 'All Entries',  test: () => true },
  { key: 'asset',     label: 'Asset',        test: e => e.debitCode.startsWith('1') || e.creditCode.startsWith('1') },
  { key: 'liability', label: 'Liability',    test: e => e.debitCode.startsWith('2') || e.creditCode.startsWith('2') },
  { key: 'revenue',   label: 'Revenue',      test: e => e.debitCode.startsWith('4') || e.creditCode.startsWith('4') },
  { key: 'cogs',      label: 'COGS',         test: e => e.debitCode.startsWith('5') || e.creditCode.startsWith('5') },
  { key: 'expense',   label: 'Expense',      test: e => e.debitCode.startsWith('6') || e.creditCode.startsWith('6') },
];

export default function LedgerPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = ledgerEntries.filter(e => {
    const matchFilter = FILTERS.find(f => f.key === filter)?.test(e) ?? true;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      e.id.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.debitName.toLowerCase().includes(q) ||
      e.creditName.toLowerCase().includes(q) ||
      e.ref.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const pag = usePagination(filtered, 10);

  const totalDR = filtered.reduce((s, e) => s + e.amount, 0);

  const handleFilter = (k) => { setFilter(k); pag.setPage(1); };
  const handleSearch = (v) => { setSearch(v); pag.setPage(1); };

  return (
    <>
      <PageHeader
        title="General Journal"
        meta={`${store.name} · June 2026 · ${ledgerEntries.length} entries`}
      />

      <FilterRow>
        <FilterLabel>Filter</FilterLabel>
        {FILTERS.map(f => (
          <WikiButton key={f.key} active={filter === f.key} onClick={() => handleFilter(f.key)}>
            {f.label}
          </WikiButton>
        ))}
        <Input
          type="text"
          placeholder="Search description, ref…"
          value={search}
          onChange={e => handleSearch(e.target.value)}
          className="ml-2 h-auto w-auto rounded-none border-wiki-border px-1.5 py-[3px] text-[0.88em]"
        />
      </FilterRow>

      <TableScroll>
        <WikiTable>
          <thead>
            <tr>
              <Th>Ref</Th>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Debit Account</Th>
              <Th>Credit Account</Th>
              <Th num>Amount</Th>
              <Th>Source</Th>
            </tr>
          </thead>
          <tbody>
            {pag.slice.map(e => (
              <Tr key={e.id}>
                <Td className="text-[0.88em] whitespace-nowrap text-wiki-blue">{e.id}</Td>
                <Td className="text-[0.88em] whitespace-nowrap">{e.date}</Td>
                <Td>{e.description}</Td>
                <Td className="text-[0.88em]">
                  <span className="text-[#555]">{e.debitCode}</span> {e.debitName}
                </Td>
                <Td className="text-[0.88em]">
                  <span className="text-[#555]">{e.creditCode}</span> {e.creditName}
                </Td>
                <Td num>{fmt(e.amount)}</Td>
                <Td className="text-[0.82em] text-[#555]">{e.ref}</Td>
              </Tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <Tf colSpan={5}>Showing {filtered.length} entries</Tf>
              <Tf num>{fmt(totalDR)}</Tf>
              <Tf></Tf>
            </tr>
          </tfoot>
        </WikiTable>
      </TableScroll>
      <Pagination {...pag} onPage={pag.setPage} />
    </>
  );
}
