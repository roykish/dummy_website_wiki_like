import { useState, useMemo } from 'react';
import { allProducts } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import { Button } from '@/components/ui/button';
import {
  PageHeader, FilterRow, FilterLabel, FilterSelect, FilterSpacer, FilterResult,
  TableScroll, WikiTable, Tr, Th, Td, StatusText, Note,
} from '@/components/shared';

const fmt  = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });
const CATS = ['All', ...new Set(allProducts.map(p => p.category))].sort();

export default function PricingPage() {
  const [category, setCategory] = useState('All');
  const [sortCol,  setSortCol]  = useState('rank');
  const [sortDir,  setSortDir]  = useState('asc');

  const toggle = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  };

  const filtered = useMemo(() =>
    allProducts
      .filter(p => category === 'All' || p.category === category)
      .sort((a, b) => {
        const v = x => typeof x[sortCol] === 'string' ? x[sortCol] : +x[sortCol];
        return sortDir === 'asc' ? (v(a) > v(b) ? 1 : -1) : (v(a) < v(b) ? 1 : -1);
      }),
    [category, sortCol, sortDir]
  );

  const pag = usePagination(filtered, 10);

  const SortTh = ({ col, label, num }) => (
    <Th num={num} onClick={() => toggle(col)} className="cursor-pointer select-none">
      {label}{sortCol === col ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''}
    </Th>
  );

  return (
    <>
      <PageHeader
        title="Price List"
        meta={`Current pricing with cost and margin · ${allProducts.length} products`}
      />

      <FilterRow>
        <FilterLabel>Category</FilterLabel>
        <FilterSelect value={category} onValueChange={v => { setCategory(v); pag.setPage(1); }} options={CATS} />
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-none border-wiki-border bg-white px-2.5 text-[13px] shadow-none"
          onClick={() => { setCategory('All'); pag.setPage(1); }}
        >
          Reset
        </Button>
        <FilterSpacer />
        <FilterResult>{filtered.length} products</FilterResult>
      </FilterRow>

      <TableScroll>
        <WikiTable>
          <thead>
            <tr>
              <SortTh col="sku"       label="SKU"       />
              <SortTh col="name"      label="Product"   />
              <SortTh col="category"  label="Category"  />
              <SortTh col="cost"      label="Cost"      num />
              <SortTh col="unitPrice" label="Sell Price" num />
              <Th num>Margin $</Th>
              <Th num>Margin %</Th>
            </tr>
          </thead>
          <tbody>
            {pag.slice.map(p => {
              const margin    = p.unitPrice - p.cost;
              const marginPct = (margin / p.unitPrice * 100).toFixed(1);
              return (
                <Tr key={p.sku}>
                  <Td><a href="#">{p.sku}</a></Td>
                  <Td>{p.name}</Td>
                  <Td>{p.category}</Td>
                  <Td num>{fmt(p.cost)}</Td>
                  <Td num>{fmt(p.unitPrice)}</Td>
                  <Td num>{fmt(margin)}</Td>
                  <Td num>
                    <StatusText status={+marginPct < 35 ? 'low' : 'ok'}>{marginPct}%</StatusText>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </WikiTable>
      </TableScroll>
      <Pagination {...pag} onPage={pag.setPage} />
      <Note spacing="mt-1">
        Margins below 35% are flagged. <a href="#">Export price list →</a>
      </Note>
    </>
  );
}
