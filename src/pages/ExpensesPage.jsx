import { useState } from 'react';
import { expenses, store } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import {
  PageHeader, KpiGrid, KpiCard, FilterRow, FilterLabel, WikiButton,
  TableScroll, WikiTable, Tr, Th, Td, Tf,
} from '@/components/shared';

const fmt = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });

const CATEGORIES = ['All', 'Wages', 'Rent', 'Utilities', 'Supplies', 'Marketing', 'Misc'];

const CAT_ACCOUNT = {
  Wages: '6010', Rent: '6020', Utilities: '6030',
  Supplies: '6040', Marketing: '6050', Misc: '6060',
};

export default function ExpensesPage() {
  const [cat, setCat] = useState('All');

  const juneExpenses = expenses.filter(e => e.date.includes('June 2026'));
  const catTotals = CATEGORIES.slice(1).map(c => ({
    label: c,
    total: juneExpenses.filter(e => e.category === c).reduce((s, e) => s + e.amount, 0),
  }));
  const juneTotalAll = juneExpenses.reduce((s, e) => s + e.amount, 0);

  const filtered = cat === 'All' ? expenses : expenses.filter(e => e.category === cat);
  const pag = usePagination(filtered, 10);

  const handleCat = (c) => { setCat(c); pag.setPage(1); };

  const statusClassName = (s) => s === 'Accrued' ? 'text-status-warning-strong' : 'text-status-ok-strong';

  return (
    <>
      <PageHeader
        title="Expenses"
        meta={`${store.name} · June 2026 MTD · ${juneExpenses.length} entries`}
      />

      <KpiGrid>
        {catTotals.map(c => (
          <KpiCard
            key={c.label}
            label={c.label}
            value={c.total > 0 ? fmt(c.total) : '—'}
            sub={`Acct ${CAT_ACCOUNT[c.label]}`}
          />
        ))}
        <KpiCard
          label="Total OpEx (Jun MTD)"
          value={fmt(juneTotalAll)}
          sub={`${juneExpenses.length} expense entries`}
        />
      </KpiGrid>

      <FilterRow>
        <FilterLabel>Category</FilterLabel>
        {CATEGORIES.map(c => (
          <WikiButton
            key={c}
            active={cat === c}
            onClick={() => handleCat(c)}
          >
            {c === 'All' ? `All (${expenses.length})` : `${c} (${expenses.filter(e => e.category === c).length})`}
          </WikiButton>
        ))}
      </FilterRow>

      <TableScroll>
        <WikiTable>
          <thead>
            <tr>
              <Th>Ref</Th>
              <Th>Date</Th>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th>Account</Th>
              <Th num>Amount</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {pag.slice.map(e => (
              <Tr key={e.id}>
                <Td className="text-[0.88em] whitespace-nowrap text-wiki-blue">{e.id}</Td>
                <Td className="text-[0.88em] whitespace-nowrap">{e.date}</Td>
                <Td className="text-[0.88em]">{e.category}</Td>
                <Td>{e.description}</Td>
                <Td className="text-[0.88em] text-[#555]">{e.account}</Td>
                <Td num>{fmt(e.amount)}</Td>
                <Td className={`text-[0.88em] ${statusClassName(e.status)}`}>{e.status}</Td>
              </Tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <Tf colSpan={5}>{filtered.length} entries shown</Tf>
              <Tf num>{fmt(filtered.reduce((s, e) => s + e.amount, 0))}</Tf>
              <Tf></Tf>
            </tr>
          </tfoot>
        </WikiTable>
      </TableScroll>
      <Pagination {...pag} onPage={pag.setPage} />
    </>
  );
}
