'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
import { useBadgeApp } from '@/components/providers/badge-app-provider';

export function WalletSheet() {
  const { closeWalletSheet, connectWallet, connectors, isConnecting, walletSheetOpen } = useBadgeApp();

  return (
    <AnimatePresence>
      {walletSheetOpen ? (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWalletSheet}
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md rounded-t-[34px] border border-white/10 bg-[#111a2d] px-5 pb-8 pt-5 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Wallet</div>
                <div className="mt-1 text-xl font-semibold text-white">Connect to Base</div>
              </div>
              <button
                type="button"
                onClick={closeWalletSheet}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  type="button"
                  disabled={isConnecting}
                  onClick={() => void connectWallet(connector.id)}
                  className="flex w-full items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:bg-white/10 disabled:opacity-60"
                >
                  <div>
                    <div className="text-sm font-medium text-white">{connector.name}</div>
                    <div className="mt-1 text-xs text-slate-400">Base only</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
