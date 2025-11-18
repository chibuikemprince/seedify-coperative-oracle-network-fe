"use client";

import {UiMarket} from "@/hooks/useMarkets";
import {useAmmInfo} from "@/hooks/useAmmInfo";

interface Props {
  markets: UiMarket[];
}

export function HeroStats({markets}: Props) {
  const amm = useAmmInfo();

  const totalVolume = markets.reduce((sum, market) => sum + market.yesPool + market.noPool, 0);
  const unresolved = markets.filter((m) => !m.resolved).length;

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <HeroTile label="Active Markets" value={unresolved.toString()} accent="text-brand-light" />
      <HeroTile label="Total Locked BNB" value={`${totalVolume.toFixed(2)} BNB`} />
      <HeroTile label="AMM Reserves" value={`${amm.bnbReserve.toFixed(2)} BNB`} />
      <HeroTile label="AIPT Spot Price" value={`${amm.price.toFixed(4)} BNB`} />
    </section>
  );
}

function HeroTile({label, value, accent}: {label: string; value: string; accent?: string}) {
  return (
    <div className="glass-panel p-4">
      <p className="card-title">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${accent ?? ""}`}>{value}</p>
    </div>
  );
}
