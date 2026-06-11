import { useState } from 'react';
import { attendanceRecords } from '@/data/dummy';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import { Button } from '@/components/ui/button';
import {
  PageHeader, AlertBox, FilterRow, FilterLabel, FilterSelect, FilterSpacer, FilterResult,
  TableScroll, WikiTable, Tr, Th, Td, Tf, StatusText,
} from '@/components/shared';

const DATES  = ['All', ...new Set(attendanceRecords.map(r => r.date))];
const NAMES  = ['All', ...new Set(attendanceRecords.map(r => r.name))];

function statusInfo(s) {
  if (s === 'Late')    return { status: 'low' };
  if (s === 'Day Off') return { className: 'text-wiki-text-muted' };
  return { status: 'ok' };
}

export default function AttendancePage() {
  const [date,   setDate]   = useState('All');
  const [name,   setName]   = useState('All');

  const filtered = attendanceRecords.filter(r =>
    (date === 'All' || r.date === date) &&
    (name === 'All' || r.name === name)
  );

  const pag     = usePagination(filtered, 10);
  const late    = filtered.filter(r => r.status === 'Late').length;
  const totalHrs = filtered.reduce((a, r) => a + r.hours, 0);

  const handleDate = (v) => { setDate(v); pag.setPage(1); };
  const handleName = (v) => { setName(v); pag.setPage(1); };

  return (
    <>
      <PageHeader
        title="Attendance"
        meta="Clock-in / clock-out records · Last 3 days"
      />

      {late > 0 && (
        <AlertBox>
          <strong>{late} late arrival{late !== 1 ? 's' : ''}</strong> in the current filter selection.
        </AlertBox>
      )}

      <FilterRow>
        <FilterLabel>Date</FilterLabel>
        <FilterSelect value={date} onValueChange={handleDate} options={DATES} />
        <FilterLabel>Staff</FilterLabel>
        <FilterSelect value={name} onValueChange={handleName} options={NAMES} />
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-none border-wiki-border bg-white px-2.5 text-[13px] shadow-none"
          onClick={() => { setDate('All'); setName('All'); pag.setPage(1); }}
        >
          Reset
        </Button>
        <FilterSpacer />
        <FilterResult>{filtered.length} records · {totalHrs.toFixed(1)} total hours</FilterResult>
      </FilterRow>

      <TableScroll>
        <WikiTable>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Staff</Th>
              <Th>Scheduled</Th>
              <Th>Clock In</Th>
              <Th>Clock Out</Th>
              <Th num>Hours</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {pag.slice.map((r, i) => {
              const info = statusInfo(r.status);
              return (
                <Tr key={i}>
                  <Td>{r.date}</Td>
                  <Td><a href="#">{r.name}</a></Td>
                  <Td>{r.scheduled}</Td>
                  <Td>{r.clockIn}</Td>
                  <Td>{r.clockOut}</Td>
                  <Td num>{r.hours > 0 ? r.hours.toFixed(2) : '–'}</Td>
                  <Td className={info.className}>
                    {info.status ? <StatusText status={info.status}>{r.status}</StatusText> : r.status}
                  </Td>
                </Tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <Tf colSpan={5}>Total hours ({filtered.length} records)</Tf>
              <Tf num>{totalHrs.toFixed(2)}</Tf>
              <Tf></Tf>
            </tr>
          </tfoot>
        </WikiTable>
      </TableScroll>
      <Pagination {...pag} onPage={pag.setPage} />
    </>
  );
}
