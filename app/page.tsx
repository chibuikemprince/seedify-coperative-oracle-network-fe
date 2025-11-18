"use client";

import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {HeroStats} from "@/components/HeroStats";
import {MarketList} from "@/components/MarketList";
import {MarketDetail} from "@/components/MarketDetail";
import {WalletPanel} from "@/components/WalletPanel";
import {LoadingState} from "@/components/LoadingState";
import {UiMarket, useMarkets} from "@/hooks/useMarkets";
import {CategoryNav, type CategoryFilter} from "@/components/CategoryNav";

export default function HomePage() {
  const {markets, isLoading, refresh} = useMarkets();
  const [selected, setSelected] = useState<UiMarket | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const filteredMarkets = useMemo(() => {
    const target = categoryFilter;
    return markets.filter((market) => {
      if (target === "all") return true;
      if (target === "crypto") return isCryptoCategory(market.category);
      if (target === "sports") return isSportsCategory(market.category);
      return true;
    });
  }, [categoryFilter, markets]);

  const activeMarkets = useMemo(
    () => filteredMarkets.filter((market) => !market.resolved),
    [filteredMarkets]
  );
  const completedMarkets = useMemo(
    () => filteredMarkets.filter((market) => market.resolved),
    [filteredMarkets]
  );

  useEffect(() => {
    if (selected && filteredMarkets.some((market) => market.id === selected.id)) {
      return;
    }
    setSelected(activeMarkets[0] ?? completedMarkets[0] ?? null);
  }, [filteredMarkets, selected, activeMarkets, completedMarkets]);

  const categoryStats = useMemo(() => buildCategoryStats(markets), [markets]);

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-brand-light">Cooperative Oracle Network</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight">Prediction markets that fund aligned DAOs</h1>
          <p className="mt-2 max-w-3xl text-slate-300">
            AI Prediction Hub merges verifiable oracle feeds, DAO impact donations, and transparent liquidity so every bet
            defends public goods. Launch markets, stake outcomes, and let community-owned data decide the truth.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/create"
            className="rounded-2xl bg-brand px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-dark"
          >
            Create prediction
          </Link>
          <Link
            href="/swap"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-slate-200 transition hover:border-brand hover:text-white"
          >
            Swap BNB ↔ AIPT
          </Link>
        </div>
      </header>

      <HeroStats markets={markets} />
      <CategoryNav categories={categoryStats} selected={categoryFilter} onSelect={setCategoryFilter} />

      {isLoading ? (
        <LoadingState />
      ) : (
        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <PredictionSection
              title="Active predictions"
              subtitle="Open markets ready for your conviction."
              markets={activeMarkets}
              selected={selected}
              onSelect={setSelected}
            />
            <PredictionSection
              title="Completed predictions"
              subtitle="Resolved markets with transparent proof."
              markets={completedMarkets}
              selected={selected}
              onSelect={setSelected}
            />
          </div>

          <div className="space-y-6">
            <MarketDetail market={selected} onRefresh={refresh} />
            <WalletPanel />
          </div>
        </section>
      )}
    </main>
  );
}

function PredictionSection({
  title,
  subtitle,
  markets,
  selected,
  onSelect
}: {
  title: string;
  subtitle: string;
  markets: UiMarket[];
  selected: UiMarket | null;
  onSelect: (market: UiMarket) => void;
}) {
  const emptyMessage =
    title === "Completed predictions"
      ? "No completed markets yet. Stay tuned for oracle verdicts."
      : "No open markets in this category. Launch one to kickstart the conversation.";

  return (
    <div className="glass-panel space-y-3 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="card-title">{title}</p>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide">
          {markets.length} market{markets.length === 1 ? "" : "s"}
        </span>
      </div>
      <MarketList markets={markets} selected={selected} onSelect={onSelect} emptyMessage={emptyMessage} />
    </div>
  );
}

function buildCategoryStats(markets: UiMarket[]) {
  const categories = {
    all: markets.length,
    crypto: markets.filter((market) => isCryptoCategory(market.category)).length,
    sports: markets.filter((market) => isSportsCategory(market.category)).length
  };

  return [
    {
      key: "all" as CategoryFilter,
      label: "All predictions",
      description: "Every open and settled market on chain.",
      count: categories.all
    },
    {
      key: "crypto" as CategoryFilter,
      label: "Crypto",
      description: "Chainlink + Pyth verified price action.",
      count: categories.crypto
    },
    {
      key: "sports" as CategoryFilter,
      label: "Sports",
      description: "Score feeds curated through SEDA.",
      count: categories.sports
    }
  ];
}

function isCryptoCategory(category?: string) {
  const normalized = (category || "").toLowerCase();
  return normalized.includes("crypto") || normalized.includes("price");
}

function isSportsCategory(category?: string) {
  const normalized = (category || "").toLowerCase();
  return normalized.includes("sport") || normalized.includes("match");
}
