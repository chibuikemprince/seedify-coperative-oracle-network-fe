import {createThirdwebClient, getContract} from "thirdweb";
import {defineChain} from "thirdweb/chains";
import {createWallet} from "thirdweb/wallets";
import type {Wallet} from "thirdweb/wallets";
import {CHAIN_ID, CONTRACTS} from "./contracts";
import {AMM_POOL_ABI, ERC20_ABI, PREDICTION_MARKET_ABI} from "./abis";

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ""
});

const DEFAULT_CHAIN_ID = CHAIN_ID || 97;
export const THIRDWEB_CHAIN = defineChain(DEFAULT_CHAIN_ID);

export const SUPPORTED_WALLETS: Wallet[] = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("com.trustwallet.app"),
  createWallet("io.zerion.wallet"),
  createWallet("com.okex.wallet")
] as Wallet[];

export const predictionMarketContract = CONTRACTS.predictionMarket
  ? getContract({
      client: thirdwebClient,
      chain: THIRDWEB_CHAIN,
      address: CONTRACTS.predictionMarket,
      abi: PREDICTION_MARKET_ABI
    })
  : null;

export const ammContract = CONTRACTS.amm
  ? getContract({
      client: thirdwebClient,
      chain: THIRDWEB_CHAIN,
      address: CONTRACTS.amm,
      abi: AMM_POOL_ABI
    })
  : null;

export const tokenContract = CONTRACTS.aipt
  ? getContract({
      client: thirdwebClient,
      chain: THIRDWEB_CHAIN,
      address: CONTRACTS.aipt,
      abi: ERC20_ABI
    })
  : null;
