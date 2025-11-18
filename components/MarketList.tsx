"use client";

import {UiMarket} from "@/hooks/useMarkets";
import {formatTimestamp} from "@/lib/format";
import {cn} from "@/lib/utils";

interface Props {
  markets: UiMarket[];
  selected?: UiMarket | null;
  onSelect: (market: UiMarket) => void;
  emptyMessage?: string;
}

export function MarketList({markets, selected, onSelect, emptyMessage}: Props) {
  if (!markets.length) {
    return (
      <div className="flex min-h-[160px] items-center justify-center rounded-2xl border border-white/10 bg-slate-900/40 p-6 text-center text-sm text-slate-400">
        {emptyMessage ?? "No markets yet. Launch one from the steward console."}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {markets.map((market) => (
        <button
          key={market.id}
          type="button"
          onClick={() => onSelect(market)}
          className={cn(
            "w-full rounded-2xl border border-white/5 bg-slate-900/40 p-4 text-left transition hover:border-brand",
            selected?.id === market.id && "border-brand shadow-card"
          )}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{market.title}</h3>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide">
              {market.category}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-400">Deadline: {formatTimestamp(BigInt(market.deadline))}</p>
          <div className="mt-3 flex gap-4 text-sm">
            <span className="text-emerald-400">Yes {market.yesPool} BNB</span>
            <span className="text-rose-400">No {market.noPool} BNB</span>
          </div>
        </button>
      ))}
    </div>
  );
}
