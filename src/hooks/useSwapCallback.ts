import { isAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { Currency, Percent, Router, SwapParameters, Trade, TradeType } from '@babysquidgrow/sdk';
import { useMemo } from 'react';

import { calculateGasMargin } from '../functions/trade';
import { isZero } from '../functions/validate';
import { shortenAddress } from '../utils/addresses';
import approveAmountCalldata from '../utils/approveAmountCalldata';
import useActiveWeb3React from './useActiveWeb3React';
import { useArgentWalletContract } from './useArgentWalletContract';
import { useRouterContract } from './useContract';
import useENS from './useENS';
import useTransactionAdder from './useTransactionAdder';
import useTransactionDeadline from './useTransactionDeadline';

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID,
}

interface SwapCall {
  address: string;
  calldata: string;
  value: string;
}

interface SwapCallEstimate {
  call: SwapCall;
}

export interface SuccessfulCall extends SwapCallEstimate {
  call: SwapCall;
  gasEstimate: BigNumber;
}

interface FailedCall extends SwapCallEstimate {
  call: SwapCall;
  error: Error;
}

export type EstimatedSwapCall = SuccessfulCall | FailedCall;

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName the ENS name or address of the recipient of the swap output
 * @param signatureData the signature data of the permit of the input token amount, if available
 */
export function useSwapCallArguments(
  trade: Trade<Currency, Currency, TradeType> | undefined, // trade to execute, required
  allowedSlippage: Percent, // in bips
  recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): SwapCall[] {
  const { account, chainId, library } = useActiveWeb3React();

  // const { address: recipientAddress } = useENS(recipientAddressOrName);
  // const recipient = recipientAddressOrName === null ? account : recipientAddress;
  const recipient = account;

  const deadline = useTransactionDeadline();
  const routerContract = useRouterContract();
  const argentWalletContract = useArgentWalletContract();

  return useMemo(() => {
    if (!trade || !recipient || !library || !account || !chainId || !deadline) return [];

    if (!routerContract) return [];
    const swapMethods: SwapParameters[] = [];

    swapMethods.push(
      Router.swapCallParameters(trade, {
        feeOnTransfer: false,
        allowedSlippage,
        recipient,
        deadline: deadline.toNumber(),
      }),
    );

    if (trade.tradeType === TradeType.EXACT_INPUT) {
      swapMethods.push(
        Router.swapCallParameters(trade, {
          feeOnTransfer: true,
          allowedSlippage,
          recipient,
          deadline: deadline.toNumber(),
        }),
      );
    }
    return swapMethods.map(({ methodName, args, value }) => {
      if (argentWalletContract && trade.inputAmount.currency.isToken) {
        return {
          address: argentWalletContract.address,
          calldata: argentWalletContract.interface.encodeFunctionData('wc_multiCall', [
            [
              approveAmountCalldata(trade.maximumAmountIn(allowedSlippage), routerContract.address),
              {
                to: routerContract.address,
                value: value,
                data: routerContract.interface.encodeFunctionData(methodName, args),
              },
            ],
          ]),
          value: '0x0',
        };
      } else {
        return {
          address: routerContract.address,
          calldata: routerContract.interface.encodeFunctionData(methodName, args),
          value,
        };
      }
    });
  }, [account, allowedSlippage, argentWalletContract, chainId, deadline, library, recipient, routerContract, trade]);
}

/**
 * This is hacking out the revert reason from the ethers provider thrown error however it can.
 * This object seems to be undocumented by ethers.
 * @param error an error from the ethers provider
 */
