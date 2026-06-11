import { systemUsers } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import {
  PageHeader, Section, TableScroll, WikiTable, Tr, Th, Td, StatusText, Note,
} from '@/components/shared';

const ROLES = [
  { role: 'Administrator', permissions: 'Full system access, user management, all reports' },
  { role: 'Store Manager',  permissions: 'All POS functions, reports, staff management, settings' },
  { role: 'Senior Cashier', permissions: 'POS transactions, returns, end-of-day reports' },
  { role: 'Cashier',        permissions: 'POS transactions, basic returns' },
  { role: 'Part-Time',      permissions: 'POS transactions only' },
];

export default function UsersPage() {
  const userPag = usePagination(systemUsers, 10);
  const rolePag = usePagination(ROLES, 10);
  const active  = systemUsers.filter(u => u.status === 'Active').length;

  return (
    <>
      <PageHeader
        title="Users & Roles"
        meta={`${systemUsers.length} users · ${active} active`}
      />

      <Section title="System Users">
        <TableScroll>
          <WikiTable>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Email</Th>
                <Th>Last Login</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {userPag.slice.map(u => (
                <Tr key={u.id}>
                  <Td>{u.id}</Td>
                  <Td><a href="#">{u.name}</a></Td>
                  <Td>{u.role}</Td>
                  <Td><a href={`mailto:${u.email}`}>{u.email}</a></Td>
                  <Td>{u.lastLogin}</Td>
                  <Td>
                    <StatusText status={u.status === 'Active' ? 'ok' : 'low'}>{u.status}</StatusText>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </WikiTable>
        </TableScroll>
        <Pagination {...userPag} onPage={userPag.setPage} />
        <Note spacing="mt-1"><a href="#">Add new user →</a></Note>
      </Section>

      <Section title="Role Permissions">
        <WikiTable>
          <thead>
            <tr>
              <Th>Role</Th>
              <Th>Permissions</Th>
              <Th num>Users</Th>
            </tr>
          </thead>
          <tbody>
            {rolePag.slice.map(r => (
              <Tr key={r.role}>
                <Td><strong>{r.role}</strong></Td>
                <Td>{r.permissions}</Td>
                <Td num>{systemUsers.filter(u => u.role === r.role).length}</Td>
              </Tr>
            ))}
          </tbody>
        </WikiTable>
        <Pagination {...rolePag} onPage={rolePag.setPage} />
      </Section>
    </>
  );
}
