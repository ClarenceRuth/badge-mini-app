export type RecordStatus = 'pending' | 'minted' | 'failed';
export type RecordFilter = 'all' | 'mine';

export type MintRecord = {
  id: string;
  address: `0x${string}`;
  timestamp: string;
  status: RecordStatus;
  txHash?: `0x${string}`;
  mine: boolean;
  source: 'community' | 'session';
};

export const SESSION_RECORDS_KEY = 'badge-mini-app.records';

export const COMMUNITY_RECORDS: MintRecord[] = [
  {
    id: 'community-1',
    address: '0x84Dbe574F29e5e92A18E1F3B58fFf6b46E0D8c8D',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    status: 'minted',
    txHash: '0x86fabf81334dfe214a75e27f0cbc7550f33377da283686fb7710ccfdca2494f0',
    mine: false,
    source: 'community',
  },
  {
    id: 'community-2',
    address: '0xB91F5A4A9E146eD2F5815502e4fF3d7B2c3A3422',
    timestamp: new Date(Date.now() - 1000 * 60 * 44).toISOString(),
    status: 'pending',
    mine: false,
    source: 'community',
  },
  {
    id: 'community-3',
    address: '0x2F2aA46c52b8A5Ce0950c52929a7a1F0cB6EFA0A',
    timestamp: new Date(Date.now() - 1000 * 60 * 97).toISOString(),
    status: 'minted',
    txHash: '0x9dc6a76c6e8daf293891b512e58dd4b8f7785d5289ad1f8fe62c7f7b53f26197',
    mine: false,
    source: 'community',
  },
];

export function createMintRecord({
  address,
  mine,
  status,
  txHash,
}: {
  address: `0x${string}`;
  mine: boolean;
  status: RecordStatus;
  txHash?: `0x${string}`;
}): MintRecord {
  return {
    id: `${address}-${Date.now()}`,
    address,
    timestamp: new Date().toISOString(),
    status,
    txHash,
    mine,
    source: 'session',
  };
}

export function mergeRecords(...groups: MintRecord[][]): MintRecord[] {
  const map = new Map<string, MintRecord>();

  groups.flat().forEach((record) => {
    map.set(record.id, record);
  });

  return Array.from(map.values()).sort(
    (left, right) => new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime(),
  );
}
