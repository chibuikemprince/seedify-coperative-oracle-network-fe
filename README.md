# Frontend - Cooperative Oracle Network

## Overview
Next.js 14 + `thirdweb` front-end that surfaces prediction markets, AMM stats, and wallet flows on BNB testnet. Key pieces:
- `app/` - App Router pages, providers, and layout.
- `components/` - Market list/detail cards, swap UI, auto-connect wallet logic.
- `hooks/` - Data-fetching hooks (`useMarkets`, `useAmmInfo`, etc.) with typed ABIs.
- `lib/` - Thirdweb client + ABI definitions shared across the UI.

## Environment
Create `frontend/.env` (copy `.env.example`) and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_PREDICTION_MARKET_ADDRESS` | Contract exposed to the UI. |
| `NEXT_PUBLIC_AMM_ADDRESS` | AMM pool for swaps/liquidity fees. |
| `NEXT_PUBLIC_AIPT_ADDRESS` | ERC20 token used in swaps and DAO payouts. |
| `NEXT_PUBLIC_CHAIN_ID` | Chain ID (e.g., `97` for BNB testnet). |
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | Thirdweb client identifier for wallet connections. |

## Commands
```bash
cd frontend
npm install
npm run dev      # start Next.js with HMR
npm run build    # production build
npm run start    # serve production build
npm run lint     # lint with eslint-config-next
```

## Developer notes
- Wallet UX uses Thirdweb's `ConnectButton` + custom `AutoConnectWallet` component so users land with a ready-to-use signer.
- Hooks read contract data through typed ABIs stored in `lib/abis.ts` to guarantee compile-time safety.
- Markets are intentionally logged in `useMarkets` when fetched (debugging requirement from the product brief).
- The swap card talks to the AMM and AIPT token contracts for approval, price quote, and swap execution.

## Styling / UI
- Tailwind + `clsx` for styling.
- Toast/notification system provided via `sonner`.
- Icons via `lucide-react`.
