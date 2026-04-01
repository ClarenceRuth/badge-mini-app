'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { base } from 'wagmi/chains';
import { BADGE_ABI, BADGE_CONTRACT } from '@/lib/contract';
import {
  COMMUNITY_RECORDS,
  SESSION_RECORDS_KEY,
  createMintRecord,
  mergeRecords,
  type MintRecord,
  type RecordFilter,
} from '@/lib/records';
import {
  formatAddress,
  getBlockExplorerUrl,
  getFriendlyError,
  readLocalRecords,
  writeLocalRecords,
} from '@/lib/utils';

type ActionState = 'idle' | 'pending' | 'success' | 'failed';

type BadgeAppContextValue = {
  actionState: ActionState;
  activeFilter: RecordFilter;
  address?: `0x${string}`;
  canMint: boolean;
  connectWallet: (connectorId?: string) => Promise<void>;
  connectors: ReturnType<typeof useConnect>['connectors'];
  copied: boolean;
  disconnectWallet: () => void;
  errorMessage: string | null;
  filteredRecords: MintRecord[];
  hasBadge: boolean;
  isBaseChain: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  isLoadingBadge: boolean;
  isPending: boolean;
  mintBadge: () => Promise<void>;
  openWalletSheet: () => void;
  closeWalletSheet: () => void;
  recentMintedAt: string | null;
  records: MintRecord[];
  setActiveFilter: (filter: RecordFilter) => void;
  shareBadge: () => Promise<void>;
  shortAddress: string;
  switchToBase: () => Promise<void>;
  txHash?: `0x${string}`;
  txLink: string | null;
  walletSheetOpen: boolean;
};

const BadgeAppContext = createContext<BadgeAppContextValue | null>(null);

