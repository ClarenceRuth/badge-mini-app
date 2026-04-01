export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function formatAddress(address?: string | null) {
  if (!address) {
    return 'No wallet';
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTimestamp(value?: string | null) {
  if (!value) {
    return '--';
  }

  const date = new Date(value);
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getFriendlyError(error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'Transaction failed';

  const lower = message.toLowerCase();

  if (lower.includes('user rejected') || lower.includes('rejected the request')) {
    return 'Request cancelled';
  }

  if (lower.includes('insufficient funds')) {
    return 'Not enough ETH for gas';
  }

  if (lower.includes('already') || lower.includes('minted')) {
    return 'Badge already minted';
  }

  if (lower.includes('chain') || lower.includes('network')) {
    return 'Switch to Base';
  }

  return message.slice(0, 120);
}

export function getAddressExplorerUrl(address: string) {
  return `https://basescan.org/address/${address}`;
}

export function getBlockExplorerUrl(hash: string) {
  return `https://basescan.org/tx/${hash}`;
}

export function readLocalRecords<T>(key: string): T[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeLocalRecords<T>(key: string, value: T[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}
