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
      stagingBaseAPI: 'https://transaction.staging.multisig.moonbeam.network',
      baseAPI: 'https://transaction.multisig.moonbeam.network',
    },
  ],
  [
    1285,
    {
      chainID: 1285,
      name: 'Moonriver',
      shortName: 'moon',
      currencySymbol: 'MOVR',
      stagingBaseAPI: 'https://transaction.moonriver.staging.multisig.moonbeam.network',
      baseAPI: 'https://transaction.moonriver.multisig.moonbeam.network',
    },
  ],
  [
    1287,
    {
      chainID: 1287,
      name: 'Moonbase',
      shortName: 'moon',
      currencySymbol: 'DEV',
      stagingBaseAPI: 'https://transaction.moonbase.staging.multisig.moonbeam.network',
      baseAPI: 'https://transaction.moonbase.multisig.moonbeam.network',
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
  [
    23294,
    {
      chainID: 23294,
      name: 'Oasis Sapphire',
      shortName: 'sapphire',
      currencySymbol: 'ROSE',
      baseAPI: 'https://transaction.safe.oasis.io',
      stagingBaseAPI: 'https://transaction.safe.stg.oasis.io',
    },
  ],
  [
    23295,
    {
      chainID: 23295,
      name: 'Oasis Sapphire Testnet',
      shortName: 'sapphire-testnet',
      currencySymbol: 'TEST',
      baseAPI: 'https://transaction-testnet.safe.oasis.io',
      stagingBaseAPI: 'https://transaction-testnet.safe.stg.oasis.io',
    },
  ],
  [
    5000,
    {
      chainID: 5000,
      name: 'Mantle',
      shortName: 'mantle',
      currencySymbol: 'MNT',
      baseAPI: 'https://transaction.multisig.mantle.xyz',
      stagingBaseAPI: 'https://transaction.staging.multisig.mantle.xyz',
    },
  ],
  [
    5001,
    {
      chainID: 5001,
      name: 'Mantle Testnet',
      shortName: 'mantle-testnet',
      currencySymbol: 'MNT',
      baseAPI: 'https://transaction-testnet.multisig.mantle.xyz',
      stagingBaseAPI: 'https://transaction-testnet.staging.multisig.mantle.xyz',
    },
  ],
  [
    5003,
    {
      chainID: 5003,
      name: 'Mantle Sepolia Testnet',
      shortName: 'mnt-sep',
      currencySymbol: 'MNT',
      baseAPI: 'https://transaction-sepolia.multisig.mantle.xyz',
      stagingBaseAPI: 'https://transaction-sepolia.staging.multisig.mantle.xyz',
    },
  ],
  [
    1666600000,
    {
      chainID: 1666600000,
      name: 'Harmony',
      shortName: 'hmy',
      currencySymbol: 'ONE',
      baseAPI: 'https://transaction.multisig.harmony.one',
      stagingBaseAPI: 'https://transaction.staging-safe.harmony.one',
    },
  ],
  [
    1666700000,
    {
      chainID: 1666700000,
      name: 'Harmony Testnet',
      shortName: 'hmyt',
      currencySymbol: 'ONE',
      baseAPI: 'https://transaction-testnet.multisig.harmony.one',
      stagingBaseAPI: 'https://transaction-testnet.staging-safe.harmony.one',
    },
  ],
  [
    17000,
    {
      chainID: 17000,
      name: 'Holesky',
      shortName: 'holesky',
      currencySymbol: 'ETH',
      baseAPI: 'https://transaction-holesky.holesky-safe.protofire.io',
      stagingBaseAPI: 'https://transaction-holesky.stg.holesky-safe.protofire.io',
    },
  ],
  [
    592,
    {
      chainID: 592,
      name: 'Astar',
      shortName: 'astar',
      currencySymbol: 'ASTR',
      baseAPI: 'https://transaction.safe.astar.network',
      stagingBaseAPI: 'https://transaction.staging-safe.astar.network',
    },
  ],
  [
    336,
    {
      chainID: 336,
      name: 'Shiden',
      shortName: 'shiden',
      currencySymbol: 'SDN',
      baseAPI: 'https://transaction-shiden.safe.astar.network',
      stagingBaseAPI: 'https://transaction-shiden.staging-safe.astar.network',
    },
  ],
  [
    6038361,
    {
      chainID: 6038361,
      name: 'Astar zKyoto',
      shortName: 'zKyoto',
      currencySymbol: 'ETH',
      baseAPI: 'https://transaction-zkyoto.safe.astar.network',
      stagingBaseAPI: 'https://transaction-zkyoto.staging-safe.astar.network',
    },
  ],
  [
    81,
    {
      chainID: 81,
      name: 'Shibuya',
      shortName: 'shibuya',
      currencySymbol: 'SBY',
      baseAPI: 'https://transaction-shibuya.safe.astar.network',
      stagingBaseAPI: 'https://transaction-shibuya.staging-safe.astar.network',
    },
  ],
  [
    3776,
    {
      chainID: 3776,
      name: 'zkEVM',
      shortName: 'zkEVM',
      currencySymbol: 'ETH',
      baseAPI: 'https://transaction-zkevm.safe.astar.network',
      stagingBaseAPI: 'https://transaction-zkevm.staging-safe.astar.network',
    },
  ],
]);
