import { useState } from 'react';
import { allProducts, store } from '@/data/dummy';
import { Input } from '@/components/ui/input';
import {
  PageHeader, Section, TwoCol, FilterRow, FilterLabel, WikiButton,
  WikiTable, Tr, Th, Td, AlertBox,
} from '@/components/shared';

const fmt = (n) => n.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' });
const TAX_RATE = 0.09;

const INITIAL_CART = [
  { ...allProducts[0], qty: 2 },
  { ...allProducts[5], qty: 1 },
  { ...allProducts[7], qty: 3 },
];

export default function NewTransactionPage() {
  const [cart,    setCart]    = useState(INITIAL_CART);
  const [search,  setSearch]  = useState('');
  const [payment, setPayment] = useState('Credit Card');
  const [done,    setDone]    = useState(false);

  const results = search.length > 1
    ? allProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())).slice(0, 6)
    : [];

  const addToCart = (p) => {
    setCart(prev => {
      const idx = prev.findIndex(c => c.sku === p.sku);
      if (idx >= 0) return prev.map((c, i) => i === idx ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...p, qty: 1 }];
    });
    setSearch('');
  };

  const updateQty = (sku, qty) => {
    if (qty < 1) return removeItem(sku);
    setCart(prev => prev.map(c => c.sku === sku ? { ...c, qty } : c));
  };

  const removeItem = (sku) => setCart(prev => prev.filter(c => c.sku !== sku));

  const subtotal  = cart.reduce((a, c) => a + c.unitPrice * c.qty, 0);
  const tax       = subtotal * TAX_RATE;
  const total     = subtotal + tax;

  if (done) return (
    <>
      <PageHeader title="New Transaction" />
      <AlertBox success>
        <strong>Transaction T-24702 processed successfully.</strong>{' '}
        Total charged: {fmt(total)} via {payment}. Receipt printed.
        <br /><a href="#" onClick={() => { setCart(INITIAL_CART); setDone(false); }}>Start new transaction →</a>
      </AlertBox>
    </>
  );

  return (
    <>
      <PageHeader
        title="New Transaction"
        meta={`${store.name} · Terminal 1 · Cashier: Jennifer Park · Next ID: T-24702`}
      />

      <TwoCol>
        {/* Left: product search + cart */}
        <div>
          <Section title="Add Products">
            <FilterRow>
              <FilterLabel>Search</FilterLabel>
              <Input
                type="text" value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Product name or SKU…"
                className="h-7 w-[260px] rounded-none border-wiki-border bg-white px-2 text-[13px] shadow-none"
              />
            </FilterRow>
            {results.length > 0 && (
              <WikiTable className="mt-0">
                <thead>
                  <tr><Th>SKU</Th><Th>Product</Th><Th num>Price</Th><Th num>Stock</Th><Th></Th></tr>
                </thead>
                <tbody>
                  {results.map(p => (
                    <Tr key={p.sku}>
                      <Td>{p.sku}</Td>
                      <Td>{p.name}</Td>
                      <Td num>{fmt(p.unitPrice)}</Td>
                      <Td num>{p.stock}</Td>
                      <Td><WikiButton onClick={() => addToCart(p)}>+ Add</WikiButton></Td>
                    </Tr>
                  ))}
                </tbody>
              </WikiTable>
            )}
          </Section>

          <Section title={`Cart (${cart.reduce((a, c) => a + c.qty, 0)} items)`}>
            <WikiTable>
              <thead>
                <tr>
                  <Th>SKU</Th>
                  <Th>Product</Th>
                  <Th num>Price</Th>
                  <Th num>Qty</Th>
                  <Th num>Line Total</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {cart.map(c => (
                  <Tr key={c.sku}>
                    <Td>{c.sku}</Td>
                    <Td>{c.name}</Td>
                    <Td num>{fmt(c.unitPrice)}</Td>
                    <Td num>
                      <Input
                        type="number" min="1" value={c.qty}
                        onChange={e => updateQty(c.sku, +e.target.value)}
                        className="h-auto w-12 rounded-none border-wiki-border px-1 py-0.5 text-right font-[inherit] shadow-none"
                      />
                    </Td>
                    <Td num>{fmt(c.unitPrice * c.qty)}</Td>
                    <Td><a onClick={() => removeItem(c.sku)} className="cursor-pointer text-status-critical">✕</a></Td>
                  </Tr>
                ))}
                {cart.length === 0 && (
                  <Tr><Td colSpan={6} center className="text-wiki-text-faint">Cart is empty</Td></Tr>
                )}
              </tbody>
            </WikiTable>
          </Section>
        </div>

        {/* Right: totals + payment */}
        <div>
          <Section title="Order Summary">
            <WikiTable className="w-auto min-w-[280px]">
              <tbody>
                <tr><Th>Subtotal</Th><Td num>{fmt(subtotal)}</Td></tr>
                <tr><Th>Tax (9% HST)</Th><Td num>{fmt(tax)}</Td></tr>
                <tr><Th>Total</Th><Td num><strong>{fmt(total)}</strong></Td></tr>
              </tbody>
            </WikiTable>
          </Section>

          <Section title="Payment Method">
            <div className="flex flex-col gap-1.5">
              {['Credit Card', 'Cash', 'Debit Card', 'Mobile Pay'].map(m => (
                <label key={m} className="flex cursor-pointer items-center gap-2 text-[0.9em]">
                  <input type="radio" name="payment" value={m} checked={payment === m} onChange={() => setPayment(m)} />
                  {m}
                </label>
              ))}
            </div>
          </Section>

          <Section className="mt-2 flex gap-2">
            <WikiButton
              className="flex-1 p-2 text-status-critical border-status-critical"
              onClick={() => setCart([])}
            >
              Clear Cart
            </WikiButton>
            <WikiButton
              className="flex-[2] p-2 bg-wiki-blue text-white border-wiki-blue"
              disabled={cart.length === 0}
              onClick={() => setDone(true)}
            >
              Process Payment — {fmt(total)}
            </WikiButton>
          </Section>
        </div>
      </TwoCol>
    </>
  );
}
