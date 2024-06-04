type NetworkInfo = {
  shortName: string;
  chainID: number;
  name: string;
  currencySymbol: string;
  baseAPI?: string;
  stagingBaseAPI?: string;
};

export const networkInfo = new Map<number, NetworkInfo>([
  [
    1,
    {
      chainID: 1,
      name: 'Ethereum',
      shortName: 'eth',
      currencySymbol: 'ETH',
      baseAPI: 'https://safe-transaction-mainnet.safe.global',
    },
  ],
  [
    5,
    {
      chainID: 5,
      name: 'Goerli',
      shortName: 'gor',
      currencySymbol: 'GOR',
      baseAPI: 'https://safe-transaction-goerli.safe.global',
    },
  ],
  [
    10,
    {
      chainID: 10,
      name: 'Optimism',
      shortName: 'oeth',
      currencySymbol: 'OETH',
      baseAPI: 'https://safe-transaction-optimism.safe.global',
    },
  ],
  [
    56,
    {
      chainID: 56,
      name: 'Binance Smart Chain',
      shortName: 'bnb',
      currencySymbol: 'BNB',
      baseAPI: 'https://safe-transaction-bsc.safe.global',
    },
  ],
  [
    100,
    {
      chainID: 100,
      name: 'Gnosis Chain (formerly xDai)',
      shortName: 'xdai', // gno is the offical shortname. gnosis Safe still uses xdai though
      currencySymbol: 'xDAI',
      baseAPI: 'https://safe-transaction-gnosis-chain.safe.global',
    },
  ],
  [
    137,
    {
      chainID: 137,
      name: 'Polygon',
      shortName: 'matic',
      currencySymbol: 'MATIC',
      baseAPI: 'https://safe-transaction-polygon.safe.global',
    },
  ],
  [
    42161,
    {
      chainID: 42161,
      name: 'Arbitrum One',
      shortName: 'arb1',
      currencySymbol: 'AETH',
      baseAPI: 'https://safe-transaction-arbitrum.safe.global',
    },
  ],
  [
    43114,
    {
      chainID: 43114,
      name: 'Avalanche',
      shortName: 'avax',
      currencySymbol: 'AVAX',
      baseAPI: 'https://safe-transaction-avalanche.safe.global',
    },
  ],
  [
    245022934,
    {
      chainID: 245022934,
      name: 'Neon EVM MainNet',
      shortName: 'neonevm-mainnet',
      currencySymbol: 'NEON',
      baseAPI: 'https://transaction.safe.neonevm.org',
      stagingBaseAPI: 'https://transaction.staging.safe.neonevm.org',
    },
  ],
  [
    1284,
    {
      chainID: 1284,
      name: 'Moonbeam',
      shortName: 'moon',
      currencySymbol: 'GLMR',
      baseAPI: 'https://transaction.multisig.moonbeam.network',
      stagingBaseAPI: 'https://transaction.multisig.moonbeam.network',
    },
  ],
  [
    1285,
    {
      chainID: 1285,
      name: 'Moonriver',
      shortName: 'moon',
      currencySymbol: 'MOVR',
      baseAPI: 'https://transaction.moonriver.multisig.moonbeam.network',
      stagingBaseAPI: 'https://transaction.moonriver.multisig.moonbeam.network',
    },
  ],
  [
    1287,
    {
      chainID: 1287,
      name: 'Moonbase',
      shortName: 'moon',
      currencySymbol: 'DEV',
      baseAPI: 'https://transaction.moonbase.multisig.moonbeam.network',
      stagingBaseAPI: 'https://transaction.moonbase.multisig.moonbeam.network',
    },
  ],
  [
    9000,
    {
      chainID: 9000,
      name: 'Evmos testnet',
      shortName: 'evmostestnet',
      currencySymbol: 'tEVMOS',
      baseAPI: 'https://transaction-testnet.safe.evmos.dev',
      stagingBaseAPI: 'https://transaction-testnet.safe.evmos.dev',
    },
  ],
  [
    9001,
    {
      chainID: 9001,
      name: 'Evmos',
      shortName: 'evmos',
      currencySymbol: 'EVMOS',
      baseAPI: 'https://transaction.safe.evmos.dev',
      stagingBaseAPI: 'https://transaction.safe.evmos.dev',
    },
  ],
  [
    59140,
    {
      chainID: 59140,
      name: 'Linea Goerli',
      shortName: 'linea-goerli',
      currencySymbol: 'ETH',
      baseAPI: 'https://transaction-testnet.safe.linea.build',
      stagingBaseAPI: 'https://transaction-testnet.staging.safe.linea.build',
    },
  ],
  [
    59141,
    {
      chainID: 59141,
      name: 'Linea Sepolia',
      shortName: 'linea-sepolia',
      currencySymbol: 'ETH',
      baseAPI: 'https://transaction-sepolia.safe.linea.build',
      stagingBaseAPI: 'https://transaction-sepolia.staging.safe.linea.build',
    },
  ],
  [
    59144,
    {
      chainID: 59144,
      name: 'Linea',
      shortName: 'linea',
      currencySymbol: 'ETH',
      baseAPI: 'https://transaction.safe.linea.build',
      stagingBaseAPI: 'https://transaction.staging.safe.linea.build',
    },
  ],
]);
