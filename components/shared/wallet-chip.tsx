'use client';

import { ChevronRight, LogOut, Wallet } from 'lucide-react';
import { useBadgeApp } from '@/components/providers/badge-app-provider';
import { cn } from '@/lib/utils';

export function WalletChip({ compact = false }: { compact?: boolean }) {
  const { isConnected, shortAddress, openWalletSheet, disconnectWallet, isBaseChain } = useBadgeApp();

  return (
    <div
      className={cn(
        'surface-soft flex items-center justify-between rounded-2xl',
        compact ? 'px-3 py-2' : 'px-4 py-3',
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 text-violet-200">
          <Wallet className="h-4 w-4" />
        </div>
        <div className="space-y-0.5">
          <div className="text-sm font-medium text-white">{isConnected ? shortAddress : 'Wallet'}</div>
          <div className="text-xs text-slate-400">{isConnected ? (isBaseChain ? 'Base Ready' : 'Wrong network') : 'Not connected'}</div>
        </div>
      </div>

      {isConnected ? (
        <button
          type="button"
          onClick={disconnectWallet}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:border-white/20 hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Disconnect
        </button>
      ) : (
        <button
          type="button"
          onClick={openWalletSheet}
          className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-950 transition hover:bg-slate-200"
        >
          Connect
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
