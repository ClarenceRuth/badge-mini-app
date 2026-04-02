import { Attribution } from 'ox/erc8021';
import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet, injected } from 'wagmi/connectors';

export const BUILDER_CODE = 'bc_glksu3ix';

export const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: [BUILDER_CODE],
});

export const config = createConfig({
  chains: [base],
  connectors: [coinbaseWallet({ appName: 'Badge' }), injected()],
  transports: {
    [base.id]: http('https://mainnet.base.org'),
  },
  dataSuffix: DATA_SUFFIX,
});
