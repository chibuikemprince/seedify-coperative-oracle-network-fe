export type Address = `0x${string}`;

export const CONTRACTS = {
  predictionMarket: process.env.NEXT_PUBLIC_PREDICTION_MARKET_ADDRESS ?? "",
  amm: process.env.NEXT_PUBLIC_AMM_ADDRESS ?? "",
  aipt: process.env.NEXT_PUBLIC_AIPT_ADDRESS ?? ""
};

export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 97);

export const ZERO_ADDRESS: Address = "0x0000000000000000000000000000000000000000";
