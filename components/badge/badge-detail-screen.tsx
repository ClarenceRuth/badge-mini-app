'use client';

import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, Link2, Shield } from 'lucide-react';
import { BadgeEmblem } from '@/components/badge/badge-emblem';
import { SectionHeading } from '@/components/shared/section-heading';
import { StatusPill } from '@/components/status/status-pill';
import { BADGE_CONTRACT } from '@/lib/contract';
import { formatAddress, getAddressExplorerUrl } from '@/lib/utils';
import { useBadgeApp } from '@/components/providers/badge-app-provider';

const specs = [
  { key: 'Type', value: 'Soulbound' },
  { key: 'Chain', value: 'Base' },
  { key: 'Rule', value: 'One mint' },
];

export function BadgeDetailScreen() {
  const { hasBadge, actionState } = useBadgeApp();
  const status = actionState === 'pending' ? 'Pending' : hasBadge ? 'Minted' : 'Eligible';

  return (
    <div className="flex flex-1 flex-col gap-5 pt-2">
      <SectionHeading eyebrow="Exhibit" title="Badge Detail" caption="A compact onchain honor mark." />

      <section className="panel rounded-[34px] p-5">
        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-4 py-6">
          <BadgeEmblem size="detail" />
          <div className="mt-6 flex items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Badge name</div>
              <div className="mt-2 text-2xl font-semibold text-white">Badge Genesis</div>
            </div>
            <StatusPill status={status as 'Eligible' | 'Minted' | 'Pending'} />
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {specs.map((item) => (
          <div key={item.key} className="surface-soft rounded-[26px] px-4 py-4">
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{item.key}</div>
            <div className="mt-2 text-base font-medium text-white">{item.value}</div>
          </div>
        ))}
      </section>

      <section className="panel rounded-[30px] p-5">
        <div className="flex items-center gap-2 text-slate-300">
          <BadgeCheck className="h-4 w-4 text-green-300" />
          <span className="text-sm font-medium">Short note</span>
        </div>
        <div className="mt-4 grid gap-3">
          <div className="surface-soft rounded-2xl px-4 py-3 text-sm text-white">Honor badge</div>
          <div className="surface-soft rounded-2xl px-4 py-3 text-sm text-white">Non-transferable</div>
          <div className="surface-soft rounded-2xl px-4 py-3 text-sm text-white">Linked to wallet</div>
        </div>
      </section>

      <section className="panel rounded-[30px] p-5">
        <div className="flex items-center gap-2 text-slate-300">
          <Link2 className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium">Onchain entry</span>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-4 py-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Contract</div>
            <div className="mt-1 text-sm font-medium text-white">{formatAddress(BADGE_CONTRACT)}</div>
          </div>
          <Link
            href={getAddressExplorerUrl(BADGE_CONTRACT)}
            target="_blank"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-950"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="panel rounded-[30px] p-5">
        <div className="flex items-center gap-2 text-slate-300">
          <Shield className="h-4 w-4 text-violet-200" />
          <span className="text-sm font-medium">State</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="surface-soft rounded-2xl px-4 py-4">
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Ownership</div>
            <div className="mt-2 text-base font-medium text-white">{hasBadge ? 'Minted' : 'Not yet'}</div>
          </div>
          <div className="surface-soft rounded-2xl px-4 py-4">
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Verification</div>
            <div className="mt-2 text-base font-medium text-white">Enabled</div>
          </div>
        </div>
      </section>
    </div>
  );
}
