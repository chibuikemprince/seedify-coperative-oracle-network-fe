"use client";

import {UiMarket} from "@/hooks/useMarkets";
import {BetForm} from "./bet/BetForm";
import {formatTimestamp} from "@/lib/format";
import {ClaimRewardButton} from "./bet/ClaimRewardButton";

interface Props {
  market?: UiMarket | null;
  onRefresh?: () => void;
}

export function MarketDetail({market, onRefresh}: Props) {
  if (!market) {
    return (
      <div className="glass-panel min-h-[420px] p-6">
        <p className="text-slate-400">Select a market to inspect details.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel space-y-6 p-6">
      <div>
        <p className="card-title">{market.category}</p>
        <h2 className="mt-2 text-2xl font-semibold">{market.title}</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <PoolStat label="Yes Pool" value={`${market.yesPool.toFixed(2)} BNB`} accent="text-emerald-400" />
        <PoolStat label="No Pool" value={`${market.noPool.toFixed(2)} BNB`} accent="text-rose-400" />
        <PoolStat label="Deadline" value={formatTimestamp(BigInt(market.deadline))} />
        <PoolStat
          label="Status"
          value={market.resolved ? (market.result ? "YES prevailed" : "NO prevailed") : market.closed ? "Awaiting oracle" : "Live"}
        />
      </div>

      <BetForm market={market} onSuccess={onRefresh} />

      {market.resolved && (
        <div className="rounded-2xl border border-white/5 p-4 text-sm text-slate-300">
          <p className="font-semibold text-white">Resolution details</p>
          <p className="mt-1">Resolver: {market.resolver ? truncate(market.resolver) : "Oracle council"}</p>
          <p className="mt-1 break-words">Proof CID: {market.proof || "Pending"}</p>
          <p className="mt-1">Reward pool: {market.rewardPool.toFixed(3)} BNB</p>
        </div>
      )}

      {market.resolved && <ClaimRewardButton marketId={market.id} onSuccess={onRefresh} />}
    </div>
  );
}

function PoolStat({label, value, accent}: {label: string; value: string; accent?: string}) {
  return (
    <div className="rounded-2xl border border-white/5 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`mt-1 text-xl font-semibold ${accent ?? ""}`}>{value}</p>
    </div>
  );
}

function truncate(value: string, chars = 4) {
  if (!value) return "-";
  return `${value.slice(0, 2 + chars)}...${value.slice(-chars)}`;
}
