import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';
import {
  DataDecoded,
  getTransactionDetails,
  getTransactionHistory,
  TransactionDetails,
  TransactionListItem,
} from '@gnosis.pm/safe-react-gateway-sdk';

import { getAllowance } from '../../actions/allowance';
import { networkInfo } from '../../networks';
import { reduceToMap } from '../../utils/arrayReducers';
import { TokenInfo } from '../tokens/TokenStore';

import { AccumulatedApproval } from './TransactionStore';

interface Transaction {
  to: string;
  transactionHash: string | null;
  executionDate: number | null;
  dataDecoded?: DataDecoded;
}

const approveAndMultiSendTransactions = (tx: TransactionListItem) =>
  tx.type === 'TRANSACTION' &&
  tx.transaction.txInfo.type === 'Custom' &&
  (tx.transaction.txInfo.methodName === 'multiSend' || tx.transaction.txInfo.methodName === 'approve');

const containsApproveTransaction = (tx: TransactionDetails | undefined): tx is TransactionDetails => {
  const dataDecoded = tx?.txData?.dataDecoded;
  const containsApproval =
    'approve' === dataDecoded?.method ||
    ('multiSend' === dataDecoded?.method &&
      (dataDecoded?.parameters
        ?.find((param) => param.name === 'transactions')
        ?.valueDecoded?.some((value) => value.dataDecoded?.method === 'approve') ??
        false));
  return containsApproval;
};

/**
 * Unpacks approval transactions
 *
 * A single approve tx will be returned directly
 * A batched multisend tx will be unpacked into all contained approve txs
 *
 * @param tx single tx containing one or more approve calls
 * @returns array of unpacked txs
 */
const unpackApprovalTransactions = (tx: TransactionDetails) => {
  const txs: Transaction[] = [];
  if (tx.txInfo.type === 'Custom') {
    if ('approve' === tx.txData?.dataDecoded?.method) {
      txs.push({
        executionDate: tx.executedAt,
        to: tx.txData.to.value,
        transactionHash: tx.txHash,
        dataDecoded: tx.txData.dataDecoded,
      });
    } else {
      tx.txData?.dataDecoded?.parameters
        ?.find((param) => param.name === 'transactions')
        ?.valueDecoded?.forEach((innerTx) => {
          if (innerTx.dataDecoded?.method === 'approve') {
            txs.push({
              executionDate: tx.executedAt,
              to: innerTx.to,
              transactionHash: tx.txHash,
              dataDecoded: innerTx.dataDecoded,
            });
          }
        });
    }
  }

  return txs;
};

const baseAPI = 'https://safe-client.gnosis.io';

const fetchTransactionDetails = async (tx: TransactionListItem, chainID: string) => {
  if (tx.type === 'TRANSACTION') {
    return await getTransactionDetails(baseAPI, chainID, tx.transaction.id).catch(() => undefined);
  }
  return undefined;
};

/**
 * Fetches all approval txs for a safeAddress and network.
 *
 * @param safeAddress address of the connected safe
 * @param network id identifying the chain / network
 * @param safeAppProvider web3 provider
 * @returns approve transactions grouped by token and spender address containing the remaining allowance
 */
export const fetchApprovalTransactions = async (
  safeAddress: string,
  network: number,
  safeAppProvider: SafeAppProvider,
) => {
  const transactionsWithDetails = await getTransactionHistory(baseAPI, `${network}`, safeAddress)
    .then((response) => response.results)
    .then((response) => response.filter(approveAndMultiSendTransactions))
    .then((response) => response.map((tx) => fetchTransactionDetails(tx, `${network}`)));

  return Promise.all(transactionsWithDetails)
    .then((response) => response.filter(containsApproveTransaction))
    .then((response) => response.flatMap(unpackApprovalTransactions))
    .then((response) => reduceToMap(response, (obj: Transaction) => obj.to))
    .then(async (approvalMap) => {
      const result: AccumulatedApproval[] = [];
      for (const tokenEntry of approvalMap.entries()) {
        const transactionsBySpender = reduceToMap(tokenEntry[1], (tx) => {
          const spender = tx.dataDecoded?.parameters?.find((param) => param.type === 'address')?.value as string;
          if (!spender) {
            throw Error('Approvals without spender');
          }
          return spender;
        });

        for (const spenderEntry of transactionsBySpender.entries()) {
          const allowance = await getAllowance(safeAddress, tokenEntry[0], spenderEntry[0], safeAppProvider);
          if (typeof allowance !== 'undefined') {
            result.push({
              spender: spenderEntry[0],
              tokenAddress: tokenEntry[0],
              allowance: allowance.toFixed(),
              transactions: spenderEntry[1].map((tx) => ({
                executionDate: tx.executionDate,
                txHash: tx.transactionHash,
                value: tx.dataDecoded?.parameters?.find((param) => param.type === 'uint256')?.value as string,
              })),
            });
          }
        }
      }
      return result;
    })
    .catch(() => [] as AccumulatedApproval[]);
};

export const fetchTokenInfo = async (tokenAddress: string, network: number) => {
  const baseAPIURL = networkInfo.get(network)?.baseAPI;

  if (!baseAPIURL) {
    return undefined;
  } else {
    return await fetch(`${baseAPIURL}/tokens/${tokenAddress}/`)
      .then((response: Response) => {
        if (response.ok) {
          return response.json() as Promise<TokenInfo>;
        } else {
          throw Error(response.statusText);
        }
      })
      .catch(() => undefined);
  }
};
