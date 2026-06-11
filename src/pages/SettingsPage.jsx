import { store } from '@/data/dummy';
import { PageHeader, TwoCol, Note, FormSection, FormGroup, FormInput, FormTextarea, FormSelect } from '@/components/shared';

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" meta="System configuration · RetailOS POS" />

      <TwoCol>
        <div>
          <FormSection title="Store Information">
            <FormGroup label="Store Name">
              <FormInput type="text" defaultValue={store.name} readOnly />
            </FormGroup>
            <FormGroup label="Address">
              <FormInput type="text" defaultValue={store.address} readOnly />
            </FormGroup>
            <FormGroup label="Phone">
              <FormInput type="text" defaultValue={store.phone} readOnly />
            </FormGroup>
            <FormGroup label="Tax ID">
              <FormInput type="text" defaultValue={store.taxId} readOnly />
            </FormGroup>
            <FormGroup label="Store Manager">
              <FormInput type="text" defaultValue={store.manager} readOnly />
            </FormGroup>
          </FormSection>

          <FormSection title="Tax Configuration">
            <FormGroup label="Tax Rate (HST)">
              <FormInput type="text" defaultValue="9%" readOnly />
            </FormGroup>
            <FormGroup label="Tax Registration Number">
              <FormInput type="text" defaultValue="CA-GST-882-4401" readOnly />
            </FormGroup>
            <FormGroup label="Tax Inclusive Pricing">
              <FormSelect
                value="no"
                disabled
                options={[
                  { value: 'no', label: 'No — tax added at checkout' },
                  { value: 'yes', label: 'Yes — prices include tax' },
                ]}
              />
            </FormGroup>
          </FormSection>
        </div>

        <div>
          <FormSection title="Receipt Settings">
            <FormGroup label="Receipt Header">
              <FormTextarea rows={3} defaultValue={`RetailOS POS\n${store.name}\n${store.address}`} readOnly />
            </FormGroup>
            <FormGroup label="Receipt Footer">
              <FormTextarea rows={2} defaultValue="Thank you for shopping with us!" readOnly />
            </FormGroup>
            <FormGroup label="Print Format">
              <FormSelect
                value="80mm"
                disabled
                options={[
                  { value: '80mm', label: '80 mm thermal' },
                  { value: '58mm', label: '58 mm thermal' },
                  { value: 'a4', label: 'A4 paper' },
                ]}
              />
            </FormGroup>
          </FormSection>

          <FormSection title="Operating Hours">
            <FormGroup label="Opening Time">
              <FormInput type="text" defaultValue="09:00" readOnly />
            </FormGroup>
            <FormGroup label="Closing Time">
              <FormInput type="text" defaultValue="21:00" readOnly />
            </FormGroup>
            <FormGroup label="Report Generation">
              <FormSelect
                value="close"
                disabled
                options={[
                  { value: 'close', label: 'Automatically at closing' },
                  { value: 'manual', label: 'Manual only' },
                ]}
              />
            </FormGroup>
          </FormSection>
        </div>
      </TwoCol>

      <Note spacing="">
        Settings are read-only in this view. Contact your system administrator to make changes.
      </Note>
    </>
  );
}
