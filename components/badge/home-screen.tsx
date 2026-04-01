'use client';

import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Gem, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBadgeApp } from '@/components/providers/badge-app-provider';
import { BadgeEmblem } from '@/components/badge/badge-emblem';
import { ActionButton } from '@/components/shared/action-button';
import { SectionHeading } from '@/components/shared/section-heading';
import { WalletChip } from '@/components/shared/wallet-chip';
import { StatusPill } from '@/components/status/status-pill';
import { cn, formatTimestamp } from '@/lib/utils';

const ribbonItems = [
  { title: 'Soulbound', value: '1 / address' },
  { title: 'Chain', value: 'Base' },
  { title: 'Class', value: 'Verified' },
  { title: 'Claim', value: 'Live' },
];

export function HomeScreen() {
  const {
    actionState,
    canMint,
    errorMessage,
    hasBadge,
    isBaseChain,
    isConnected,
    isPending,
    mintBadge,
    openWalletSheet,
    recentMintedAt,
    shortAddress,
    switchToBase,
    txLink,
  } = useBadgeApp();

  const status = hasBadge ? 'Minted' : isConnected && isBaseChain ? 'Eligible' : 'Locked';
  const feedbackStatus = actionState === 'pending' ? 'Pending' : actionState === 'failed' ? 'Failed' : status;
  const actionLabel = !isConnected
    ? 'Connect Wallet'
    : !isBaseChain
      ? 'Switch to Base'
      : hasBadge
        ? 'View Badge'
        : actionState === 'pending'
          ? 'Pending'
          : 'Mint Badge';

  return (
    <div className="flex flex-1 flex-col gap-5">
      <header className="flex items-start justify-between pt-2">
        <SectionHeading eyebrow="Badge" title="Soulbound Honor" caption="Mint once. Keep forever." />
        <div className="surface-soft rounded-full px-3 py-1.5 text-xs text-slate-300">Base Mainnet</div>
      </header>

      <section className="panel relative overflow-hidden rounded-[34px] px-5 pb-6 pt-8">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.24),transparent_70%)]" />
        <div className="absolute right-3 top-3">
          <StatusPill status={feedbackStatus as 'Eligible' | 'Minted' | 'Locked' | 'Pending' | 'Failed'} />
        </div>

        <div className="relative flex flex-col items-center gap-6">
          <div className="flex w-full justify-center gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-400">
            <span>Achievement</span>
            <span className="text-slate-600">/</span>
            <span>Badge</span>
          </div>

          <BadgeEmblem size="hero" />

          <div className="grid w-full gap-3 rounded-[28px] border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Current status</div>
                <div className="mt-1 text-2xl font-semibold text-white">{status}</div>
              </div>
              <div className="rounded-2xl border border-secondary/20 bg-secondary/10 px-3 py-2 text-right">
                <div className="text-[11px] uppercase tracking-[0.16em] text-amber-200/80">Rule</div>
                <div className="text-sm font-medium text-amber-100">One per address</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="surface-soft rounded-2xl px-3 py-3">
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Wallet</div>
                <div className="mt-1 text-sm font-medium text-white">{isConnected ? shortAddress : 'Not connected'}</div>
              </div>
              <div className="surface-soft rounded-2xl px-3 py-3">
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Last update</div>
                <div className="mt-1 text-sm font-medium text-white">{recentMintedAt ? formatTimestamp(recentMintedAt) : 'Awaiting mint'}</div>
              </div>
            </div>

            <ActionButton
              label={actionLabel}
              pending={isPending}
              disabled={hasBadge && actionLabel !== 'View Badge'}
              onClick={hasBadge ? () => (window.location.href = '/me') : !isConnected ? openWalletSheet : !isBaseChain ? switchToBase : mintBadge}
              className="w-full"
            />

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Eligible after connect</span>
              {txLink ? (
                <Link href={txLink} target="_blank" className="inline-flex items-center gap-1 text-slate-200">
                  Tx
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <WalletChip />

      <section className="overflow-x-auto">
        <div className="flex gap-3 pb-1">
          {ribbonItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="surface-soft min-w-[132px] rounded-[24px] px-4 py-3"
            >
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{item.title}</div>
              <div className="mt-2 text-sm font-medium text-white">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="panel rounded-[28px] p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="h-4 w-4 text-green-300" />
            <span className="text-sm font-medium">Verified</span>
          </div>
          <div className="mt-3 text-2xl font-semibold text-white">{hasBadge ? 'Owned' : 'Ready'}</div>
          <div className="mt-1 text-xs text-slate-400">Soulbound status panel</div>
        </div>

        <div className="panel rounded-[28px] p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Gem className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium">Mint Flow</span>
          </div>
          <div className={cn('mt-3 text-2xl font-semibold', actionState === 'failed' ? 'text-rose-200' : 'text-white')}>
            {actionState === 'pending' ? 'Pending' : actionState === 'failed' ? 'Retry' : 'Open'}
          </div>
          <div className="mt-1 text-xs text-slate-400">{errorMessage ?? 'Chain interaction ready'}</div>
        </div>
      </section>

      <section className="panel rounded-[30px] p-4">
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="h-4 w-4 text-green-300" />
          <span className="text-sm font-medium">Status feed</span>
        </div>
        <div className="mt-4 grid gap-3">
          <div className="surface-soft rounded-2xl px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Eligibility</div>
            <div className="mt-1 text-sm text-white">{isConnected ? 'Wallet synced' : 'Connect first'}</div>
          </div>
          <div className="surface-soft rounded-2xl px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Mint path</div>
            <div className="mt-1 text-sm text-white">{canMint ? 'Ready to mint' : hasBadge ? 'Already claimed' : 'Waiting on wallet'}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
