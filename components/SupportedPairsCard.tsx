"use client";

import {CRYPTO_FEEDS} from "@/data/cryptoFeeds";

const HIGHLIGHT_COUNT = 8;

export function SupportedPairsCard() {
  const highlights = CRYPTO_FEEDS.slice(0, HIGHLIGHT_COUNT);
  const remaining = CRYPTO_FEEDS.length - highlights.length;

  return (
    <div className="glass-panel space-y-4 p-6">
      <div>
        <p className="card-title">Oracle coverage</p>
        <p className="text-sm text-slate-400">
          Crypto predictions are limited to trusted Chainlink/Pyth pairs so settlement is defensible.
        </p>
      </div>

      <ul className="grid gap-2 sm:grid-cols-2">
        {highlights.map((feed) => (
          <li key={feed.pair} className="rounded-2xl border border-white/5 px-3 py-2">
            <p className="text-sm font-semibold text-white">{feed.pair}</p>
            <p className="text-xs text-slate-400">
              Δ {feed.chainlinkDeviationThreshold} · heartbeat {feed.chainlinkHeartbeat}
            </p>
          </li>
        ))}
      </ul>

      {remaining > 0 && (
        <p className="text-xs text-slate-400">+{remaining} additional feeds regulated by the oracle council.</p>
      )}
    </div>
  );
}
