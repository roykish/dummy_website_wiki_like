import { weeklySchedule } from '@/data/dummy';
import { PageHeader, Section, TableScroll, WikiTable, Tr, Th, Td, Note } from '@/components/shared';
import { cn } from '@/lib/utils';

const DAYS = [
  { key: 'mon', label: 'Mon', date: 'Jun 8'  },
  { key: 'tue', label: 'Tue', date: 'Jun 9'  },
  { key: 'wed', label: 'Wed', date: 'Jun 10' },
  { key: 'thu', label: 'Thu', date: 'Jun 11', today: true },
  { key: 'fri', label: 'Fri', date: 'Jun 12' },
  { key: 'sat', label: 'Sat', date: 'Jun 13' },
  { key: 'sun', label: 'Sun', date: 'Jun 14' },
];

export default function SchedulesPage() {
  const totalShifts = weeklySchedule.reduce((a, s) =>
    a + DAYS.filter(d => s[d.key] !== 'Off').length, 0);

  return (
    <>
      <PageHeader
        title="Schedules"
        meta={`Week of June 8–14, 2026 · ${weeklySchedule.length} staff · ${totalShifts} shifts scheduled`}
      />

      <Section title="Weekly Schedule — June 8–14, 2026">
        <TableScroll>
          <WikiTable>
            <thead>
              <tr>
                <Th>Staff</Th>
                <Th>Role</Th>
                {DAYS.map(d => (
                  <Th key={d.key} className={cn('text-center', d.today && 'bg-[#cee0f2]')}>
                    {d.label}<br />
                    <span className="text-[0.85em] font-normal">{d.date}</span>
                  </Th>
                ))}
                <Th num>Shifts</Th>
              </tr>
            </thead>
            <tbody>
              {weeklySchedule.map(s => {
                const shiftCount = DAYS.filter(d => s[d.key] !== 'Off').length;
                return (
                  <Tr key={s.id}>
                    <Td><a href="#">{s.name}</a></Td>
                    <Td>{s.role}</Td>
                    {DAYS.map(d => (
                      <Td
                        key={d.key}
                        center
                        className={cn(
                          'text-[0.85em]',
                          s[d.key] === 'Off' ? 'text-[#9aa0a6]' : 'text-wiki-text',
                          d.today && 'bg-[#f4f9fe]'
                        )}
                      >
                        {s[d.key]}
                      </Td>
                    ))}
                    <Td num>{shiftCount}</Td>
                  </Tr>
                );
              })}
            </tbody>
          </WikiTable>
        </TableScroll>
        <Note spacing="mt-1">
          Today (Thursday, June 11) is highlighted.
          Shift hours are shown in local store time (UTC−5). <a href="#">Edit schedule →</a>
        </Note>
      </Section>
    </>
  );
}
