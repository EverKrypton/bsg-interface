import { SupportedChainId, Token } from "@babysquidgrow/sdk";

import { WETH9_EXTENDED, WMATIC_EXTENDED } from "./extended-native";
import { BUSD, CDAI, CUSDC, DAI, USDT, WBTC } from "./token";

export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  [SupportedChainId.MAINNET]: [
    [CDAI[SupportedChainId.MAINNET], CUSDC[SupportedChainId.MAINNET]],
    [BUSD[SupportedChainId.MAINNET], USDT[SupportedChainId.MAINNET]],
    [DAI[SupportedChainId.MAINNET], USDT[SupportedChainId.MAINNET]],
  ],
  [SupportedChainId.RINKEBY]: [
    [CDAI[SupportedChainId.RINKEBY], CUSDC[SupportedChainId.RINKEBY]],
    [BUSD[SupportedChainId.RINKEBY], USDT[SupportedChainId.RINKEBY]],
    [DAI[SupportedChainId.RINKEBY], USDT[SupportedChainId.RINKEBY]],
  ],
  [SupportedChainId.SMART_CHAIN]: [
    [BUSD[SupportedChainId.SMART_CHAIN], USDT[SupportedChainId.SMART_CHAIN]],
    [DAI[SupportedChainId.SMART_CHAIN], USDT[SupportedChainId.SMART_CHAIN]],
  ],
};

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: { [chainId: number]: Token[] } = {
  [SupportedChainId.MAINNET]: [
    WETH9_EXTENDED[SupportedChainId.MAINNET],
    DAI[SupportedChainId.MAINNET],
    BUSD[SupportedChainId.MAINNET],
    USDT[SupportedChainId.MAINNET],
    WBTC[SupportedChainId.MAINNET],
  ],
  [SupportedChainId.RINKEBY]: [
    WETH9_EXTENDED[SupportedChainId.RINKEBY],
    DAI[SupportedChainId.RINKEBY],
    BUSD[SupportedChainId.RINKEBY],
    USDT[SupportedChainId.RINKEBY],
    WBTC[SupportedChainId.RINKEBY],
  ],
  [SupportedChainId.SMART_CHAIN]: [
    WMATIC_EXTENDED[SupportedChainId.SMART_CHAIN],
    DAI[SupportedChainId.SMART_CHAIN],
    BUSD[SupportedChainId.SMART_CHAIN],
    USDT[SupportedChainId.SMART_CHAIN],
    WBTC[SupportedChainId.SMART_CHAIN],
  ],
};
