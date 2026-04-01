import { cn } from '@/lib/utils';

type Status = 'Eligible' | 'Minted' | 'Locked' | 'Soulbound' | 'Verified' | 'Pending' | 'Failed';

const styles: Record<Status, string> = {
  Eligible: 'bg-green-500/15 text-green-300 border-green-400/30',
  Minted: 'bg-primary/18 text-violet-200 border-primary/35',
  Locked: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  Soulbound: 'bg-secondary/15 text-amber-200 border-secondary/30',
  Verified: 'bg-white/10 text-slate-100 border-white/10',
  Pending: 'bg-amber-500/15 text-amber-200 border-amber-400/30',
  Failed: 'bg-rose-500/15 text-rose-200 border-rose-400/30',
};

export function StatusPill({ status, compact = false }: { status: Status; compact?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        compact ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs',
        styles[status],
      )}
    >
      {status}
    </span>
  );
}
