'use client';

import { useState } from 'react';
import { Copy, Share2, Sparkles, UserRound } from 'lucide-react';
import { BadgeEmblem } from '@/components/badge/badge-emblem';
import { useBadgeApp } from '@/components/providers/badge-app-provider';
import { ActionButton } from '@/components/shared/action-button';
import { SectionHeading } from '@/components/shared/section-heading';
import { WalletChip } from '@/components/shared/wallet-chip';
import { StatusPill } from '@/components/status/status-pill';
import { copyText, formatTimestamp } from '@/lib/utils';

export function MyBadgeScreen() {
  const {
    address,
    copied,
    errorMessage,
    hasBadge,
    isBaseChain,
    isConnected,
    mintBadge,
    recentMintedAt,
    shareBadge,
    shortAddress,
    switchToBase,
  } = useBadgeApp();
  const [addressCopied, setAddressCopied] = useState(false);

  const onCopy = async () => {
    if (!address) {
      return;
    }

    const ok = await copyText(address);
    if (ok) {
      setAddressCopied(true);
      window.setTimeout(() => setAddressCopied(false), 1400);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-5 pt-2">
      <SectionHeading eyebrow="Profile" title="My Badge" caption="Personal achievement panel." />

      <section className="panel overflow-hidden rounded-[34px]">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Wallet</div>
              <div className="mt-1 text-lg font-semibold text-white">{isConnected ? shortAddress : 'Guest'}</div>
            </div>
            <StatusPill status={hasBadge ? 'Minted' : 'Locked'} />
          </div>
        </div>

        <div className="grid gap-5 px-5 py-6">
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.2),rgba(23,32,51,0.6),rgba(245,158,11,0.1))] px-4 py-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Achievement</div>
                <div className="mt-1 text-xl font-semibold text-white">Badge Genesis</div>
              </div>
              <Sparkles className="h-5 w-5 text-amber-300" />
            </div>
            <div className="mt-5 flex justify-center">
              <BadgeEmblem size="small" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="surface-soft rounded-[24px] px-4 py-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Mint time</div>
              <div className="mt-2 text-sm font-medium text-white">{recentMintedAt ? formatTimestamp(recentMintedAt) : '--'}</div>
            </div>
            <div className="surface-soft rounded-[24px] px-4 py-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">State</div>
              <div className="mt-2 text-sm font-medium text-white">{hasBadge ? 'Soulbound' : 'Awaiting claim'}</div>
            </div>
          </div>

          <div className="surface-soft flex items-center justify-between rounded-[24px] px-4 py-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Address</div>
              <div className="mt-1 text-sm font-medium text-white">{isConnected ? shortAddress : 'Connect wallet'}</div>
            </div>
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              <Copy className="h-3.5 w-3.5" />
              {addressCopied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ActionButton label={copied ? 'Shared' : 'Share'} onClick={shareBadge} variant="ghost" />
            <ActionButton
              label={!isConnected ? 'Connect' : !isBaseChain ? 'Switch' : hasBadge ? 'Minted' : 'Mint Badge'}
              onClick={!isConnected ? mintBadge : !isBaseChain ? switchToBase : mintBadge}
              variant="secondary"
              disabled={hasBadge && isBaseChain}
            />
          </div>

          {errorMessage ? (
            <div className="rounded-[22px] border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {errorMessage}
            </div>
          ) : null}
        </div>
      </section>

      <WalletChip />

      <section className="panel rounded-[30px] p-5">
        <div className="flex items-center gap-2 text-slate-300">
          <UserRound className="h-4 w-4 text-violet-200" />
          <span className="text-sm font-medium">Profile state</span>
        </div>
        <div className="mt-4 grid gap-3">
          <div className="surface-soft rounded-2xl px-4 py-3 text-sm text-white">{hasBadge ? 'Visible in wallet profile' : 'Badge not claimed'}</div>
          <div className="surface-soft rounded-2xl px-4 py-3 text-sm text-white">{isBaseChain ? 'Base network ready' : 'Switch to Base'}</div>
        </div>
      </section>
    </div>
  );
}
