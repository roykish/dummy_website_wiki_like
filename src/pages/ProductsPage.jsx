import { useState, useMemo } from 'react';
import { allProducts } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import { cn } from '@/lib/utils';
import {
  PageHeader, FilterRow, FilterLabel, FilterSpacer, FilterResult,
  TableScroll, WikiTable, Tr, Th, Td, Tf, Note, statusClass,
} from '@/components/shared';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const fmt  = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });
const CATS = ['All', ...new Set(allProducts.map(p => p.category))].sort();

function stockClass(stock) {
  if (stock <= 10) return statusClass('critical');
  if (stock <= 20) return statusClass('low');
  return '';
}

export default function ProductsPage() {
  const [category, setCategory] = useState('All');
  const [search,   setSearch]   = useState('');
  const [sortCol,  setSortCol]  = useState('rank');
  const [sortDir,  setSortDir]  = useState('asc');

  const toggle = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  };

  const filtered = useMemo(() =>
    allProducts
      .filter(p =>
        (category === 'All' || p.category === category) &&
        (search === '' || p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        const v = x => typeof x[sortCol] === 'string' ? x[sortCol] : +x[sortCol];
        return sortDir === 'asc' ? (v(a) > v(b) ? 1 : -1) : (v(a) < v(b) ? 1 : -1);
      }),
    [category, search, sortCol, sortDir]
  );

  const pag = usePagination(filtered, 10);

  const handleFilter = (setter, value) => { setter(value); pag.setPage(1); };

  const SortTh = ({ col, label, num }) => (
    <Th num={num} onClick={() => toggle(col)} className="cursor-pointer select-none">
      {label}{sortCol === col ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''}
    </Th>
  );

  return (
    <>
      <PageHeader title="Products" meta={`Product catalogue · ${allProducts.length} active SKUs`} />

      <FilterRow>
        <FilterLabel>Search</FilterLabel>
        <Input
          type="text" value={search}
          onChange={e => handleFilter(setSearch, e.target.value)}
          placeholder="Name or SKU…"
          className="h-7 w-[180px] rounded-none border-wiki-border bg-white px-2 text-[13px] shadow-none"
        />
        <FilterLabel>Category</FilterLabel>
        <Select value={category} onValueChange={v => handleFilter(setCategory, v)}>
          <SelectTrigger className="h-7 min-w-28 rounded-none border-wiki-border bg-white px-2 text-[13px] shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-none border-wiki-border bg-white px-2.5 text-[13px] shadow-none"
          onClick={() => { setSearch(''); setCategory('All'); pag.setPage(1); }}
        >
          Reset
        </Button>
        <FilterSpacer />
        <FilterResult>{filtered.length} of {allProducts.length} products</FilterResult>
      </FilterRow>

      <TableScroll>
        <WikiTable>
          <thead>
            <tr>
              <SortTh col="rank"      label="#"            num />
              <SortTh col="sku"       label="SKU"          />
              <SortTh col="name"      label="Product Name" />
              <SortTh col="category"  label="Category"     />
              <SortTh col="unitPrice" label="Unit Price"   num />
              <SortTh col="sold"      label="Units Sold"   num />
              <SortTh col="revenue"   label="Revenue"      num />
              <SortTh col="stock"     label="Stock"        num />
            </tr>
          </thead>
          <tbody>
            {pag.slice.map(p => (
              <Tr key={p.sku}>
                <Td num>{p.rank}</Td>
                <Td><a href="#">{p.sku}</a></Td>
                <Td>{p.name}</Td>
                <Td>{p.category}</Td>
                <Td num>{fmt(p.unitPrice)}</Td>
                <Td num>{p.sold}</Td>
                <Td num>{fmt(p.revenue)}</Td>
                <Td num className={cn(stockClass(p.stock))}>{p.stock}</Td>
              </Tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <Tf colSpan={5}>Page subtotal</Tf>
              <Tf num>{pag.slice.reduce((a, p) => a + p.sold, 0)}</Tf>
              <Tf num>{fmt(pag.slice.reduce((a, p) => a + p.revenue, 0))}</Tf>
              <Tf></Tf>
            </tr>
          </tfoot>
        </WikiTable>
      </TableScroll>
      <Pagination {...pag} onPage={pag.setPage} />
      <Note spacing="mt-1">
        Click any column header to sort. <a href="#">Export CSV →</a>
      </Note>
    </>
  );
}
