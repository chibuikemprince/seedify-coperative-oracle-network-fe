export const PREDICTION_MARKET_ABI = [
  {
    inputs: [],
    name: "nextMarketId",
    outputs: [{internalType: "uint256", name: "", type: "uint256"}],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {internalType: "uint256", name: "marketId", type: "uint256"}
    ],
    name: "getMarket",
    outputs: [
      {
        components: [
          {internalType: "uint256", name: "id", type: "uint256"},
          {internalType: "string", name: "title", type: "string"},
          {internalType: "string", name: "category", type: "string"},
          {internalType: "uint256", name: "deadline", type: "uint256"},
          {internalType: "uint256", name: "yesPool", type: "uint256"},
          {internalType: "uint256", name: "noPool", type: "uint256"},
          {internalType: "uint256", name: "rewardPool", type: "uint256"},
          {internalType: "bool", name: "closed", type: "bool"},
          {internalType: "bool", name: "resolved", type: "bool"},
          {internalType: "bool", name: "result", type: "bool"},
          {internalType: "string", name: "latestOracleProof", type: "string"},
          {internalType: "address", name: "resolver", type: "address"}
        ],
        internalType: "struct PredictionMarket.Market",
        name: "market",
        type: "tuple"
      },
      {internalType: "uint256", name: "betCount", type: "uint256"}
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {internalType: "string", name: "title", type: "string"},
      {internalType: "string", name: "category", type: "string"},
      {internalType: "uint256", name: "deadline", type: "uint256"}
    ],
    name: "createMarket",
    outputs: [{internalType: "uint256", name: "marketId", type: "uint256"}],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {internalType: "uint256", name: "marketId", type: "uint256"},
      {internalType: "bool", name: "choice", type: "bool"},
      {internalType: "address", name: "dao", type: "address"},
      {internalType: "uint16", name: "daoPercent", type: "uint16"}
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{internalType: "uint256", name: "marketId", type: "uint256"}],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as any;

export const AMM_POOL_ABI = [
  {
    inputs: [],
    name: "getReserves",
    outputs: [
      {internalType: "uint256", name: "bnb", type: "uint256"},
      {internalType: "uint256", name: "aiptTokens", type: "uint256"}
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getPriceAIPT",
    outputs: [{internalType: "uint256", name: "", type: "uint256"}],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {internalType: "address", name: "to", type: "address"},
      {internalType: "uint256", name: "minAmountOut", type: "uint256"}
    ],
    name: "swapBNBForAIPT",
    outputs: [{internalType: "uint256", name: "amountOut", type: "uint256"}],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {internalType: "address", name: "to", type: "address"},
      {internalType: "uint256", name: "amountIn", type: "uint256"},
      {internalType: "uint256", name: "minAmountOut", type: "uint256"}
    ],
    name: "swapAIPTForBNB",
    outputs: [{internalType: "uint256", name: "amountOut", type: "uint256"}],
    stateMutability: "nonpayable",
    type: "function"
  }
] as any;

export const ERC20_ABI = [
  {
    inputs: [
      {internalType: "address", name: "spender", type: "address"},
      {internalType: "uint256", name: "amount", type: "uint256"}
    ],
    name: "approve",
    outputs: [{internalType: "bool", name: "", type: "bool"}],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{internalType: "address", name: "owner", type: "address"}],
    name: "balanceOf",
    outputs: [{internalType: "uint256", name: "", type: "uint256"}],
    stateMutability: "view",
    type: "function"
  }
] as any;
