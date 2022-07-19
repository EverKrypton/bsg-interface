import {
  Currency,
  CurrencyAmount,
  Price,
  SupportedChainId,
  Token,
} from "@babysquidgrow/sdk";
import { useMemo } from "react";

import { BUSD } from "../constants/token";
import useAppChainId from "./useAppChainId";
import { useTradeExactOut } from "./useTrade";

// Stablecoin amounts used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.
const STABLECOIN_AMOUNT_OUT: { [chainId: number]: CurrencyAmount<Token> } = {
  [SupportedChainId.MAINNET]: CurrencyAmount.fromRawAmount(
    BUSD[SupportedChainId.MAINNET],
    100_000e6,
  ),
  [SupportedChainId.SMART_CHAIN]: CurrencyAmount.fromRawAmount(
    BUSD[SupportedChainId.SMART_CHAIN],
    100_000e18,
  ),
};

/**
 * Returns the price in BUSD of the input currency
 * @param currency currency to compute the BUSD price of
 */
export default function useUSDCPrice(
  currency?: Currency,
): Price<Currency, Token> | undefined {
  const appChainId = useAppChainId();

  const amountOut = appChainId ? STABLECOIN_AMOUNT_OUT[appChainId] : undefined;
  const stablecoin = amountOut?.currency;

  const usdcTrade = useTradeExactOut(currency, amountOut, {
    maxHops: 2,
  });

  return useMemo(() => {
    if (!currency || !stablecoin) {
      return undefined;
    }

    // handle BUSD
    if (currency?.wrapped.equals(stablecoin)) {
      return new Price(stablecoin, stablecoin, "1", "1");
    }

    if (usdcTrade) {
      const { numerator, denominator } = usdcTrade.route.midPrice;
      return new Price(currency, stablecoin, denominator, numerator);
    }

    return undefined;
  }, [currency, stablecoin, usdcTrade]);
}

export function useUSDCValue(
  currencyAmount: CurrencyAmount<Currency> | undefined | null,
) {
  const price = useUSDCPrice(currencyAmount?.currency);

  return useMemo(() => {
    if (!price || !currencyAmount) return null;
    try {
      return price.quote(currencyAmount);
    } catch (error) {
      return null;
    }
  }, [currencyAmount, price]);
}