export function BadgeAppProvider({ children }: { children: React.ReactNode }) {
  const { address, chainId, isConnected } = useAccount();
  const { connectors, connectAsync, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: base.id });
  const { writeContractAsync } = useWriteContract();

  const [walletSheetOpen, setWalletSheetOpen] = useState(false);
  const [records, setRecords] = useState<MintRecord[]>(COMMUNITY_RECORDS);
  const [actionState, setActionState] = useState<ActionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [recentMintedAt, setRecentMintedAt] = useState<string | null>(null);
  const [activeRecordId, setActiveRecordId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<RecordFilter>('all');
  const [copied, setCopied] = useState(false);

  const isBaseChain = chainId === base.id;

  const { data: badgeState, isLoading: isLoadingBadge, refetch: refetchBadge } = useReadContract({
    address: BADGE_CONTRACT,
    abi: BADGE_ABI,
    functionName: 'hasBadge',
    args: address ? [address] : undefined,
    chainId: base.id,
    query: {
      enabled: Boolean(address),
    },
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed, error: receiptError } = useWaitForTransactionReceipt({
    chainId: base.id,
    hash: txHash,
    query: {
      enabled: Boolean(txHash),
    },
  });

  useEffect(() => {
    const stored = readLocalRecords<MintRecord>(SESSION_RECORDS_KEY);
    setRecords(mergeRecords(COMMUNITY_RECORDS, stored));
  }, []);

  useEffect(() => {
    if (!address) {
      setRecentMintedAt(null);
      return;
    }

    const latest = records.find((record) => record.mine && record.address.toLowerCase() === address.toLowerCase());
    setRecentMintedAt(latest?.timestamp ?? null);
  }, [address, records]);

  useEffect(() => {
    if (!isConfirmed || !txHash) {
      return;
    }

    setActionState('success');
    setErrorMessage(null);
    void refetchBadge();
    setRecords((current) => {
      const next = current.map<MintRecord>((record) =>
        record.id === activeRecordId
          ? { ...record, status: 'minted' as const, txHash, timestamp: new Date().toISOString() }
          : record,
      );
      writeLocalRecords(SESSION_RECORDS_KEY, next.filter((record) => record.source === 'session'));
      return next;
    });
  }, [activeRecordId, isConfirmed, refetchBadge, txHash]);

  useEffect(() => {
    if (!receiptError) {
      return;
    }

    setActionState('failed');
    setErrorMessage(getFriendlyError(receiptError));
    setRecords((current) => {
      const next = current.map<MintRecord>((record) =>
        record.id === activeRecordId ? { ...record, status: 'failed' as const } : record,
      );
      writeLocalRecords(SESSION_RECORDS_KEY, next.filter((record) => record.source === 'session'));
      return next;
    });
  }, [activeRecordId, receiptError]);

  const hasBadge = Boolean(badgeState);
  const isPending = actionState === 'pending' || isConfirming;
  const canMint = Boolean(address) && isBaseChain && !hasBadge && !isPending;

  const updateSessionRecords = useCallback((updater: (current: MintRecord[]) => MintRecord[]) => {
    setRecords((current) => {
      const next = updater(current);
      writeLocalRecords(SESSION_RECORDS_KEY, next.filter((record) => record.source === 'session'));
      return next;
    });
  }, []);

  const connectWallet = useCallback(
    async (connectorId?: string) => {
      const connector = connectors.find((item) => item.id === connectorId) ?? connectors[0];
      if (!connector) {
        setErrorMessage('Wallet unavailable');
        return;
      }

      setErrorMessage(null);
      await connectAsync({ connector, chainId: base.id });
      setWalletSheetOpen(false);
    },
    [connectAsync, connectors],
  );

  const switchToBase = useCallback(async () => {
    setErrorMessage(null);
    await switchChainAsync({ chainId: base.id });
  }, [switchChainAsync]);

  const mintBadge = useCallback(async () => {
    if (!address) {
      setWalletSheetOpen(true);
      return;
    }

    if (!isBaseChain) {
      await switchToBase();
      return;
    }

    if (hasBadge) {
      setActionState('success');
      setErrorMessage('Badge already minted');
      return;
    }

    if (!publicClient) {
      setActionState('failed');
      setErrorMessage('Base RPC unavailable');
      return;
    }

    setActionState('pending');
    setErrorMessage(null);

    const pendingRecord = createMintRecord({
      address,
      mine: true,
      status: 'pending',
    });
    setActiveRecordId(pendingRecord.id);
    updateSessionRecords((current) => mergeRecords([pendingRecord], current));

    try {
      const { request } = await publicClient.simulateContract({
        address: BADGE_CONTRACT,
        abi: BADGE_ABI,
        functionName: 'mintBadge',
        account: address,
      });

      const hash = await writeContractAsync(request);
      setTxHash(hash);
      updateSessionRecords((current) =>
        current.map<MintRecord>((record) =>
          record.id === pendingRecord.id ? { ...record, txHash: hash } : record,
        ),
      );
    } catch (error) {
      setActionState('failed');
      setErrorMessage(getFriendlyError(error));
      updateSessionRecords((current) =>
        current.map<MintRecord>((record) =>
          record.id === pendingRecord.id ? { ...record, status: 'failed' as const } : record,
        ),
      );
    }
  }, [address, hasBadge, isBaseChain, publicClient, switchToBase, updateSessionRecords, writeContractAsync]);

  const shareBadge = useCallback(async () => {
    const shareData = {
      title: 'Badge',
      text: hasBadge ? 'Minted Soulbound badge on Base.' : 'Badge status on Base.',
      url: typeof window !== 'undefined' ? window.location.origin : undefined,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (shareData.url) {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }
    } catch {
      setErrorMessage('Share cancelled');
    }
  }, [hasBadge]);

  const filteredRecords = useMemo(() => {
    if (activeFilter === 'mine') {
      if (!address) {
        return [] as MintRecord[];
      }

      return records.filter((record) => record.address.toLowerCase() === address.toLowerCase());
    }

    return records;
  }, [activeFilter, address, records]);

  const value = useMemo<BadgeAppContextValue>(
    () => ({
      actionState,
      activeFilter,
      address,
      canMint,
      connectWallet,
      connectors,
      copied,
      disconnectWallet: disconnect,
      errorMessage,
      filteredRecords,
      hasBadge,
      isBaseChain,
      isConnected,
      isConnecting,
      isLoadingBadge,
      isPending,
      mintBadge,
      openWalletSheet: () => setWalletSheetOpen(true),
      closeWalletSheet: () => setWalletSheetOpen(false),
      recentMintedAt,
      records,
      setActiveFilter,
      shareBadge,
      shortAddress: formatAddress(address),
      switchToBase,
      txHash,
      txLink: txHash ? getBlockExplorerUrl(txHash) : null,
      walletSheetOpen,
    }),
    [
      actionState,
      activeFilter,
      address,
      canMint,
      connectWallet,
      connectors,
      copied,
      disconnect,
      errorMessage,
      filteredRecords,
      hasBadge,
      isBaseChain,
      isConnected,
      isConnecting,
      isLoadingBadge,
      isPending,
      mintBadge,
      recentMintedAt,
      records,
      shareBadge,
      switchToBase,
      txHash,
      walletSheetOpen,
    ],
  );

  return <BadgeAppContext.Provider value={value}>{children}</BadgeAppContext.Provider>;
}

export function useBadgeApp() {
  const context = useContext(BadgeAppContext);

  if (!context) {
    throw new Error('useBadgeApp must be used within BadgeAppProvider');
  }

  return context;
}
