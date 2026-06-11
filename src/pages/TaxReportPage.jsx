import { allProducts, paymentMethods, summary, store } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import {
  PageHeader, KpiGrid, KpiCard, Section, TwoCol, WikiTable, Tr, Th, Td, Tf, Note,
} from '@/components/shared';

const fmt = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });
const TAX = 0.09;

// Tax by product category
const catTax = {};
allProducts.forEach(p => {
  if (!catTax[p.category]) catTax[p.category] = { revenue: 0 };
  catTax[p.category].revenue += p.revenue;
});
const categoryRows = Object.entries(catTax)
  .map(([cat, v]) => ({
    cat,
    taxableAmount: +(v.revenue / 1.09).toFixed(2),
    taxAmount:     +(v.revenue / 1.09 * TAX).toFixed(2),
    grossAmount:   +v.revenue.toFixed(2),
  }))
  .sort((a, b) => b.taxAmount - a.taxAmount);

export default function TaxReportPage() {
  const catPag = usePagination(categoryRows, 10);
  const pmtPag = usePagination(paymentMethods, 10);

  return (
    <>
      <PageHeader
        title="Tax Report"
        meta={`${store.name} · ${store.reportDate} · Tax ID: ${store.taxId} · Rate: 9% HST`}
      />

      <KpiGrid className="grid-cols-3 min-[961px]:grid-cols-3">
        <KpiCard
          label="Gross Revenue"
          value={fmt(summary.totalRevenue)}
          sub="Before tax extraction"
        />
        <KpiCard
          label="Tax Collected"
          value={fmt(summary.taxCollected)}
          sub="HST @ 9%"
        />
        <KpiCard
          label="Net (excl. tax)"
          value={fmt(summary.totalRevenue - summary.taxCollected)}
          sub="Taxable base"
        />
      </KpiGrid>

      <TwoCol>
        <Section title="Tax by Product Category">
          <WikiTable>
            <thead>
              <tr>
                <Th>Category</Th>
                <Th num>Gross Sales</Th>
                <Th num>Taxable Base</Th>
                <Th num>HST (9%)</Th>
              </tr>
            </thead>
            <tbody>
              {catPag.slice.map(r => (
                <Tr key={r.cat}>
                  <Td>{r.cat}</Td>
                  <Td num>{fmt(r.grossAmount)}</Td>
                  <Td num>{fmt(r.taxableAmount)}</Td>
                  <Td num>{fmt(r.taxAmount)}</Td>
                </Tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <Tf>Total</Tf>
                <Tf num>{fmt(categoryRows.reduce((a, r) => a + r.grossAmount, 0))}</Tf>
                <Tf num>{fmt(categoryRows.reduce((a, r) => a + r.taxableAmount, 0))}</Tf>
                <Tf num>{fmt(categoryRows.reduce((a, r) => a + r.taxAmount, 0))}</Tf>
              </tr>
            </tfoot>
          </WikiTable>
          <Pagination {...catPag} onPage={catPag.setPage} />
        </Section>

        <Section title="Tax by Payment Method">
          <WikiTable>
            <thead>
              <tr>
                <Th>Method</Th>
                <Th num>Amount Collected</Th>
                <Th num>Tax Portion</Th>
                <Th num>Share</Th>
              </tr>
            </thead>
            <tbody>
              {pmtPag.slice.map(p => {
                const taxPortion = +(p.amount / 1.09 * TAX).toFixed(2);
                return (
                  <Tr key={p.method}>
                    <Td>{p.method}</Td>
                    <Td num>{fmt(p.amount)}</Td>
                    <Td num>{fmt(taxPortion)}</Td>
                    <Td num>{p.pct}%</Td>
                  </Tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <Tf>Total</Tf>
                <Tf num>{fmt(summary.totalRevenue)}</Tf>
                <Tf num>{fmt(summary.taxCollected)}</Tf>
                <Tf num>100%</Tf>
              </tr>
            </tfoot>
          </WikiTable>
          <Pagination {...pmtPag} onPage={pmtPag.setPage} />
          <Note spacing="mt-1">Tax figures are extracted from tax-inclusive prices. <a href="#">Export for filing →</a></Note>
        </Section>
      </TwoCol>
    </>
  );
}
