import { suppliers } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import {
  PageHeader, Section, TableScroll, WikiTable, Tr, Th, Td, StatusText, Note,
} from '@/components/shared';

export default function SuppliersPage() {
  const pag = usePagination(suppliers, 10);
  const active = suppliers.filter(s => s.status === 'Active').length;

  return (
    <>
      <PageHeader
        title="Suppliers"
        meta={`${suppliers.length} suppliers · ${active} active`}
      />

      <Section title="Supplier Directory">
        <TableScroll>
          <WikiTable>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Supplier Name</Th>
                <Th>Contact</Th>
                <Th>Phone</Th>
                <Th>Email</Th>
                <Th>Categories Supplied</Th>
                <Th>Payment Terms</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {pag.slice.map(s => (
                <Tr key={s.id}>
                  <Td>{s.id}</Td>
                  <Td><a href="#">{s.name}</a></Td>
                  <Td>{s.contact}</Td>
                  <Td>{s.phone}</Td>
                  <Td><a href={`mailto:${s.email}`}>{s.email}</a></Td>
                  <Td>{s.categories}</Td>
                  <Td>{s.terms}</Td>
                  <Td>
                    <StatusText status={s.status === 'Active' ? 'ok' : 'low'}>{s.status}</StatusText>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </WikiTable>
        </TableScroll>
        <Pagination {...pag} onPage={pag.setPage} />
        <Note spacing="mt-1"><a href="#">Add new supplier →</a></Note>
      </Section>
    </>
  );
}
