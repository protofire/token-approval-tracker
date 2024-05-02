import SafeApiKit, {
  EthereumTxWithTransfersResponse,
  SafeModuleTransactionWithTransfersResponse,
  SafeMultisigTransactionWithTransfersResponse,
} from '@safe-global/api-kit';
import { SafeAppProvider } from '@safe-global/safe-apps-provider';

import { getAllowance } from '../../actions/allowance';
import { networkInfo } from '../../networks';
import { reduceToMap } from '../../utils/arrayReducers';

import { AccumulatedApproval } from './TransactionStore';

type Transaction = SafeModuleTransactionWithTransfersResponse &
  SafeMultisigTransactionWithTransfersResponse &
  EthereumTxWithTransfersResponse & {
    dataDecoded?: {
      method: string;
      parameters: {
        name: string;
        type: string;
        value: string;
      };
    };
  };

const filterApprovals = (transactions: Transaction[]): Transaction[] => {
  return transactions.filter((tx) => {
    return tx?.txType === 'MULTISIG_TRANSACTION' && tx?.dataDecoded?.method === 'approve' && tx?.isSuccessful;
  });
};

export const fetchApprovalsOnChain: (safeAddress: string, chainId: number) => Promise<Transaction[]> = async (
  safeAddress,
  chainId,
) => {
  const networkConfig = networkInfo.get(chainId);
  const txServiceUrl =
    process.env.REACT_APP_IS_PRODUCTION === 'true' ? networkConfig?.baseAPI : networkConfig?.stagingBaseAPI;
  const safeApiKit = new SafeApiKit({
    chainId: BigInt(chainId),
    txServiceUrl: `${txServiceUrl}/api`,
  });
  const allTransactions = (await safeApiKit.getAllTransactions(safeAddress)).results;
  const approvalTransactions = filterApprovals(allTransactions as Transaction[]);
  return approvalTransactions;
};

/**
 * Fetches all approval txs for a safeAddress and network.
 *
 * @param safeAddress address of the connected safe
 * @param chainId chainId of the connected network
 * @param safeAppProvider web3 provider
 * @returns approve transactions grouped by token and spender address containing the remaining allowance
 */
export const fetchApprovalTransactions = async (
  safeAddress: string,
  chainId: number,
  safeAppProvider: SafeAppProvider,
) => {
  const transactionsByToken = await fetchApprovalsOnChain(safeAddress, chainId)
    .then((transactions) =>
      transactions.sort((a, b) => {
        const blockDiff = (b.blockNumber ?? 0) - (a.blockNumber ?? 0);
        if (blockDiff !== 0) {
          return blockDiff;
        }
        return new Date(b.submissionDate).valueOf() - new Date(a.submissionDate).valueOf();
      }),
    )
    .then((transactions) => reduceToMap(transactions, (obj) => obj.to)) // get token addresses
    .catch((reason) => {
      console.error(`Error while fetching approval transactions: ${reason}`);
      return new Map<string, Transaction[]>();
    });

  const result: AccumulatedApproval[] = [];
  for (const tokenEntry of transactionsByToken.entries()) {
    try {
      const transactions = tokenEntry[1];
      const transactionsBySpender = reduceToMap(transactions, (tx) => {
        return tx.dataDecoded?.parameters[0].value;
      });

      for (const spenderEntry of transactionsBySpender.entries()) {
        const allowance = await getAllowance(safeAddress, tokenEntry[0], spenderEntry[0], safeAppProvider);
        if (typeof allowance !== 'undefined') {
          result.push({
            spender: spenderEntry[0],
            tokenAddress: tokenEntry[0],
            allowance: allowance.toFixed(),
          });
        }
      }
    } catch (err) {
      console.info(`Skipping unparsable approval event. ${tokenEntry[0]} is most likely not an ERC20 contract.`);
    }
  }
  debugger;
  return result;
};
