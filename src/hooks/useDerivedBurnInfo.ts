import { Currency, CurrencyAmount, JSBI, Pair, Percent, Token, ZERO } from '@babysquidgrow/sdk';

import tryParseAmount from '../utils/tryParseAmount';
import useActiveWeb3React from './useActiveWeb3React';
import { usePair } from './usePairs';
import { useTokenBalances } from './useTokenBalances';
import { useTotalSupply } from './useTotalSupply';

export enum Field {
  LIQUIDITY_PERCENT = 'LIQUIDITY_PERCENT',
  LIQUIDITY = 'LIQUIDITY',
  CURRENCY_A = 'CURRENCY_A',
  CURRENCY_B = 'CURRENCY_B',
}

type BurnState = {
  independentField: Field;
  typedValue: string;
};

export function useDerivedBurnInfo(
  burnState: BurnState,
  currencyA?: Currency,
  currencyB?: Currency,
): {
  pair?: Pair | null;
  parsedAmounts: {
    [Field.LIQUIDITY_PERCENT]: Percent;
    [Field.LIQUIDITY]?: CurrencyAmount<Token>;
    [Field.CURRENCY_A]?: CurrencyAmount<Currency>;
    [Field.CURRENCY_B]?: CurrencyAmount<Currency>;
  };
  error?: string;
} {
  const { account } = useActiveWeb3React();

  const { independentField, typedValue } = burnState;

  // pair + totalsupply
  const [, pair] = usePair(currencyA, currencyB);

  // balances
  const relevantTokenBalances = useTokenBalances(account ?? undefined, pair ? [pair.liquidityToken] : []);
  const userLiquidity: undefined | CurrencyAmount<Token> = relevantTokenBalances?.[pair?.liquidityToken?.address ?? ''];

  const [tokenA, tokenB] = [currencyA?.wrapped, currencyB?.wrapped];
  const tokens = {
    [Field.CURRENCY_A]: tokenA,
    [Field.CURRENCY_B]: tokenB,
    [Field.LIQUIDITY]: pair?.liquidityToken,
  };

  // liquidity values
  const totalSupply = useTotalSupply(pair?.liquidityToken);

  const liquidityValueA =
    pair &&
    totalSupply &&
    userLiquidity &&
    tokenA &&
    !totalSupply?.equalTo(ZERO) &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalSupply.quotient, userLiquidity.quotient)
      ? CurrencyAmount.fromRawAmount(tokenA, pair.getLiquidityValue(tokenA, totalSupply, userLiquidity, false).quotient)
      : undefined;

  const liquidityValueB =
    pair &&
    totalSupply &&
    userLiquidity &&
    tokenB &&
    !totalSupply?.equalTo(ZERO) &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalSupply.quotient, userLiquidity.quotient)
      ? CurrencyAmount.fromRawAmount(tokenB, pair.getLiquidityValue(tokenB, totalSupply, userLiquidity, false).quotient)
      : undefined;

  const liquidityValues: {
    [Field.CURRENCY_A]?: CurrencyAmount<Token>;
    [Field.CURRENCY_B]?: CurrencyAmount<Token>;
  } = {
    [Field.CURRENCY_A]: liquidityValueA,
    [Field.CURRENCY_B]: liquidityValueB,
  };

  let percentToRemove: Percent = new Percent('0', '100');
  // user specified a %
  if (independentField === Field.LIQUIDITY_PERCENT) {
    percentToRemove = new Percent(typedValue, '100');
  }
  // user specified a specific amount of liquidity tokens
  else if (independentField === Field.LIQUIDITY) {
    if (pair?.liquidityToken) {
      const independentAmount = tryParseAmount(typedValue, pair.liquidityToken);
      if (independentAmount && userLiquidity && !independentAmount.greaterThan(userLiquidity)) {
        percentToRemove = new Percent(independentAmount.quotient, userLiquidity.quotient);
      }
    }
  }
  // user specified a specific amount of token a or b
  else {
    if (tokens[independentField]) {
      const independentAmount = tryParseAmount(typedValue, tokens[independentField]);
      const liquidityValue = liquidityValues[independentField];
      if (independentAmount && liquidityValue && !independentAmount.greaterThan(liquidityValue)) {
        percentToRemove = new Percent(independentAmount.quotient, liquidityValue.quotient);
      }
    }
  }

  const parsedAmounts: {
    [Field.LIQUIDITY_PERCENT]: Percent;
    [Field.LIQUIDITY]?: CurrencyAmount<Token>;
    [Field.CURRENCY_A]?: CurrencyAmount<Currency>;
    [Field.CURRENCY_B]?: CurrencyAmount<Currency>;
  } = {
    [Field.LIQUIDITY_PERCENT]: percentToRemove,
    [Field.LIQUIDITY]:
      userLiquidity && percentToRemove && percentToRemove.greaterThan('0')
        ? CurrencyAmount.fromRawAmount(
            userLiquidity.currency,
            percentToRemove.multiply(userLiquidity.quotient).quotient,
          )
        : undefined,
    [Field.CURRENCY_A]:
      tokenA && percentToRemove && percentToRemove.greaterThan('0') && liquidityValueA
        ? CurrencyAmount.fromRawAmount(tokenA, percentToRemove.multiply(liquidityValueA.quotient).quotient)
        : undefined,
    [Field.CURRENCY_B]:
      tokenB && percentToRemove && percentToRemove.greaterThan('0') && liquidityValueB
        ? CurrencyAmount.fromRawAmount(tokenB, percentToRemove.multiply(liquidityValueB.quotient).quotient)
        : undefined,
  };

  let error: string | undefined;
  if (!account) {
    error = 'CONNECT_WALLET';
  }

  if (!parsedAmounts[Field.LIQUIDITY] || !parsedAmounts[Field.CURRENCY_A] || !parsedAmounts[Field.CURRENCY_B]) {
    error = error ?? 'ENTER_AN_AMOUNT';
  }

  return { pair, parsedAmounts, error };
}
