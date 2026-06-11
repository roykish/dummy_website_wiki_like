import { allProducts } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import {
  PageHeader, Section, TableScroll, WikiTable, Tr, Th, Td, Tf,
} from '@/components/shared';

const fmt = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });

const catMap = {};
allProducts.forEach(p => {
  if (!catMap[p.category]) catMap[p.category] = { count: 0, sold: 0, revenue: 0, prices: [] };
  catMap[p.category].count++;
  catMap[p.category].sold    += p.sold;
  catMap[p.category].revenue += p.revenue;
  catMap[p.category].prices.push(p.unitPrice);
});

const categories = Object.entries(catMap).map(([name, v]) => ({
  name,
  count:   v.count,
  sold:    v.sold,
  revenue: +v.revenue.toFixed(2),
  avgPrice: +(v.prices.reduce((a, p) => a + p, 0) / v.prices.length).toFixed(2),
  minPrice: Math.min(...v.prices),
  maxPrice: Math.max(...v.prices),
})).sort((a, b) => b.revenue - a.revenue);

const totalRevenue = categories.reduce((a, c) => a + c.revenue, 0);

export default function CategoriesPage() {
  const pag = usePagination(categories, 10);

  return (
    <>
      <PageHeader
        title="Categories"
        meta={`${categories.length} categories · ${allProducts.length} total products`}
      />

      <Section title={`Category Overview — ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}>
        <TableScroll>
          <WikiTable>
            <thead>
              <tr>
                <Th>Category</Th>
                <Th num>Products</Th>
                <Th num>Units Sold</Th>
                <Th num>Revenue</Th>
                <Th num>Revenue Share</Th>
                <Th num>Avg. Price</Th>
                <Th num>Price Range</Th>
              </tr>
            </thead>
            <tbody>
              {pag.slice.map(c => (
                <Tr key={c.name}>
                  <Td><a href="#">{c.name}</a></Td>
                  <Td num>{c.count}</Td>
                  <Td num>{c.sold}</Td>
                  <Td num>{fmt(c.revenue)}</Td>
                  <Td num>{((c.revenue / totalRevenue) * 100).toFixed(1)}%</Td>
                  <Td num>{fmt(c.avgPrice)}</Td>
                  <Td num>{fmt(c.minPrice)} – {fmt(c.maxPrice)}</Td>
                </Tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <Tf>Total</Tf>
                <Tf num>{allProducts.length}</Tf>
                <Tf num>{allProducts.reduce((a, p) => a + p.sold, 0)}</Tf>
                <Tf num>{fmt(totalRevenue)}</Tf>
                <Tf num>100%</Tf>
                <Tf colSpan={2}></Tf>
              </tr>
            </tfoot>
          </WikiTable>
        </TableScroll>
        <Pagination {...pag} onPage={pag.setPage} />
      </Section>
    </>
  );
}
