export const BADGE_CONTRACT = '0xe90d79938d42805f123a4d26e498e2f8bec816d5' as const;

export const BADGE_ABI = [
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'hasBadge',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintBadge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
