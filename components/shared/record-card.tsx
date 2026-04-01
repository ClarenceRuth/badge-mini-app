import { Clock3, ShieldCheck, TriangleAlert } from 'lucide-react';
import { StatusPill } from '@/components/status/status-pill';
import type { MintRecord } from '@/lib/records';
import { formatAddress, formatTimestamp } from '@/lib/utils';

export function RecordCard({ record }: { record: MintRecord }) {
  const statusLabel = record.status === 'minted' ? 'Minted' : record.status === 'failed' ? 'Failed' : 'Pending';
  const Icon = record.status === 'minted' ? ShieldCheck : record.status === 'failed' ? TriangleAlert : Clock3;

  return (
    <div className="panel rounded-[28px] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-white">{formatAddress(record.address)}</div>
            <div className="text-xs text-slate-400">{formatTimestamp(record.timestamp)}</div>
          </div>
        </div>
        <StatusPill status={statusLabel as 'Minted' | 'Pending' | 'Failed'} compact />
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>{record.mine ? 'Mine' : 'Community'}</span>
        <span>{record.txHash ? `${record.txHash.slice(0, 6)}...${record.txHash.slice(-4)}` : 'No hash yet'}</span>
      </div>
    </div>
  );
}
