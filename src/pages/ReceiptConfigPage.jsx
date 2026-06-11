import { store } from '@/data/dummy';
import {
  PageHeader, TwoCol, Note, FormSection, FormGroup, FormInput, FormTextarea, FormSelect,
  WikiTable, Th, Td,
} from '@/components/shared';

const FIELDS = [
  { label: 'Receipt Header', key: 'header', type: 'textarea', rows: 3,
    value: `RetailOS POS\n${store.name}\n${store.address}` },
  { label: 'Receipt Footer', key: 'footer', type: 'textarea', rows: 2,
    value: 'Thank you for shopping with us!\nPlease retain this receipt for your records.' },
  { label: 'Print Format',   key: 'format', type: 'select',
    options: ['80 mm thermal', '58 mm thermal', 'A4 paper'],
    value: '80 mm thermal' },
  { label: 'Copies per Transaction', key: 'copies', type: 'select',
    options: ['1', '2', '3'], value: '1' },
];

const TOGGLES = [
  { label: 'Show tax breakdown',        checked: true  },
  { label: 'Show transaction ID',       checked: true  },
  { label: 'Show cashier name',         checked: true  },
  { label: 'Print logo on receipt',     checked: false },
  { label: 'Include QR code',           checked: false },
  { label: 'Ask for email receipt',     checked: true  },
  { label: 'Print duplicate for store', checked: false },
];

export default function ReceiptConfigPage() {
  return (
    <>
      <PageHeader
        title="Receipt Configuration"
        meta={`Manage receipt content and print settings · ${store.name}`}
      />

      <TwoCol>
        <div>
          <FormSection title="Content">
            {FIELDS.map(f => (
              <FormGroup label={f.label} key={f.key}>
                {f.type === 'textarea' ? (
                  <FormTextarea rows={f.rows} defaultValue={f.value} readOnly />
                ) : f.type === 'select' ? (
                  <FormSelect
                    value={f.value}
                    disabled
                    options={f.options.map(o => ({ value: o, label: o }))}
                  />
                ) : (
                  <FormInput type="text" defaultValue={f.value} readOnly />
                )}
              </FormGroup>
            ))}
          </FormSection>
        </div>

        <div>
          <FormSection title="Display Options">
            <WikiTable>
              <thead>
                <tr><Th>Option</Th><Th className="text-center">Enabled</Th></tr>
              </thead>
              <tbody>
                {TOGGLES.map(t => (
                  <tr key={t.label}>
                    <Td>{t.label}</Td>
                    <Td center>
                      <input type="checkbox" defaultChecked={t.checked} disabled />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </WikiTable>
          </FormSection>

          <FormSection title="Preview">
            <pre className="border border-wiki-border bg-white p-2.5 font-mono text-xs leading-relaxed whitespace-pre-wrap">
{`================================
        RetailOS POS
    Downtown POS #1
  142 Main Street, Downtown
================================
Date: June 11, 2026  Time: 20:58
Transaction: T-24702
Cashier: Jennifer Park
--------------------------------
Organic Coffee 1 kg  x2  $57.98
Whole Milk 2 L       x1   $4.29
Dark Chocolate 85%   x3  $13.47
--------------------------------
Subtotal                  $75.74
HST (9%)                   $6.82
TOTAL                     $82.56
--------------------------------
Payment: Credit Card
================================
Thank you for shopping with us!
================================`}
            </pre>
          </FormSection>
        </div>
      </TwoCol>

      <Note spacing="">
        Settings are read-only in this view. Contact your administrator to make changes.
      </Note>
    </>
  );
}