export function swapErrorToUserReadableMessage(error: any): string {
  let reason: string | undefined;

  while (Boolean(error)) {
    reason = error.reason ?? error.message ?? reason;
    error = error.error ?? error.data?.originalError;
  }

  if (reason?.indexOf('execution reverted: ') === 0) reason = reason.substr('execution reverted: '.length);

  switch (reason) {
    case 'BsgswapV2Router: EXPIRED':
      return `The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low.`;
    case 'BsgswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
    case 'BsgswapV2Router: EXCESSIVE_INPUT_AMOUNT':
      return `This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.`;
    case 'TransferHelper: TRANSFER_FROM_FAILED':
      return `The input token cannot be transferred. There may be an issue with the input token.`;
    case 'BsgswapV2: TRANSFER_FAILED':
      return `The output token cannot be transferred. There may be an issue with the output token.`;
    case 'BsgswapV2: K':
      return `The Bsgswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer.`;
    case 'Too little received':
    case 'Too much requested':
    case 'STF':
      return `This transaction will not succeed due to price movement. Try increasing your slippage tolerance.`;
    case 'TF':
      return `The output token cannot be transferred. There may be an issue with the output token.`;
    default:
      if (reason?.indexOf('undefined is not an object') !== -1) {
        console.error(error, reason);
        return `An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading. Note fee on transfer and rebase tokens are incompatible with Bsgswap V3.`;
      }
      return `Unknown error${reason ? `: "${reason}"` : ''}. Try increasing your slippage tolerance.`;
  }
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback(
  trade: Trade<Currency, Currency, TradeType> | undefined, // trade to execute, required
  allowedSlippage: Percent, // in bips
  recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): {
  state: SwapCallbackState;
  callback: null | (() => Promise<string>);
  error: string | null;
} {
  const { account, chainId, library } = useActiveWeb3React();

  const swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName);

  const addTransaction = useTransactionAdder();

  // const { address: recipientAddress } = useENS(recipientAddressOrName);
  // const recipient = recipientAddressOrName === null ? account : recipientAddress;
  const recipient = account;

  return useMemo(() => {
    if (!trade || !library || !account || !chainId) {
      return {
        state: SwapCallbackState.INVALID,
        callback: null,
        error: 'Missing dependencies',
      };
    }
    if (!recipient) {
      if (recipientAddressOrName !== null) {
        return {
          state: SwapCallbackState.INVALID,
          callback: null,
          error: 'Invalid recipient',
        };
      } else {
        return {
          state: SwapCallbackState.LOADING,
          callback: null,
          error: null,
        };
      }
    }

    return {
      state: SwapCallbackState.VALID,
      callback: async function onSwap(): Promise<string> {
        console.log(swapCalls);
        const estimatedCalls: SwapCallEstimate[] = await Promise.all(
          swapCalls.map((call) => {
            const { address, calldata, value } = call;

            const tx =
              !value || isZero(value)
                ? { from: account, to: address, data: calldata }
                : {
                    from: account,
                    to: address,
                    data: calldata,
                    value,
                  };

            return library
              .estimateGas(tx)
              .then((gasEstimate) => {
                return {
                  call,
                  gasEstimate,
                };
              })
              .catch((gasError) => {
                console.debug('Gas estimate failed, trying eth_call to extract error', call);

                return library
                  .call(tx)
                  .then((result) => {
                    console.debug('Unexpected successful call after failed estimate gas', call, gasError, result);
                    return {
                      call,
                      error: new Error('Unexpected issue with estimating the gas. Please try again.'),
                    };
                  })
                  .catch((callError) => {
                    console.debug('Call threw error', call, callError);
                    return {
                      call,
                      error: new Error(swapErrorToUserReadableMessage(callError)),
                    };
                  });
              });
          }),
        );

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        let bestCallOption: SuccessfulCall | SwapCallEstimate | undefined = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall =>
            'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
        );

        // check if any calls errored with a recognizable error
        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call);
          if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error;
          const firstNoErrorCall = estimatedCalls.find<SwapCallEstimate>(
            (call): call is SwapCallEstimate => !('error' in call),
          );
          if (!firstNoErrorCall) throw new Error('Unexpected error. Could not estimate gas for the swap.');
          bestCallOption = firstNoErrorCall;
        }

        const {
          call: { address, calldata, value },
        } = bestCallOption;

        return library
          .getSigner()
          .sendTransaction({
            from: account,
            to: address,
            data: calldata,
            // let the wallet try if we can't estimate the gas
            ...('gasEstimate' in bestCallOption ? { gasLimit: calculateGasMargin(bestCallOption.gasEstimate) } : {}),
            ...(value && !isZero(value) ? { value } : {}),
          })
          .then((response) => {
            const inputSymbol = trade.inputAmount.currency.symbol;
            const outputSymbol = trade.outputAmount.currency.symbol;
            const inputAmount = trade.inputAmount.toSignificant(4);
            const outputAmount = trade.outputAmount.toSignificant(4);

            const base = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`;
            const withRecipient =
              recipient === account
                ? base
                : `${base} to ${
                    recipientAddressOrName && isAddress(recipientAddressOrName)
                      ? shortenAddress(recipientAddressOrName)
                      : recipientAddressOrName
                  }`;

            addTransaction(response, {
              summary: withRecipient,
            });

            return response.hash;
          })
          .catch((error) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction  rejected.');
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Swap failed`, error, address, calldata, value);

              throw new Error(`Swap failed: ${swapErrorToUserReadableMessage(error)}`);
            }
          });
      },
      error: null,
    };
  }, [trade, library, account, chainId, recipient, recipientAddressOrName, swapCalls, addTransaction]);
}
