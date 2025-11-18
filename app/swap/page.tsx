"use client";

import Link from "next/link";
import {SwapCard} from "@/components/SwapCard";
import {WalletPanel} from "@/components/WalletPanel";
import {HeroStats} from "@/components/HeroStats";
import {useMarkets} from "@/hooks/useMarkets";
import {LoadingState} from "@/components/LoadingState";

export default function SwapPage() {
  const {markets, isLoading} = useMarkets();

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-widest text-brand-light">Liquidity Station</p>
        <h1 className="text-4xl font-semibold leading-tight">Swap between BNB and AIPT</h1>
        <p className="max-w-3xl text-slate-300">
          Market losses flow into this AMM, keeping the DAO-backed AIPT token collateralized by real BNB reserves.
          Supportive swaps ensure resolvers stay funded.
        </p>
        <Link href="/" className="text-sm text-brand-light underline underline-offset-4">
          View active markets
        </Link>
      </header>

      {isLoading ? <LoadingState /> : <HeroStats markets={markets} />}
      <SwapCard />
      <WalletPanel />
    </div>
  );
}
