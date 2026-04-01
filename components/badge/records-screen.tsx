'use client';

import { Filter, History } from 'lucide-react';
import { useBadgeApp } from '@/components/providers/badge-app-provider';
import { RecordCard } from '@/components/shared/record-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { cn } from '@/lib/utils';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'mine', label: 'Mine' },
] as const;

export function RecordsScreen() {
  const { activeFilter, filteredRecords, setActiveFilter } = useBadgeApp();

  return (
    <div className="flex flex-1 flex-col gap-5 pt-2">
      <SectionHeading eyebrow="Activity" title="Records" caption="Recent badge motion." />

      <section className="panel rounded-[30px] p-4">
        <div className="flex items-center gap-2 text-slate-300">
          <Filter className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium">Filter</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'rounded-2xl px-4 py-3 text-sm font-medium transition',
                activeFilter === filter.id ? 'bg-white text-slate-950' : 'border border-white/10 bg-white/5 text-slate-300',
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => <RecordCard key={record.id} record={record} />)
        ) : (
          <div className="panel rounded-[30px] p-5">
            <div className="flex items-center gap-2 text-slate-300">
              <History className="h-4 w-4 text-violet-200" />
              <span className="text-sm font-medium">No records</span>
            </div>
            <div className="mt-3 text-sm text-slate-400">Connect and mint to create your first entry.</div>
          </div>
        )}
      </section>
    </div>
  );
}
